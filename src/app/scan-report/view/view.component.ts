import { Component, OnInit, Input } from '@angular/core';
import { ScanReport } from '../scan-report';

@Component({
  selector: 'view-report',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewReportComponent implements OnInit {
  @Input() report : ScanReport;
  constructor() { }

  ngOnInit() {
  }

}
