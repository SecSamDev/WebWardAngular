import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EnvironmentComponent } from './environment/environment.component';
import { EnvironmentService } from './environment/environment.service';
import { WebProjectComponent } from './web-project/web-project.component';
import {WebProjectService} from './web-project/web-project.service';
import { ScanProfileComponent } from './scan-profile/scan-profile.component';
import { ScanReportComponent } from './scan-report/scan-report.component';
import { DashboardWebProjectsComponent } from './dashboard/web-projects/web-projects.component'

//-----------AUTH---------------
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { AuthNoLoginService } from './auth/auth-nologin.service';
import { TokenInterceptor } from './auth/auth.interceptor';





export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    PageNotFoundComponent,
    AlertComponent,
    EnvironmentComponent,
    WebProjectComponent,
    ScanProfileComponent,
    ScanReportComponent,
    DashboardWebProjectsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule

  ],
  providers: [
    WebProjectService,
    AuthGuard,
    AuthService,
    AuthNoLoginService,
    AlertService,
    EnvironmentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
