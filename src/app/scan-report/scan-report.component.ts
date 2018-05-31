import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';
import { ScanReport } from './scan-report';

@Component({
  selector: 'scan-report',
  templateUrl: './scan-report.component.html',
  styleUrls: ['./scan-report.component.css']
})
export class ScanReportComponent implements OnInit {
  private reportList : ScanReport[] = []
  private selectedReport : ScanReport;
  constructor(private reportService : ReportsService) { }

  ngOnInit() {
    this.fetchData();
    this.reportService.subscribeToReports().subscribe(data=>{
      this.fetchData();
    },err=>{})
  }
  fetchData(){
    this.reportService.getReports().subscribe((data)=>{
      this.reportList = data;
    },err=>{
      this.reportList = [];
    })
  }
  onSelect(report : ScanReport){
    this.selectedReport = report;
  }

}
