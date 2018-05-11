import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AlertService } from './alert/alert.service';
import { WebProjectService, WebProject } from './web-project/index'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService, private alerts: AlertService, public webProjServ: WebProjectService) { }
  title = 'WebWard';
  actual_project: WebProject = new WebProject();
  projects: WebProject[] = [];
  signout() {
    this.auth.signOut();
  }
  ngOnInit() {
    //TODO: Important detect API REST direction from navbar
    this.fetchWebProjects();
    this.webProjServ.subscribeToWebProjects().subscribe((data) => {
      this.fetchWebProjects();
    }, err => { })
  }
  selectProject(proj: WebProject) {
    this.webProjServ.setActualProject(proj);
    this.actual_project = proj;
  }
  fetchWebProjects(){
    this.webProjServ.getWebProjects(false).subscribe((data) => {
      this.projects = data;
      this.actual_project = this.webProjServ.getActualProject();
    }, err => { })
  }

}
