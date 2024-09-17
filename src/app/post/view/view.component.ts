import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post,Review } from '../post.model';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

  
@Component({
  selector: 'app-view',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  
  id!: number;
  post!: Post;
  form!:FormGroup;
  review!: Review;
  reviews: Review[] = [];
      
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
      
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.form = new FormGroup({
      review: new FormControl('', [Validators.required])
    });
          
    this.postService.find(this.id).subscribe((data: Post)=>{
      this.post = data;
    });
    this.id = this.route.snapshot.params['postId'];
    this.postService.getAllReview(this.id).subscribe((data: Review[]) => {
        this.reviews=data;
    });
  }
  submit(): void { 
      this.id = this.route.snapshot.params['postId'];
      if (this.form.valid) {
        const review: Review = {
          content: this.f['review'].value,
          id: this.generateId(),
          movieId: this.id,
          timestamp: new Date()
        };
        console.log(review);
        this.postService.createReview(review, this.id)
          .subscribe((data: Review) => {
            console.log('Review added successfully!');
          });
    }

  }
  generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  
}