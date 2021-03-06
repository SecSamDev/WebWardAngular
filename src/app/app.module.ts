import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { NgbModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgxChartsModule} from '@swimlane/ngx-charts'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

//----------- SCANS --------------------
import { ScanProfileComponent } from './scan-profile/scan-profile.component';
import { ScanProfileService } from './scan-profile/scan-profile.service';


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
  NodeConnectorComponent
} from './pipeline/index'

import { WebWardConsoleComponent } from './web-ward-console/web-ward-console.component';
import { MyProfileComponent } from './user-management/my-profile/my-profile.component';
import { UserProfileComponent } from './user-management/user-profile/user-profile.component';

//-------------WEBHOOKS--------------------
import { WebhookComponent, WebhookNewComponent, WebhookService } from './webhook/index';
//---------------NODE ATTRIBUYTE TYPES-------------------------
import { TypesModule } from './types/types.module';
import { WwmodulesComponent } from './wwmodules/wwmodules.component';
import { WwmodulesService } from './wwmodules/wwmodules.service';


import { AppSettingsService } from './app-settings.service';
//Infrastructure
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { InfrastructureEditComponent } from './infrastructure/infrastructure-edit/infrastructure-edit.component';
import { InfrastructureNewComponent } from './infrastructure/infrastructure-new/infrastructure-new.component';
import { InfrastructureService } from './infrastructure/infrastructure.service';
import { InfrastructureObjectComponent } from './infrastructure/infrastructure/infrastructure.component';

//REPORTS
import { ReportsComponent } from './dashboard/reports/reports.component';
import { ScanReportComponent } from './scan-report/scan-report.component';
import { ReportsService } from './scan-report/reports.service';
import { ViewReportComponent } from './scan-report/view/view.component';
import {ScanReportChartComponent  } from './scan-report/chart/chart.component';
import { FullReportViewComponent } from './scan-report/full-view/full-view.component';


import { ArachniComponent } from './arachni/arachni.component';
import { NewProfileComponent } from './scan-profile/new-profile/new-profile.component';
import { EditProfileComponent } from './scan-profile/edit-profile/edit-profile.component';
import { EditModuleComponent } from './wwmodules/edit-module/edit-module.component';
import { NewModuleComponent } from './wwmodules/new-module/new-module.component';
import { ArachniViewComponent } from './arachni/view/view.component'
import { ArachniService } from './arachni/arachni.service';
import { ContextualMenuComponent } from './pipeline/contextual-menu/contextual-menu.component';
import { ContextualDirective } from './pipeline/contextual.directive';
import { ThreatModelComponent } from './threat-model/threat-model.component';


import { ReportChartTemporalComponent } from './scan-report/chart-temporal/chart-temporal.component';
import { ThreatModelReportComponent } from './threat-model/report/report.component';
import { ThreatModelViewComponent } from './threat-model/view/view.component';
import { ThreatModelEditComponent } from './threat-model/edit/edit.component';
import { ThreatModelService } from './threat-model/threat-model.service';
import { ThreatModelNewComponent } from './threat-model/new/new.component';
import { FullViewWappalyzerComponent } from './scan-report/full-view-wappalyzer/full-view-wappalyzer.component';
import { FullViewArachniComponent } from './scan-report/full-view-arachni/full-view-arachni.component';
import { WappaCatPipe } from './scan-report/wappa-cat.pipe';
import { SafeDomPipe } from './safe-dom.pipe';
import { DatabaseComponent } from './database/database.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    PageNotFoundComponent,
    AlertComponent,
    EnvironmentComponent,
    //--------------------------WEB PROJECT
    WebProjectComponent,
    WebProjectNewComponent,
    WebProjectUserComponent,
    WebProjectViewComponent,
    WebProjectEditComponent,
    WebProjectPageComponent,
    //-------------------------SCAN PROFILE
    ScanProfileComponent,
    NewProfileComponent,
    EditProfileComponent,
    
    //------------------------ USERS
    UserManagementComponent,
    UserEditComponent,
    UserNewComponent,
    UserViewComponent,
    UserProfileComponent,
    MyProfileComponent,
    //-------------------------- CONSOLE
    WebWardConsoleComponent,
    //----------------------- PIPELINE
    PipelineComponent,
    PipelineNodeComponent,
    PipelineNodeEditComponent,
    PipelineNodeNewComponent,
    PipelineDirective,
    PipelineEditComponent,
    PipelineNewComponent,
    NodeMoveDirective,
    NodeResizeDirective,
    NodePipeMeDirective,
    NodeConnectorComponent,
    ContextualMenuComponent,
    ContextualDirective,
    //---------------------- WEB HOOK
    WebhookComponent,
    WebhookNewComponent,
    //--------------------- WW Modules
    WwmodulesComponent,
    EditModuleComponent,
    NewModuleComponent,
    //--------------------- INFRASTRUCTURE
    InfrastructureComponent,
    InfrastructureEditComponent,
    InfrastructureNewComponent,
    InfrastructureObjectComponent,
    //----------------------- ARACHNI
    ArachniComponent,
    ArachniViewComponent,
    //----------------------- SCAN REPORT
    ScanReportComponent,
    ReportsComponent,
    ViewReportComponent,
    ScanReportChartComponent,
    FullReportViewComponent,
    ReportChartTemporalComponent,
    //-------------------------------THREAT MODEL
    ThreatModelComponent,
    ThreatModelReportComponent,
    ThreatModelViewComponent,
    ThreatModelEditComponent,
    ThreatModelNewComponent,
    FullViewWappalyzerComponent,
    FullViewArachniComponent,
    WappaCatPipe,
    SafeDomPipe,
    DatabaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    TypesModule,
    NgxChartsModule
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
    HosePipeService,
    PipelineMouseService,
    PipelineService,
    WebhookService,
    ScanProfileService,
    AppSettingsService,
    WwmodulesService,
    InfrastructureService,
    ArachniService,
    ReportsService,
    ThreatModelService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent, PipelineEditComponent, PipelineNodeEditComponent, ContextualMenuComponent,ScanReportChartComponent,ReportChartTemporalComponent]
})

export class AppModule { }
