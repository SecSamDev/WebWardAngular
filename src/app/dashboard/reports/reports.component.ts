import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../scan-report/reports.service';
import { ScanReport } from '../../scan-report/scan-report';
import { WebProjectService } from '../../web-project';
@Component({
  selector: 'reports-dashboard',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: ScanReport[];
  selectedReport: ScanReport;

  constructor(private reportService: ReportsService, private projService : WebProjectService) {
  }
  fetchData() {
    this.reportService.getReports().subscribe((data) => {
      this.reports = data.filter((val,i,arr)=>{
        if(val.reporter.toLowerCase() === 'arachni' || val.reporter.toLowerCase() === 'webward'){
          return true;
        }
        return false;
      });
      if (data.length > 0)
        this.selectReport(data[0]);
    }, err => {
      this.reports = [];
      this.selectedReport = null;
    })
  }
  onSelect(event) {
    this.selectReport(event)
  }
  ngOnInit() {
    this.projService.subscribeToWebProjects().subscribe(data=>{
      this.fetchData();
    },err=>{})
    //Give time to get webprojects
    setTimeout(this.fetchData.bind(this), 700);
  }
  selectReport(report) {
    this.mapAllReports(report);
  }
  mapAllReports(report){
    let auxReport = new ScanReport();
    Object.assign(auxReport,report);
    auxReport.data = {};
    auxReport.data.issues = this.reports.reduce((total,val,i,arr)=>{
      if(val.data && val.data.issues){
        total= total.concat(val.data.issues)
      }
      return total;
    },[]);
    this.selectedReport = auxReport;
  }

}
