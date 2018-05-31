import { ReportsService } from '../reports.service';
import { Component, Input, OnInit } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { ScanReport } from '../scan-report';

@Component({
  selector: 'report-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.css']
})
export class FullReportViewComponent implements OnInit {
  private report : ScanReport;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private reportService:  ReportsService, 
    private alert: AlertService, ) { }

  ngOnInit() {
    setTimeout(this.fetchData.bind(this),500);
  }
  fetchData(){
    this.route.params
    .switchMap((params: Params) => this.reportService.getReport(params['id']))
    .subscribe((data)=>{
      console.log(data)
      this.report = data;
    },err=>{});
  }

}
