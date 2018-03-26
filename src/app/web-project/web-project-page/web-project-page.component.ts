import { Component, Input, OnInit } from '@angular/core';
import { WebProject } from '../web-project';
import { WebProjectService } from '../web-project.service';
import { AlertService } from '../../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'web-project-page',
  templateUrl: './web-project-page.component.html',
  styleUrls: ['./web-project-page.component.css']
})
export class WebProjectPageComponent implements OnInit {

  private project: WebProject = new WebProject();

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
}
