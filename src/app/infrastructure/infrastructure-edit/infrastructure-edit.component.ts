import { Component, OnInit,Input } from '@angular/core';
import { InfrastructureService } from '../infrastructure.service';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AlertService } from '../../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { WWInfrastructure } from '../infrastructure';

@Component({
  selector: 'infrastructure-edit',
  templateUrl: './infrastructure-edit.component.html',
  styleUrls: ['./infrastructure-edit.component.css']
})
export class InfrastructureEditComponent implements OnInit {
  private _infrastructure : WWInfrastructure;
  private _content : string = "";
  @Input() set infrastructure(inf : WWInfrastructure){
    this._infrastructure = inf;
  } 
  get infrastructure(){
    return this._infrastructure;
  }
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private infrService : InfrastructureService,
    private alert: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.infrService.findInfrastructure(params['id']))
      .subscribe(infr => this.infrastructure = infr);
  }
  edit() {
    this.infrService.updateInfrastructure(this._infrastructure).subscribe(data => {
      this.alert.success("Updated")
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot save Infraestructure")
    });
  }
  cancel() {
    this._infrastructure = null;
    this.location.back();
  }
  sureDelete() {
    this.activeModal.close('Close click');
    this.infrService.deleteInfrastructure(this._infrastructure).subscribe(data => {
      this.alert.success("Deleted");
      this._infrastructure = null;
      this.location.back();
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot delete Infraestructure")
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
}
