import { Component, OnInit, Input } from '@angular/core';
import { ScanCheck } from '../scan-check';
import { ScanCheckService } from '../scan-check.service';
import { AlertService } from '../../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'scan-check-edit',
  templateUrl: './scan-check-edit.component.html',
  styleUrls: ['./scan-check-edit.component.css']
})
export class ScanCheckEditComponent implements OnInit {

  private check: ScanCheck = new ScanCheck();
  private checkBackup: ScanCheck;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private alert: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private checkService: ScanCheckService,
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.checkService.getScanCheck(params['id']))
      .subscribe(check => this.check = check);
  }
  edit() {
    this.checkService.updateScanCheck(this.check).subscribe(data => {
      this.alert.success("Updated")
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot save SecurityCheck")
    });
  }
  cancel() {
    this.check = null;
    this.location.back();
  }
  sureDelete() {
    this.activeModal.close('Close click');
    this.checkService.deleteScanCheck(this.check).subscribe(data => {
      this.alert.success("Deleted");
      this.check = null;
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot delete SecurityCheck")
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
