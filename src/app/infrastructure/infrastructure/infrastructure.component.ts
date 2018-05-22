import { Component, OnInit, Input } from '@angular/core';
import { WWInfrastructure } from '../infrastructure';


@Component({
  selector: 'infrastructure-object',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.css']
})
export class InfrastructureObjectComponent implements OnInit {
  private _infrastructure : WWInfrastructure;
  @Input() set infrastructure(inf : WWInfrastructure){
    this._infrastructure = inf;
  } 
  get infrastructure(){
    return this._infrastructure;
  }
  constructor() { }

  ngOnInit() {
  }
 
}
