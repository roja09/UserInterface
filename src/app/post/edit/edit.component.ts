import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post.model';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  id!: number;
  post!: Post;
  form!: FormGroup;

  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post)=>{
      this.post = data;
      this.form = new FormGroup({
        title: new FormControl(this.post.title, Validators.required),
        body: new FormControl(this.post.body, Validators.required),
        movieName: new FormControl(this.post.movieName, Validators.required),
        cast: new FormControl(this.post.cast, Validators.required),
        director: new FormControl(this.post.director, Validators.required),
        releaseDate: new FormControl(this.post.releaseDate, Validators.required),
        duration: new FormControl(this.post.duration, Validators.required),
        songs: new FormControl(this.post.songs, Validators.required),
        //poster: new FormControl(this.post.poster, Validators.required),
        genre: new FormControl(this.post.genre, Validators.required),
        description: new FormControl(this.post.description, [Validators.required, Validators.minLength(10)]),
      });
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.postService.update(this.id, this.form.value).subscribe((res:any) => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('post/index');
    });
  }
}