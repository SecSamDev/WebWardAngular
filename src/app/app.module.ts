import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule,NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
//----------WebProjects-------------
import { WebProjectComponent,WebProjectService,WebProjectNewComponent,WebProjectListComponent } from './web-project/index';

import { ScanProfileComponent } from './scan-profile/scan-profile.component';
import { ScanReportComponent } from './scan-report/scan-report.component';

//-----------AUTH---------------
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { AuthNoLoginService } from './auth/auth-nologin.service';
import { TokenInterceptor } from './auth/auth.interceptor';
import { ContainerComponent } from './container/container.component';
import { DashboardWebProjectComponent } from './dashboard/dashboard-web-project/dashboard-web-project.component';




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
    WebProjectNewComponent,
    WebProjectListComponent,
    ScanProfileComponent,
    ScanReportComponent,
    ContainerComponent,
    DashboardWebProjectComponent
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
    NgbModal,
    NgbActiveModal,
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
