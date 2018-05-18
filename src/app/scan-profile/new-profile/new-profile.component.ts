import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { ScanProfile } from '../scan-profile'
import { ScanProfileService } from '../scan-profile.service'

@Component({
  selector: 'new-scan-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {
  private _profile: ScanProfile;
  @Input() set profile(prof : ScanProfile){
    this._profile = prof;
    this.array_elements = prof.checks;
  }
  get profile(){
    return this._profile;
  }
  private array_elements: string[] = [];

  constructor(
    private alert: AlertService,
    private profileService: ScanProfileService,
  ) { }

  ngOnInit() {
  }
  save() {
    this.profileService.createProfileTemplate(this.profile).subscribe(data => {
      this.alert.success("Created")
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot save SecurityCheck")
    });
  }
  cancel() {
    this.profile = null;
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
