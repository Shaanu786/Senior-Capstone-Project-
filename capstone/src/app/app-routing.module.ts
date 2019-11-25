import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AddTaskComponent } from './add-task/add-task.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'project',
    children: [
      {path: '', component: ProjectPageComponent},
      {path: ':id', component: ProjectPageComponent}
    ],
  canActivate: [AuthGuard]},
  //{path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'profile',
    children: [
      {path: '', component: ProfilePageComponent},
      {path: ':id', component: ProfilePageComponent}
    ],
  canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
