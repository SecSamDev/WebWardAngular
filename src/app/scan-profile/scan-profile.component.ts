import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ScanProfile } from './scan-profile'
import { ScanProfileService } from './scan-profile.service'

@Component({
  selector: 'scan-profile',
  templateUrl: './scan-profile.component.html',
  styleUrls: ['./scan-profile.component.css']
})
export class ScanProfileComponent implements OnInit {
  private profileList: ScanProfile[];
  private tempProfile: ScanProfile;
  selectedProfile: ScanProfile;
  constructor(public auth: AuthService, private profileService: ScanProfileService) { }
  ngOnInit() {
    this.tempProfile = null;
    this.fetchData();
    this.profileService.subscribeToScanProfiles().subscribe((data) => {
      this.fetchData();
    }, err => {

    });
  }
  onSelect(check: ScanProfile): void {
    this.selectedProfile = check;
  }
  fetchData() {
    this.profileService.getProfileTemplates().subscribe(checks => {
      this.profileList = checks;
    });
  }
  newProfile() {
    this.tempProfile = new ScanProfile();
  }
  cloneProfile(){
    if(this.selectedProfile){
      this.tempProfile = new ScanProfile();
      Object.assign(this.tempProfile,this.selectedProfile);
    }
  }

}
