import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../Models/blog-post.model';
import { AddBlogPost } from '../Models/add-blog-post.model';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../Models/update-blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  createBlogPost(data: AddBlogPost) : Observable<BlogPost>{
    return  this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts`, data);
  }

  getAllBlogPosts() : Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogposts`);
  }

  getBlogpostById(id: string) : Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  updateBlogPost(id : string , updateBlogPost : UpdateBlogPost): Observable<BlogPost>{
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`,
      updateBlogPost
    );
  }
}
