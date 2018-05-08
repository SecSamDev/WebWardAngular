import { Component, OnInit,Input } from '@angular/core';
import { KubeContainer } from '../container';
import { InfraestructureService } from '../infraestructure.service';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { AlertService } from '../../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'infraestructure-edit',
  templateUrl: './infraestructure-edit.component.html',
  styleUrls: ['./infraestructure-edit.component.css']
})
export class InfraestructureEditComponent implements OnInit {
  private _infraestructure : KubeContainer;
  private _content : string = "";
  @Input() set infraestructure(inf : KubeContainer){
    this._infraestructure = inf;
    this._content = JSON.stringify(inf.content,null, "\t");
  } 
  get infraestructure(){
    return this._infraestructure;
  }
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private infrService : InfraestructureService,
    private alert: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.infrService.findInfraestructure(params['id']))
      .subscribe(infr => this.infraestructure = infr);
  }
  edit() {
    this._infraestructure.content = JSON.parse(this._content)
    this.infrService.updateInfraestructure(this._infraestructure).subscribe(data => {
      this.alert.success("Updated")
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot save Infraestructure")
    });
  }
  cancel() {
    this._infraestructure = null;
    this.location.back();
  }
  sureDelete() {
    this.activeModal.close('Close click');
    this.infrService.deleteInfraestructure(this._infraestructure).subscribe(data => {
      this.alert.success("Deleted");
      this._infraestructure = null;
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
