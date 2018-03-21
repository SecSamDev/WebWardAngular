import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AuthNoLoginService as AuthNoLogin } from './auth/auth-nologin.service';

import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserEditComponent } from './user-management/user-edit/user-edit.component';
import { ScanCheckComponent } from './scan-check/scan-check.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: SigninComponent, canActivate: [AuthNoLogin] },//LOGIN
  { path: 'users', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserEditComponent, canActivate: [AuthGuard] },
  { path: 'check', component: ScanCheckComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }//Redirect to LOGIN
  //INIT path the last because then redirect not loaded
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }