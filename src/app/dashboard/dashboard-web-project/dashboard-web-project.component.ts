import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
@Component({
  selector: 'dashboard-web-project',
  templateUrl: './dashboard-web-project.component.html',
  styleUrls: ['./dashboard-web-project.component.css']
})
export class DashboardWebProjectComponent implements OnInit {

  constructor(public auth : AuthService) { }

  ngOnInit() {
  }

}
