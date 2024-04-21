import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post.model';

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

  create(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(this.apiURL + '/posts/create', JSON.stringify(post), this.httpOptions)
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