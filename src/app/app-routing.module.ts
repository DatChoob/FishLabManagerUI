import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './logged-in/admin/admin.component';
import { HomeComponent } from './logged-in/home/home.component';
import { MaintenanceComponent } from './logged-in/maintenance/maintenance.component';
import { TankManagementComponent } from './logged-in/tank-management/tank-management.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { AdminAccountDetailComponent } from './logged-in/admin/admin-accounts/admin-account-detail/admin-account-detail.component';
import { LogoutComponent } from './logout/logout.component';
import { MaintenanceRoomLevelComponent } from './logged-in/maintenance/maintenance-room-level/maintenance-room-level.component';
import { MaintenanceGlobalLevelComponent } from './logged-in/maintenance/maintenance-global-level/maintenance-global-level.component';
/**
 * Routes are to decide which components get rendered based on the url.
 */
const routes: Routes = [
  {
    /**
     * We have children components because we will want to show a header and footer only for logged in users
     * canActivate ensures that only logged in users can access these paths
     */
    path: '',
    component: LoggedInComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '', 
        component: HomeComponent
      },
      {
        path: 'admin', 
        component: AdminComponent,
      },
      {
        path: 'admin/account/details/:id', 
        component: AdminAccountDetailComponent
      },
      {
        path: 'admin/account/details', 
        component: AdminAccountDetailComponent
      },
      {
        path: 'tank-management', 
        component: TankManagementComponent
      },
      {
        path: 'maintenance', 
        component: MaintenanceComponent,
        children:[
          {
            path:':roomId',
            component: MaintenanceRoomLevelComponent
          }
        ]
      }
      
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logout', component: LogoutComponent
  },
  /**
   * Regex to match any url not specified above, redirects to login
   */
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
