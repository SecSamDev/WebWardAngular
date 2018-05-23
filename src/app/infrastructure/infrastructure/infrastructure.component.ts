import { Component, OnInit, Input } from '@angular/core';
import { WWInfrastructure } from '../infrastructure';
import { InfrastructureService } from '../infrastructure.service';
import { AlertService } from '../../alert/alert.service';


@Component({
  selector: 'infrastructure-object',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.css']
})
export class InfrastructureObjectComponent implements OnInit {
  private _infrastructure : WWInfrastructure;
  private _content : string ="{}";
  @Input() set infrastructure(inf : WWInfrastructure){
    this._infrastructure = inf;
    this._content = JSON.stringify(this._infrastructure.content,null,"\t")
  } 
  get infrastructure(){
    return this._infrastructure;
  }
  constructor(private infrServ : InfrastructureService,private alert : AlertService) { }

  ngOnInit() {
  }
  editActive(){
    try{
      this._infrastructure.content = JSON.parse(this._content);
    }catch(err){}
    this.infrServ.updateActiveInfrastructure(this._infrastructure).subscribe((dat)=>{
      this.alert.clear();
      this.alert.success(`Infrastructure ${this._infrastructure.name} updated`)
    },err=>{
      this.alert.error(`Can´t update ${this._infrastructure.name}`)
    })
  }
  activateInfr(){
    this.infrServ.activateInfrastructure(this._infrastructure).subscribe((dat)=>{
      this.alert.success(`Infrastructure ${this._infrastructure.name} activated`)
    },err=>{
      this.alert.success(`Can´t activate ${this._infrastructure.name}`)
    })
  }
  deleteInfr(){
    this.infrServ.deleteActiveInfrastructure(this._infrastructure).subscribe((dat)=>{
      this.alert.success(`Infrastructure ${this._infrastructure.name} deleted`)
    },err=>{
      this.alert.success(err.error && err.error.error ? err.error.error : `Can´t delete ${this._infrastructure.name}`)
    })
  }
 
}
