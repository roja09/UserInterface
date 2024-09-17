import { Routes } from '@angular/router';
  
import { IndexComponent } from './post/index/index.component';
import { ViewComponent } from './post/view/view.component';
import { SignupComponent } from './post/signup/signup.component';
import { LoginComponent } from './post/login/login.component';

  
export const routes: Routes = [
      { path: '', redirectTo: 'post/index', pathMatch: 'full'},
      { path: 'post', redirectTo: 'post/index', pathMatch: 'full'},
      {path:'post/login',component:LoginComponent},
      {path:'post/signup',component:SignupComponent},
      { path: 'post/index', component: IndexComponent },
      { path: 'post/:postId/view', component: ViewComponent },
  ];
