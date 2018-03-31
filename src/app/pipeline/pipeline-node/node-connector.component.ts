import { Component, OnInit,Input,Output, EventEmitter,ElementRef } from '@angular/core';
import {NodeConnector} from '../node';
/**
 * SVG Component.
 * Use this component as: 
 * <svg:g pipeline-node  [node]="node"/>
 */
@Component({
  selector: 'svg:g[node-connector]',
  templateUrl: './node-connector.component.html',
  styleUrls: ['./node-connector.component.css']
})
export class NodeConnectorComponent implements OnInit {
  @Input() connector : NodeConnector;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

}


