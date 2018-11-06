import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './logged-in/home/home.component';
import { TankManagementComponent } from './logged-in/tank-management/tank-management.component';
import { TankManagementDetailComponent } from './logged-in/tank-management/tank-management-detail/tank-management-detail.component';
import { MaintenanceComponent } from './logged-in/maintenance/maintenance.component';
import { AdminComponent } from './logged-in/admin/admin.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { AuthInterceptor } from './shared/auth-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AdminRoomsComponent } from './logged-in/admin/admin-rooms/admin-rooms.component';
import { AdminTasksComponent } from './logged-in/admin/admin-tasks/admin-tasks.component';
import { AdminProjectsComponent } from './logged-in/admin/admin-projects/admin-projects.component';
import { AdminSpeciesComponent } from './logged-in/admin/admin-species/admin-species.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { AdminTaskViewComponent } from './logged-in/admin/admin-tasks/admin-task-view/admin-task-view.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LogoutComponent } from './logout/logout.component';
import { MatIconModule, MatSortModule } from '@angular/material';
import { AdminAccountsComponent } from './logged-in/admin/admin-accounts/admin-accounts.component';
import { AdminAccountDetailComponent } from './logged-in/admin/admin-accounts/admin-account-detail/admin-account-detail.component';
import { MaintenanceRoomLevelComponent } from './logged-in/maintenance/maintenance-room-level/maintenance-room-level.component';
import { MaintenanceGlobalLevelComponent } from './logged-in/maintenance/maintenance-global-level/maintenance-global-level.component';
import { TankManagementRoomOverviewComponent } from './logged-in/tank-management/tank-management-room-overview/tank-management-room-overview.component';
import { RouterTabModule } from '@zerohouse/router-tab';
import { MatSnackBarModule} from '@angular/material/snack-bar'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TankManagementComponent,
    TankManagementDetailComponent,
    MaintenanceComponent,
    AdminComponent,
    LoggedInComponent,
    AdminRoomsComponent,
    AdminTasksComponent,
    AdminProjectsComponent,
    AdminSpeciesComponent,
    AdminAccountsComponent,
    AdminAccountDetailComponent,
    ConfirmDialogComponent,
    AdminTaskViewComponent,
    LoggedInComponent,
    LogoutComponent,
    MaintenanceGlobalLevelComponent,
    MaintenanceRoomLevelComponent,
    TankManagementRoomOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSortModule,
    MatDialogModule,
    LayoutModule,
    MatSortModule,
    MatIconModule,
    RouterTabModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppModule { }