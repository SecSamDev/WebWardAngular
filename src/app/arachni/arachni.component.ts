import { Component, OnInit } from '@angular/core';
import { ArachniService } from './arachni.service';

@Component({
  selector: 'app-arachni',
  templateUrl: './arachni.component.html',
  styleUrls: ['./arachni.component.css']
})
export class ArachniComponent implements OnInit {
  private selectedReport : any;
  private reports : any[];
  constructor(private arachService : ArachniService) { }

  ngOnInit() {
    this.fetchReports()
  }
  fetchReports(){
    this.arachService.getAllReports().subscribe(data=>{
      this.reports = data;
    },err=>{})
  }
  onSelect(report){
    this.selectedReport = report;
  }

}
