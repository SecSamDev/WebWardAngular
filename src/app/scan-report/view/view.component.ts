import { Component, OnInit, Input } from '@angular/core';
import { ScanReport } from '../scan-report';
import { AuthService } from '../../auth/auth.service';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'view-report',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewReportComponent implements OnInit {
  @Input() report : ScanReport;
  constructor(private auth : AuthService,private reportService : ReportsService) {}

  ngOnInit() {
  }
  deleteReport(){
    this.reportService.deleteReport(this.report.id).subscribe(dat=>{},err=>{});
  }

}
