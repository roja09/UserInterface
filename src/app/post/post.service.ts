import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post,Review,User } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiURL = "http://localhost:8000/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiURL + '/posts/')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getAllReview(movieId: number): Observable<Review[]> {
    console.log("try to get all reviewss from post");
    return this.httpClient.get<Review[]>(`${this.apiURL}/posts/${movieId}/view`)
      .pipe(
        catchError(this.errorHandler)
      )
  }
 getAllUsers(): Observable<User[]> {
   console.log("try to get all users");
   return this.httpClient.get<User[]>(this.apiURL + '/posts/login')
    .pipe(
      catchError(this.errorHandler)
    )
 }
  create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL + '/posts/create', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiURL + '/posts/signup', JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createReview(review: Review,movieId: number): Observable<Review> {
    console.log(review);
    return this.httpClient.post<Review>(`${this.apiURL}/posts/${movieId}/view`, JSON.stringify(review), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.apiURL}/posts/${id}`)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  findByName(name: string): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.apiURL}/posts/${name}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  update(id: number, post: Post): Observable<Post> {
    return this.httpClient.put<Post>(`${this.apiURL}/posts/${id}`, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number): Observable<{}> {
    return this.httpClient.delete(`${this.apiURL}/posts/${id}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getPosterUrl(filename: string): string {
    return `${this.apiURL}/images/${filename}`;
  } 
  searchPosts(searchTerm: string): Observable<Post[]> {
    const searchUrl = `${this.apiURL}/posts/?search=${searchTerm}`; // Example URL with search parameter

    // Optional: Add headers for authentication or additional information
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.get<Post[]>(searchUrl, { headers }) // Pass headers if needed
      .pipe(
        catchError(this.errorHandler)
      );
  }


  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}