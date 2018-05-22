import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthAdminService as AuthAdmin } from './auth/auth-admin.service';
import { AuthNoLoginService as AuthNoLogin } from './auth/auth-nologin.service';

import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WebProjectEditComponent,WebProjectPageComponent } from './web-project/index';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserEditComponent, UserManagementComponent, UserProfileComponent } from './user-management/index';
import {ScanProfileComponent} from './scan-profile/scan-profile.component'
import { WebWardConsoleComponent } from './web-ward-console/web-ward-console.component'
import { MyProfileComponent} from './user-management/my-profile/my-profile.component';
import { PipelineComponent} from './pipeline/pipeline.component';
import { WebhookComponent} from './webhook/index'
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { InfrastructureEditComponent } from './infrastructure/infrastructure-edit/infrastructure-edit.component';
import { ArachniComponent } from './arachni/arachni.component';
import { WwmodulesComponent } from './wwmodules/wwmodules.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SigninComponent, canActivate: [AuthNoLogin] },//LOGIN
  { path: 'users', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'users/edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'projects/edit/:id', component: WebProjectEditComponent, canActivate: [AuthGuard] },
  { path: 'projects/:id', component: WebProjectPageComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'scan_profile', component: ScanProfileComponent, canActivate: [AuthGuard] },
  { path: 'console', component: WebWardConsoleComponent, canActivate: [AuthAdmin] },
  { path: 'ww-module', component: WwmodulesComponent, canActivate: [AuthAdmin] },
  { path: 'infrastructure', component: InfrastructureComponent, canActivate: [AuthAdmin] },
  { path: 'infrastructure/:id', component: InfrastructureEditComponent, canActivate: [AuthAdmin] },
  { path: 'arachni', component: ArachniComponent, canActivate: [AuthAdmin] },
  { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'pipeline', component: PipelineComponent, canActivate: [AuthGuard] },
  { path: 'webhook', component: WebhookComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }//Redirect to LOGIN
  //INIT path the last because then redirect not loaded
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }