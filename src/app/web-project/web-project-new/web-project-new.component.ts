import { Component,Input, OnInit } from '@angular/core';
import {WebProject} from '../web-project';
import {WebProjectService} from '../web-project.service';
import {AlertService} from '../../alert/alert.service';
@Component({
  selector: 'web-project-new',
  templateUrl: './web-project-new.component.html',
  styleUrls: ['./web-project-new.component.css']
})
export class WebProjectNewComponent implements OnInit {
  public project: WebProject;
  constructor(private webProjServ : WebProjectService,private alert : AlertService) { }

  ngOnInit() {
    this.project = null;
  }
  newProject(){
    this.project = new WebProject();
    this.project.name = "aaa";
    this.project.description = "bbb"
  }
  save(){
      this.webProjServ.postWebProject(this.project).subscribe((data)=>{
        this.alert.success(`WebProject ${this.project.name} suscessfully created`);
        this.project = null;
      },err=>{
        this.alert.error("Error creating webproject")
      });
  }
  cancel(){
      this.project = null;
  }

}
