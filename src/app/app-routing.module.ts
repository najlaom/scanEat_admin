import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddUserComponent } from './pages/espace-client/add-user/add-user.component';
import { ListUserComponent } from './pages/espace-client/list-user/list-user.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminGuard } from './services/admin.guard';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
  {
    path: 'sign-in', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '', component: SidebarComponent, children: [
      {
        path: 'dashboard', component: DashboardComponent,
        
      },
      {
        path: 'add-user', component: AddUserComponent,
       // canActivate: [AdminGuard]
      },
      {
        path: 'users', component: ListUserComponent,
       // canActivate: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
