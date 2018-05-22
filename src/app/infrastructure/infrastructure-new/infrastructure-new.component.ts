import { Component, OnInit, Input } from '@angular/core';
import { InfrastructureService } from '../infrastructure.service';
import { WWInfrastructure } from '../infrastructure';

@Component({
  selector: 'infrastructure-new',
  templateUrl: './infrastructure-new.component.html',
  styleUrls: ['./infrastructure-new.component.css']
})
export class InfrastructureNewComponent implements OnInit {
  private _infrastructure: WWInfrastructure;
  private _content: string = "";
  @Input() set infrastructure(inf: WWInfrastructure) {
    this._infrastructure = inf;
    this._content = JSON.stringify(inf.content,null,"\t")
  }
  get infrastructure() {
    return this._infrastructure;
  }
  constructor(private infrService: InfrastructureService) { }

  ngOnInit() {
  }
  create() {
    try{
      this._infrastructure.content = JSON.parse(this._content)
      this.infrService.createInfrastructure(this.infrastructure).subscribe(data => {
      }, err => {
  
      })
    }catch(err){

    }
    
    
  }
  cancel() {
    this.infrastructure = null;
  }

}
