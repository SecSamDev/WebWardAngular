import { Component, OnInit } from '@angular/core';
import { WWInfrastructure } from './infrastructure';
import {InfrastructureService} from './infrastructure.service'
@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.css']
})
export class InfrastructureComponent implements OnInit {
  infrastructures : WWInfrastructure[] = [];
  selectedInfrastructure : WWInfrastructure;
  tempInfrastructure : WWInfrastructure;
  constructor(private infrServ : InfrastructureService) { }

  ngOnInit() {
    this.fetchData()
  }
  fetchData(){
    this.infrServ.findInfrastructures().subscribe((data)=>{
      this.infrastructures = data;
    },err=>{})
  }
  newInfrastructure(){
    this.tempInfrastructure = new WWInfrastructure();
  }
  onSelect(infr: WWInfrastructure){
    this.selectedInfrastructure = infr;
  }
}
