import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobComponent } from './components/job/job.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostjobComponent } from './components/postjob/postjob.component';
import { PostjobformComponent } from './components/postjobform/postjobform.component';

import { IsCompanyGuard } from './guards/is-company.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'jobs', component: JobsComponent },
  { path: 'job/:id', component: JobComponent },

  { path: 'postjob', component: PostjobComponent },
  { path: 'postjobform',canActivate: [AuthGuard,IsCompanyGuard], component: PostjobformComponent },
  
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
