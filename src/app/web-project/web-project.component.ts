import { Component, Input, OnInit } from '@angular/core';
import { WebProject } from './web-project';
import { WebProjectService } from './web-project.service';
import { AlertService } from '../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'web-project',
  templateUrl: './web-project.component.html',
  styleUrls: ['./web-project.component.css']
})
export class WebProjectComponent implements OnInit {
  projects: WebProject[];
  selectedProject: WebProject;
  constructor(private projService: WebProjectService, private alert: AlertService) { }
  ngOnInit() {
    this.fetchData();
    this.projService.subscribeToWebProjects().subscribe((data) => {
      this.fetchData();
    }, err => {

    });
  }
  onSelect(project: WebProject): void {
    this.selectedProject = project;
  }
  fetchData() {
    this.projService.getWebProjects().subscribe(projArray => {
      this.projects = projArray;
    }, err => {
      this.alert.warn('message' in err.error ? err.error.message : 'Data not found')
    });
  }

}
