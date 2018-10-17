import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './logged-in/admin/admin.component';
import { HomeComponent } from './logged-in/home/home.component';
import { MaintenanceComponent } from './logged-in/maintenance/maintenance.component';
import { TankManagementComponent } from './logged-in/tank-management/tank-management.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { AuthGuardService } from './shared/auth.guard';
import { AdminAccountDetailComponent } from './logged-in/admin/admin-accounts/admin-account-detail/admin-account-detail.component';
import { LogoutComponent } from './logout/logout.component';
import { TankManagementDetailComponent } from './logged-in/tank-management/tank-management-detail/tank-management-detail.component';
import { TankManagementRoomOverviewComponent } from './logged-in/tank-management/tank-management-room-overview/tank-management-room-overview.component';
import { MaintenanceRoomLevelComponent } from './logged-in/maintenance/maintenance-room-level/maintenance-room-level.component';
import { MaintenanceGlobalLevelComponent } from './logged-in/maintenance/maintenance-global-level/maintenance-global-level.component';
import { AdminGuard } from './shared/admin.guard';
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
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/account/details/:participantCode', 
        component: AdminAccountDetailComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'tank-management/:roomId/details/:tankId', component: TankManagementDetailComponent
      },
      {
        path: 'tank-management/:roomId/details', component: TankManagementDetailComponent
      },
      {
        path: 'admin/account/details', 
        component: AdminAccountDetailComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'tank-management', 
        component: TankManagementComponent,
        children:[
          {
            //tank-mangagement/:roomId
            path:":roomId",
            component: TankManagementRoomOverviewComponent
          }
        ]
      },
      {
        path: 'maintenance', 
        component: MaintenanceComponent,
        children:[
          {
            path:'global',
            component: MaintenanceGlobalLevelComponent
          },
          {
            path:'room/:roomId',
            component: MaintenanceRoomLevelComponent
          },
          {
            path:'room',
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
