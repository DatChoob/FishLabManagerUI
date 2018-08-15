import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './logged-in/admin/admin.component';
import { HomeComponent } from './logged-in/home/home.component';
import { MaintenanceComponent } from './logged-in/maintenance/maintenance.component';
import { TankManagementComponent } from './logged-in/tank-management/tank-management.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import {AuthGuardService} from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoggedInComponent,
    canActivate :[AuthGuardService],
    children: [
      {
        path:'', component:HomeComponent
      },
      {
        path: 'admin', component: AdminComponent
      },
      {
        path: 'tank-management', component: TankManagementComponent
      },
      {
        path: 'maintenance', component: MaintenanceComponent
      }
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
