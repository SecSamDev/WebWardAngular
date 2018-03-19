import { Component, OnInit } from '@angular/core';
import { WebProject, } from '../../web-project/web-project';
import {WebProjectService} from '../../web-project/web-project.service';

@Component({
    selector: 'web-project-list',
    templateUrl: './web-project-list.component.html',
    styleUrls: ['./web-project-list.component.css']
})

/**
 * List of all of the WebProjects that the user have access to
 */
export class WebProjectListComponent implements OnInit {
    projects: WebProject[];
    selectedProject : WebProject;
    constructor(private projService : WebProjectService) { }
    ngOnInit() {
        this.fetchData();
        this.projService.subscribeToWebProjects().subscribe((data)=>{
            this.fetchData();
        },err=>{

        });
    }
    onSelect(project: WebProject): void {
        this.selectedProject = project;
    }
    fetchData(){
        this.projService.getWebProjects().subscribe(projArray =>{
            this.projects = projArray;
            console.log(projArray)
        });
    }
}
