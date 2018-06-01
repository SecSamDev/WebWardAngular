import { Component, OnInit, Input } from '@angular/core';
import { ThreatModel } from '../threat-model';

@Component({
  selector: 'threat-model-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ThreatModelViewComponent implements OnInit {
  @Input() model : ThreatModel;
  constructor() { }

  ngOnInit() {
  }

}
