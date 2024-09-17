
import { Component, OnInit } from '@angular/core';
//import { AuthService } from '../shared/auth-service';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { User } from '../post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  log: User[] = [];

  constructor(
    public postService: PostService,
    private router: Router
  ) { }
      

  ngOnInit(): void {this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });
    this.postService.getAllUsers().subscribe((data: User[])=>{
      this.log = data;
      console.log(this.log);
    })
  }
  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);

      if (this.log.some((value: User)=> value.username == this.f['name']?.value && value.password == this.f['password']?.value)) {
        this.router.navigateByUrl('post/index');
      }
      else{
        alert("User not found");
      }
    }
  }

