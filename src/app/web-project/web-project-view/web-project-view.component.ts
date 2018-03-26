import { Component, Input, OnInit } from '@angular/core';
import { WebProject } from '../web-project';
import { WebProjectService } from '../web-project.service';
import { AlertService } from '../../alert/alert.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'web-project-view',
  templateUrl: './web-project-view.component.html',
  styleUrls: ['./web-project-view.component.css']
})
export class WebProjectViewComponent implements OnInit {

  @Input() project: WebProject;
  private projectBackup: WebProject;
  constructor(
    private auth: AuthService) { }

  ngOnInit() {
  }
}
