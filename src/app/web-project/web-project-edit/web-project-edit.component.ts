import { Component, Input, OnInit } from '@angular/core';
import { WebProject } from '../web-project';
import { WebProjectService } from '../web-project.service';
import { AlertService } from '../../alert/alert.service';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'web-project-edit',
  templateUrl: './web-project-edit.component.html',
  styleUrls: ['./web-project-edit.component.css']
})
export class WebProjectEditComponent implements OnInit {

  private project: WebProject = new WebProject();

  private projectBackup: WebProject;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private webProjServ: WebProjectService, 
    private alert: AlertService, 
    private modalService: NgbModal, 
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.webProjServ.getWebProject(params['id']))
      .subscribe(proj => {
        this.project = proj;
      });
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
    this.location.back();
  }
  sureDelete() {
    this.activeModal.close('Close click');
    this.webProjServ.deleteWebProject(this.project).subscribe(data => {
      this.alert.success("Deleted");
      this.project = null;
      this.projectBackup = null;
      this.location.back();
    }, err => {
      this.alert.error("Cannot delete WebProject")
    });
  }
  deleteModal(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.error(reason)
    }).catch(err => {
      console.error(err)
    });
  }
  ngOnChanges() {
    this.projectBackup = Object.assign({}, this.project);
  }

}
