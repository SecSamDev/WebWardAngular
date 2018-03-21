import { Component, OnInit, Input } from '@angular/core';
import { ScanCheck } from '../scan-check';
import { ScanCheckService } from '../scan-check.service';
import { AlertService } from '../../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'scan-check-edit',
  templateUrl: './scan-check-edit.component.html',
  styleUrls: ['./scan-check-edit.component.css']
})
export class ScanCheckEditComponent implements OnInit {

  @Input() check: ScanCheck;
  private checkBackup: ScanCheck;
  constructor(
    public auth: AuthService, private checkService: ScanCheckService,
    private alert: AlertService, private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {}
  edit() {
    this.checkBackup = Object.assign({}, this.check);
    this.checkService.updateScanCheck(this.check).subscribe(data => {
      this.alert.success("Updated")
    }, err => {
      this.alert.error("Cannot save SecurityCheck")
    });
  }
  cancel() {
    this.check = Object.assign(this.check, this.checkBackup);
    this.check = null;
  }
  sureDelete() {
    this.activeModal.close('Close click');
    this.checkService.deleteScanCheck(this.check).subscribe(data => {
      this.alert.success("Deleted");
      this.check = null;
      this.checkBackup = null;
    }, err => {
      this.alert.error("Cannot delete sECURITY cHECK")
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
