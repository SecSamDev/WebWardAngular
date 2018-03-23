import { Component, OnInit,Input } from '@angular/core';
import {ScanCheck} from '../scan-check';
import {ScanCheckService} from '../scan-check.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'scan-check-new',
  templateUrl: './scan-check-new.component.html',
  styleUrls: ['./scan-check-new.component.css']
})
export class ScanCheckNewComponent implements OnInit {

  @Input() check:ScanCheck;
  private checkBackup : ScanCheck;
  constructor(
    private checkService : ScanCheckService,
    private alert: AlertService
  ) { }
  ngOnInit() {
  }
  save() {
    this.checkService.postScanCheck(this.check).subscribe(data => {
      this.alert.success("Updated")
      this.check = null;
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot save Security Check")
    });
  }
  cancel() {
    this.checkBackup = null;
  }

}
