import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'project',
    children: [
      {path: '', component: ProjectPageComponent},
      {path: ':id', component: ProjectPageComponent}
    ]},
  {path: 'profile', component: ProfilePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
