import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ScanReport } from '../scan-report';

@Component({
  selector: 'full-view-arachni',
  templateUrl: './full-view-arachni.component.html',
  styleUrls: ['./full-view-arachni.component.css']
})
export class FullViewArachniComponent implements OnInit {
  @Input() report : ScanReport;
  @Output() reportOut = new EventEmitter<Boolean>()
  constructor() { }

  ngOnInit() {
  }

}
