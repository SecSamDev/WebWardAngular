import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import { AppSettingsService } from '../app-settings.service';
import { ScanReport } from './scan-report';
import { WebProjectService } from '../web-project/web-project.service';

@Injectable()
export class ReportsService {

  private subscriber: Subscriber<boolean>;
  private pullerObserver: Observable<boolean>;

  constructor(private http: HttpClient, private AppSettings: AppSettingsService, private webProjService: WebProjectService) {

    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });

  }
  getReports(): Observable<ScanReport[]> {
    let webProj = this.webProjService.getActualProject();
    if (webProj && webProj.id) {
      return this.http.get(this.AppSettings.API_ENDPOINT + 'report/' + webProj.id).map(data => {
        return (data as ScanReport[]).map((val,i,arr)=>{
          val.daysAgo = millisecsToDays(Math.abs(Date.now() - (new Date(val.create_date)).valueOf()))
          return val;
        })
      });
    }

  }
  getReport(id: string): Observable<ScanReport> {
    let webProj = this.webProjService.getActualProject();
    if (webProj && webProj.id) {
      return this.http.get(this.AppSettings.API_ENDPOINT + 'report/' + webProj.id + "/" + id).map(data => {
        var data2 = data as ScanReport;
        data2.daysAgo = millisecsToDays(Math.abs(Date.now() - (new Date(data2.create_date)).valueOf()))
        return data2;
      });
    }

  }
  deleteReport(id: string) {
    return new Observable(observer => {
      let webProj = this.webProjService.getActualProject();
      if (webProj && webProj.id) {
        this.http.delete(this.AppSettings.API_ENDPOINT + 'report/' + webProj.id + "/" + id, { responseType: 'json' })
          .subscribe(data => {
            this.notify();
            observer.next(data);
          }, err => {
            observer.error(err);
          });
      } else {
        observer.error(new Error("No valid webproject"));
      }

    });
  }
  /**
   * Get notified when a object is deleted, update or created.
   * Dont use it in @Input Components
   */
  subscribeToReports(): Observable<boolean> {
    return this.pullerObserver;
  }

  /**
   * Use internally
   */
  private notify() {
    try {
      this.subscriber.next(true);
    } catch (err) { }

  }

}

function millisecsToDays(mills : number){
  return Math.round(mills/(1000 * 60 * 60 * 24));
}