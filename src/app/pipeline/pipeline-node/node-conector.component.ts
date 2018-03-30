import { Component, OnInit,Input,Output, EventEmitter,ElementRef } from '@angular/core';
import {NodeConector} from '../node';
/**
 * SVG Component.
 * Use this component as: 
 * <svg:g pipeline-node  [node]="node"/>
 */
@Component({
  selector: 'svg:g[node-conector]',
  templateUrl: './node-conector.component.html',
  styleUrls: []
})
export class NodeConectorComponent implements OnInit {
  @Input() conector : NodeConector;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

}


