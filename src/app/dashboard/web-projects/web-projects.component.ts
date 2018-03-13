import { Component, OnInit } from '@angular/core';
import { WebProject, } from '../../web-project/web-project';
import {WebProjectService} from '../../web-project/web-project.service';

@Component({
    selector: 'dashboard-webprojects',
    templateUrl: './web-projects.component.html',
    styleUrls: ['./web-projects.component.css']
})

export class DashboardWebProjectsComponent implements OnInit {
    projects: WebProject[];
    selectedProject : WebProject;
    constructor(private projService : WebProjectService) { }

    ngOnInit() {
        this.projService.getWebProjects().subscribe(projArray => this.projects = projArray);
    }
    onSelect(project: WebProject): void {
        this.selectedProject = project;
    }
}
