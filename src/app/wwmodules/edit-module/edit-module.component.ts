import { Component, OnInit,Input } from '@angular/core';
import {WebWardModule} from '../wwmodule'
import {WwmodulesService} from '../wwmodules.service'
import { AlertService } from '../../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {
  @Input() mod : WebWardModule;
  constructor(
    private alert: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private wwmodService : WwmodulesService) { }

  ngOnInit() {
  }
  cancel() {
    this.mod = null;
  }
  sureDelete() {
    this.activeModal.close('Close click');
    this.wwmodService.deleteWWModules(this.mod).subscribe(data => {
      this.alert.success("Deleted");
      this.mod = null;
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot delete Module")
    });
  }
  deleteModal(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    }).catch(err => {
    });
  }

}
