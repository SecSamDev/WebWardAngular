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

//-----------AUTH---------------
import { JwtModule } from '@auth0/angular-jwt';
import {AuthGuardService as AuthGuard} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';
import {AuthNoLoginService} from './auth/auth-nologin.service';
import {TokenInterceptor} from './auth/auth.interceptor';



export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    DashboardComponent,
    PageNotFoundComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/auth/']
      }
    })

  ],
  providers: [
    AuthGuard,
    AuthService,
    AuthNoLoginService,
    AlertService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,
      multi : true
    }
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
