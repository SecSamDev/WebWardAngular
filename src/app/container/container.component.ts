import { Component, OnInit } from '@angular/core';
import {KubeContainer} from './container'
import { InfraestructureService } from './infraestructure.service';
@Component({
  selector: 'container-list',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
/**
 * Show a docker container
 */
export class ContainerComponent implements OnInit {
  private infraestructures : KubeContainer[] = [];
  private selected : KubeContainer;
  private newInf : KubeContainer = null;
  constructor(private infrService : InfraestructureService) { }

  ngOnInit() {
    this.infrService.findInfraestructures().subscribe(infrs =>{
      this.infraestructures = infrs;
    },err=>{

    })
  }
  onSelect(infr : KubeContainer){
    this.selected = infr;
  }
  newInfraestructure(){
    this.newInf = new KubeContainer();
  }

}
