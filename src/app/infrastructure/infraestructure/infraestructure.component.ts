import { Component, OnInit, Input } from '@angular/core';
import { WWInfraestructure } from '../infraestructure';


@Component({
  selector: 'infraestructure-object',
  templateUrl: './infraestructure.component.html',
  styleUrls: ['./infraestructure.component.css']
})
export class InfraestructureComponent implements OnInit {
  private _infraestructure : WWInfraestructure;
  @Input() set infraestructure(inf : WWInfraestructure){
    this._infraestructure = inf;
  } 
  get infraestructure(){
    return this._infraestructure;
  }
  constructor() { }

  ngOnInit() {
  }
 
}
