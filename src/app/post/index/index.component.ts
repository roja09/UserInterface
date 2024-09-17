import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  movieName: string = '';
  form!: FormGroup;
  originalPosts: Post[] = [];
  posts: Post[] = [];
  

  constructor(public postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      movieName: new FormControl('', [Validators.required])
    });
  
    this.postService.getAll().subscribe((data: Post[]) => {
      this.originalPosts = data; // Store the original list of movies
      this.posts = data;
    });
  }
  
  get f() {
    return this.form.controls;
  }
  
  SearchMovie() {
    if (this.form) {
      const searchTerm = this.f['movieName'].value?.toLowerCase() || '';
      console.log('Search Term:', searchTerm);
      if (searchTerm) {
        const searchRegex = new RegExp(`\\b${searchTerm}\\b`, 'gi');
        console.log(this.originalPosts);
        this.posts = this.originalPosts.filter(post => {
          const movieTitle = post.movieName?.toLowerCase();
          console.log('Movie Title:', movieTitle);
          return movieTitle && searchRegex.test(movieTitle);
        });
      } else {
        // Reset search term and filtered posts
        this.f['movieName'].setValue(''); // Clear the input field
        this.posts = this.originalPosts; // Reset posts to original list
      }
    }
  }
  /*SearchMovie(): void {
    const searchTerm = this.f['movieName'].value;
    console.log('Search Term:', searchTerm);
    this.postService.findByName(this.f['movieName'].value).subscribe({
      next: (data) => {
        this.posts = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  SearchMovie(){
    this.postService.findByName(this.f['movieName'].value).subscribe({
      next: (data) => {
        this.posts = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
    this.postService.delete(this.movieName).subscribe(res => {
      this.posts = this.posts.filter(item => item._id !== id);
      console.log('Post deleted successfully!');
    });
  }*/
  

  deletePost(id: number) {
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item._id !== id);
      console.log('Post deleted successfully!');
    });
  }
}