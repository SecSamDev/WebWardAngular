import { Component, OnInit, Input } from '@angular/core';
import { ScanCheck } from '../scan-check';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'scan-check-view',
  templateUrl: './scan-check-view.component.html',
  styleUrls: ['./scan-check-view.component.css']
})
export class ScanCheckViewComponent implements OnInit {

  @Input() check: ScanCheck;
  constructor(public auth : AuthService) { }

  ngOnInit() {}

}
