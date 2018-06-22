import { Component, OnInit, Input } from '@angular/core';
import { ScanReport } from '../scan-report';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'report-chart-temporal',
  templateUrl: './chart-temporal.component.html',
  styleUrls: ['./chart-temporal.component.css']
})
export class ReportChartTemporalComponent implements OnInit {
  private _reports: ScanReport[];
  multi: any[];

  view: any[] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Days';
  showYAxisLabel = true;
  yAxisLabel = 'Vulnerabilities';
  added: string[] = [];
  colorScheme = {
    domain: []
  };
  @Input() set reports(reps: ScanReport[]) {
    this._reports = reps;
    if (reps[0] && reps[0].data && reps[0].data.issues) {
      this.multi = this.reduceAndMap(reps);
      console.log(this.multi)
    }
    
  }
  get reports() {
    return this._reports;
  }
  constructor() { }

  ngOnInit() {
  }
  addColorForSeverity(sev) {
    //['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    if (this.added.find((val, i, obj) => {
      if (val === sev)
        return true;
      return false;
    })) {
      return;
    } else {
      this.added.push(sev)
      if (sev === 'informational') {
        this.colorScheme.domain.push('#AAAAAA')
      } else if (sev === "low") {
        this.colorScheme.domain.push("#5AA454")
      } else {
        this.colorScheme.domain.push("#A10A28")
      }
    }

  }
  reduceAndMap(reps){
    return this.reReduce(reps.map((val, i, arr) => {
      let day = new Date(val.create_date)
      return {
        "name": day.getUTCDate() + "/" + (day.getMonth() + 1),
        "series": val.data.issues.reduce((total, isu, j, arr2) => {
          this.addColorForSeverity(isu.severity)
          let vulner = total.filter(redVal => redVal.name === isu.severity);
          if (vulner === null || vulner.length === 0) {
            total.push({
              "name": isu.severity,
              "value": 1
            })
          } else {
            vulner[0].value++;
          }
          return total;
        }, [])
      }
    }))
  }
  reReduce(data){
    return data.reduce((total, isu, j, arr2) => {
      let vulner = total.filter(redVal => redVal.name === isu.name);
      if (vulner === null || vulner.length === 0) {
        total.push({
          "name": isu.name,
          "value": 1
        })
      } else {
        vulner[0].value++;
      }
      return total;
    }, [])
  }

}
