import { Component, OnInit, Input } from '@angular/core';
import { ReportsService } from '../../scan-report/reports.service';
import { ScanReport } from '../../scan-report/scan-report';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'scan-report-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ScanReportChartComponent implements OnInit {
  multi = [];
  single: any[] = [];
  view: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Vulnerabilities';
  showYAxisLabel = true;
  yAxisLabel = 'Occurrancces';
  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  private _report: ScanReport;
  @Input() set report(rep: ScanReport) {
    this._report = rep;
    if (rep && rep.data && rep.data.issues) {
      this.single = rep.data.issues.map((val, i, arr) => {
        return val.name;
      }).reduce((valLast, val, i, arr) => {
        let vulner = valLast.filter(redVal => redVal.name === val);
        if (!vulner || vulner.length === 0) {
          valLast.push({
            "name": val,
            "value": 1
          })
        } else {
          vulner[0].value++;
        }
        return valLast;
      }, [])
      console.log(this.single)
    }
  }
  get report() {
    return this._report;
  }

  constructor() {
  }
  onSelect(event) {
    console.log(event);
  }
  ngOnInit() {

  }

}
