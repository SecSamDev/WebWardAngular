import { Component, OnInit, Input } from '@angular/core';
import { ScanReport } from '../scan-report';

@Component({
  selector: 'full-view-wappalyzer',
  templateUrl: './full-view-wappalyzer.component.html',
  styleUrls: ['./full-view-wappalyzer.component.css']
})
export class FullViewWappalyzerComponent implements OnInit {
  @Input() report : ScanReport;
  constructor() { }

  ngOnInit() {
  }

}
