import { Component, Input, OnInit } from '@angular/core';
import { WebProject } from './web-project';
import { WebProjectService } from './web-project.service';
import { AlertService } from '../alert/alert.service';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'web-project',
  templateUrl: './web-project.component.html',
  styleUrls: ['./web-project.component.css']
})
export class WebProjectComponent implements OnInit {
  @Input() project: WebProject;
  private projectBackup: WebProject;
  constructor(private webProjServ: WebProjectService, private alert: AlertService, private modalService: NgbModal,public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  edit() {
    this.projectBackup = Object.assign({}, this.project);
    this.webProjServ.updateWebProject(this.project).subscribe(data => {
      this.alert.success("Updated")
    }, err => {
      this.alert.error("Cannot save WebProject")
    });
  }
  cancel() {
    this.project = Object.assign(this.project, this.projectBackup);
    this.project = null;
  }
  sureDelete() {
    this.activeModal.close('Close click');
    this.webProjServ.deleteWebProject(this.project).subscribe(data => {
      this.alert.success("Deleted");
      this.project = null;
      this.projectBackup = null;
    }, err => {
      this.alert.error("Cannot delete WebProject")
    });
  }
  deleteModal(content){
    this.modalService.open(content).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.error(reason)
    }).catch(err=>{
      console.error(err)
    });
  }
  ngOnChanges() {
    this.projectBackup = Object.assign({}, this.project);
  }

}
