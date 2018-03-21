import { Component, OnInit,Input } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ScanCheck} from './scan-check';
import {ScanCheckService} from './scan-check.service';

@Component({
  selector: 'scan-checks',
  templateUrl: './scan-check.component.html',
  styleUrls: ['./scan-check.component.css']
})
export class ScanCheckComponent implements OnInit {
  private checkList: ScanCheck[];
  private tempCheck: ScanCheck;
  selectedCheck: ScanCheck;
  constructor(public auth : AuthService, private checkService: ScanCheckService) { }
  ngOnInit() {
    this.tempCheck = null;
    this.fetchData();
    this.checkService.subscribeToScanChecks().subscribe((data) => {
      this.fetchData();
    }, err => {

    });
  }
  onSelect(check: ScanCheck): void {
    this.selectedCheck = check;
  }
  fetchData() {
    this.checkService.getScanChecks().subscribe(checks => {
      this.checkList = checks;
    });
  }
  newCheck(){
    this.tempCheck = new ScanCheck();
  }
}
