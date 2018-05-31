import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../scan-report/reports.service';
import { ScanReport } from '../../scan-report/scan-report';
@Component({
  selector: 'reports-dashboard',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: ScanReport[];
  selectedReport: ScanReport;

  constructor(private reportService: ReportsService) {
  }
  fetchData() {
    this.reportService.getReports().subscribe((data) => {
      this.reports = data;
      if (data.length > 0)
        this.selectReport(data[0]);
    }, err => { })
  }
  onSelect(event) {
    this.selectReport(event)
  }
  ngOnInit() {
    //Give time to get webprojects
    setTimeout(this.fetchData.bind(this), 700);
  }
  selectReport(report) {
    
    this.selectedReport = report;
  }

}
