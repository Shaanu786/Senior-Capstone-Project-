import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AddTaskComponent } from './add-task/add-task.component';
import { ChatboxComponent } from './chatbox/chatbox.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'butts', component: AddTaskComponent},
  {path: 'home', component: HomepageComponent, canActivate: [AuthGuard]},
  {path: 'project',
    children: [
      {path: '', component: ProjectPageComponent},
      {path: ':id', component: ProjectPageComponent}
    ],
  canActivate: [AuthGuard]},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
  {path: 'chatroom', component: ChatboxComponent},
  {path: 'profile', component: ProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
