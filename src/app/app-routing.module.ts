import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementResolver } from './shared/api-services/resolver.service'
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
import { RoomResolver } from './shared/api-services/room-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminSpeciesComponent } from './logged-in/admin/admin-species/admin-species.component';
import { AdminProjectsComponent } from './logged-in/admin/admin-projects/admin-projects.component';
import { AdminRoomsComponent } from './logged-in/admin/admin-rooms/admin-rooms.component';
import { AdminAccountsComponent } from './logged-in/admin/admin-accounts/admin-accounts.component';
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
        path: 'admin/accounts/details/:participantCode', 
        component: AdminAccountDetailComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/accounts/details', 
        component: AdminAccountDetailComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin',
        canActivate: [AdminGuard],
        children:[
          {
            path: "",
            redirectTo: "species",
            pathMatch: "full",
          },
          {
            path: "**",
            component: AdminComponent,

          },
       
        ]
      },

 
      {
        path: 'tank-management/:roomId/details/:tankId', component: TankManagementDetailComponent
      },
      {
        path: 'tank-management/:roomId/details', component: TankManagementDetailComponent
      },
     
      {
        path: 'tank-management', 
        component: TankManagementComponent,
        children:[
          {
            path:'',
            component: TankManagementRoomOverviewComponent,
            resolve: {
              cres : ManagementResolver
            }

          },
          {
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
            component: MaintenanceGlobalLevelComponent,
          },
          {
            path:'room/:roomId',
            component: MaintenanceRoomLevelComponent,
          },
          {
            path:"room",
            component: MaintenanceRoomLevelComponent,
            resolve: {
              cres : RoomResolver
            }
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
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
