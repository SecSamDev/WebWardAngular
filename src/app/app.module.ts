import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ActivatedRoute, Params } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EnvironmentComponent } from './environment/environment.component';
import { EnvironmentService } from './environment/environment.service';
//----------WebProjects-------------
import {
  WebProjectComponent,
  WebProjectViewComponent,
  WebProjectService,
  WebProjectNewComponent,
  WebProjectPageComponent,
  WebProjectEditComponent,
  WebProjectUserComponent
} from './web-project/index';
//---------- User Management --------------
import { UserService, UserManagementComponent, UserEditComponent, UserNewComponent, UserViewComponent } from './user-management/index';
//----------- CHECKS --------------------
import { ScanCheckComponent, ScanCheckEditComponent, ScanCheckNewComponent, ScanCheckService, ScanCheckViewComponent } from './scan-check/index';

import { ScanProfileComponent } from './scan-profile/scan-profile.component';
import { ScanReportComponent } from './scan-report/scan-report.component';

//-----------AUTH---------------
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthAdminService as AuthAdmin } from './auth/auth-admin.service';
import { AuthService } from './auth/auth.service';
import { AuthNoLoginService } from './auth/auth-nologin.service';
import { TokenInterceptor } from './auth/auth.interceptor';

//-------------PIPELINE-------------
import {
  PipelineComponent, 
  PipelineDirective, 
  PipelineNodeAtribute, 
  PipelineNodeComponent, 
  NodeMoveDirective, 
  PipelineNodeEditComponent, 
  PipelineNodeNewComponent, 
  PipelineService,
  NodeResizeDirective,
  NodePipeMeDirective,
  PipelineEditComponent,
  PipelineNewComponent,
  HosePipeService,
  PipelineMouseService,
  NodeConnectorComponent,
  ActiveNodeModalContent
} from './pipeline/index'

import { ContainerComponent } from './container/container.component';
import { DashboardWebProjectComponent } from './dashboard/dashboard-web-project/dashboard-web-project.component';
import { WebWardConsoleComponent } from './web-ward-console/web-ward-console.component';
import { MyProfileComponent } from './user-management/my-profile/my-profile.component';
import { UserProfileComponent } from './user-management/user-profile/user-profile.component';

//-------------WEBHOOKS--------------------
import { WebhookComponent,WebhookNewComponent,WebhookService } from './webhook/index';
import { TypesComponent,TypesDirective,WebhookTypeComponent } from './types/index';

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
    ScanProfileComponent,
    ScanReportComponent,
    ContainerComponent,
    DashboardWebProjectComponent,
    UserManagementComponent,
    UserEditComponent,
    UserNewComponent,
    ScanCheckComponent,
    ScanCheckEditComponent,
    ScanCheckNewComponent,
    UserViewComponent,
    ScanCheckViewComponent,
    WebWardConsoleComponent,
    MyProfileComponent,
    UserProfileComponent,
    WebProjectUserComponent,
    WebProjectViewComponent,
    WebProjectEditComponent,
    WebProjectPageComponent,
    PipelineComponent,
    PipelineNodeComponent,
    PipelineNodeEditComponent,
    PipelineNodeNewComponent,
    PipelineDirective,
    NodeMoveDirective,
    NodeResizeDirective,
    NodePipeMeDirective,
    PipelineEditComponent,
    PipelineNewComponent,
    NodeConnectorComponent,
    WebhookComponent,
    WebhookNewComponent,
    ActiveNodeModalContent,
    TypesDirective,
    WebhookTypeComponent,
    TypesComponent
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
    AuthAdmin,
    AuthService,
    AuthNoLoginService,
    AlertService,
    NgbModal,
    NgbActiveModal,
    UserService,
    EnvironmentService,
    ScanCheckService,
    HosePipeService,
    PipelineMouseService,
    PipelineService,
    WebhookService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent,ActiveNodeModalContent,WebhookTypeComponent]
})

export class AppModule { }
