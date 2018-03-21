import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AlertService } from './alert/alert.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService, private alerts: AlertService) { }
  title = 'WebWard';
  signout() {
    this.auth.signOut();
  }
  
}
