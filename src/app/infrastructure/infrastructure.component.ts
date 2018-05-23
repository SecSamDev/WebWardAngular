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
  activeInfrastructures : WWInfrastructure[] = [];
  selectedInfrastructure : WWInfrastructure;
  tempInfrastructure : WWInfrastructure;
  constructor(private infrServ : InfrastructureService) { }

  ngOnInit() {
    this.infrServ.subscribeToInfrastructures().subscribe(()=>{
      this.fetchData()
      this.fetcActivehData()
    },err=>{})
    this.fetchData()
    this.fetcActivehData()
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
  fetcActivehData(){
    this.infrServ.findActiveInfrastructures().subscribe((data)=>{
      console.log(data)
      this.activeInfrastructures = data;
    },err=>{})
  }
  fetchAll(){
    this.fetchData()
    this.fetcActivehData()
  }
}
