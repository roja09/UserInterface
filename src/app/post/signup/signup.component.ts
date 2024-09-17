import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {User} from '../post.model';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  form!: FormGroup;
  User!: User;

  //selectedFile?: File;

  constructor(
    public postService: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.postService.create(this.form.value).subscribe((res:any) => {
      console.log('Post created successfully!');
      this.router.navigateByUrl('post/index');
    })


    if (this.form.valid) {
      const user: User = {
        id: this.generateId(),
        username: this.f['username'].value,
        name: this.f['name'].value,
        password: this.f['password'].value,
        timestamp: new Date()
      };
      console.log(user);
      this.postService.createUser(user)
        .subscribe((data: User) => {
          console.log('User added successfully!');
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