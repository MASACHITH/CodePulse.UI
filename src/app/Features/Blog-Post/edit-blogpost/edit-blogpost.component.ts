import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../Services/blog-post.service';
import { BlogPost } from '../Models/blog-post.model';
import { CategoryService } from '../../Category/Services/category.service';
import { Category } from '../../Category/Models/category.model';
import { UpdateBlogPost } from '../Models/update-blog-post.model';


@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit,OnDestroy{
  id: string | null =null;
  model?: BlogPost
  categories$? : Observable<Category[]>
  selectedCategories?: string[]

  routeSubscription ?:Subscription;
  updateBlogpostSubscription ?: Subscription;
  getBlogpostSubscription ?: Subscription;

  constructor(private route : ActivatedRoute,
    private blogPostService : BlogPostService,
    private categoryService : CategoryService,
    private router : Router
  ){

  }

  
  ngOnInit(): void {
    
    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next:(params) =>{
       this.id= params.get('id');

       //get blog post from api
        if(this.id){
          this.getBlogpostSubscription =  this.blogPostService.getBlogpostById(this.id).subscribe({
            next : (response) => {
              this.model = response;
              this.selectedCategories = response.categories?.map(x => x.id ?? '') ?? [];

            }
          })
        };
  
      }
     });
  }

  onFormSubmit() :void{
    //Convert this model to request Object

    if (this.model && this.id){
      var updateBlogpost : UpdateBlogPost = {
        author :this.model.author,
        content: this.model.content,
        shortDescription : this.model.shortDescription,
        featuredImageUrl :this.model.featuredImageUrl,
        isVisible :this.model.isVisible,
        publishedDate :this.model.publishedDate,
        title : this.model.title,
        urlHandle :this.model.urlHandle,
        categories : this.selectedCategories ?? []
      };

      this.updateBlogpostSubscription = this.blogPostService.updateBlogPost(this.id,updateBlogpost)
      .subscribe({
        next:(response) => {

           this.router.navigateByUrl('admin/blogposts');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogpostSubscription?.unsubscribe();
    this.getBlogpostSubscription?.unsubscribe();
  }

}
