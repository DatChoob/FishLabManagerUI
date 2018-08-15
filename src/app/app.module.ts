import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './logged-in/home/home.component';
import { TankManagementComponent } from './logged-in/tank-management/tank-management.component';
import { MaintenanceComponent } from './logged-in/maintenance/maintenance.component';
import { AdminComponent } from './logged-in/admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoggedInComponent } from './logged-in/logged-in.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TankManagementComponent,
    MaintenanceComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    LoggedInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
