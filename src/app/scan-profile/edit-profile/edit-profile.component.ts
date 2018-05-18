import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ScanProfile } from '../scan-profile'
import { ScanProfileService } from '../scan-profile.service'
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'edit-scan-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  private _profile: ScanProfile;
  @Input() set profile(prof : ScanProfile){
    this._profile = prof;
    this.array_elements = prof.checks;
    console.log(this.array_elements)
  }
  get profile(){
    return this._profile;
  }
  private checkBackup: ScanProfile;
  private array_elements: string[] = [];
  constructor(
    private alert: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private profileService: ScanProfileService,
  ) { }

  ngOnInit() {
  }
  edit() {
    this._profile.checks = this.array_elements;
    this.profileService.updateProfileTemplate(this.profile).subscribe(data => {
      this.alert.success("Updated")
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot save SecurityCheck")
    });
  }
  cancel() {
    this.profile = null;
  }
  sureDelete() {
    this.activeModal.close('Close click');
    this.profileService.deleteProfileTemplate(this.profile).subscribe(data => {
      this.alert.success("Deleted");
      this.profile = null;
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot delete SecurityCheck")
    });
  }
  deleteModal(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    }).catch(err => {
    });
  }
  addRow() {
    this.array_elements.push(`Element ${this.array_elements.length}`)
  }
  removeRow(pos: number = 0) {
    this.array_elements.splice(pos, 1)
  }
  trackByFn(index: any, item: any) {
    return index;
  }

}
