import { Component, OnInit, Input } from '@angular/core';
import { KubeContainer } from '../container';

@Component({
  selector: 'infraestructure-object',
  templateUrl: './infraestructure.component.html',
  styleUrls: ['./infraestructure.component.css']
})
export class InfraestructureComponent implements OnInit {
  private _infraestructure : KubeContainer;
  private _content : string = "";
  @Input() set infraestructure(inf : KubeContainer){
    this._infraestructure = inf;
    console.log(inf.content)
    this._content = JSON.stringify(inf.content,null, "\t");
  } 
  get infraestructure(){
    return this._infraestructure;
  }
  constructor() { }

  ngOnInit() {
  }
 
}
