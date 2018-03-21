import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map'
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppSettings } from '../appSettings';
import { ScanCheck } from './scan-check';
import { AlertService } from '../alert/alert.service';

@Injectable()
export class ScanCheckService {
  private subscriber : Subscriber<boolean>;
  private pullerObserver :Observable<boolean>;
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.pullerObserver = new Observable(observer=>{
      this.subscriber = observer;
    });

  }
  getScanChecks(): Observable<ScanCheck[]> {
    return this.http.get(AppSettings.API_ENDPOINT + 'check').map(data => data as ScanCheck[]);
  }
  getScanCheck(id: string): Observable<ScanCheck> {
    return this.http.get(AppSettings.API_ENDPOINT + 'check/' + id).map(data => data as ScanCheck);
  }
  postScanCheck(check: ScanCheck) {
    return new Observable(observer=>{
      this.http.post(AppSettings.API_ENDPOINT + 'check', check,{responseType : 'json'})
        .subscribe(data=>{
          this.notify();
          observer.next(data);
        },err=>{
          observer.error(err);
        });
    });
  }
  updateScanCheck(check: ScanCheck) {
    return new Observable(observer=>{
      this.http.put(AppSettings.API_ENDPOINT + 'check/' + check.id, check,{responseType : 'json'})
        .subscribe(data=>{
          this.notify();
          observer.next(data);
        },err=>{
          observer.error(err);
        });
    });
  }
  deleteScanCheck(check: ScanCheck) {

    return new Observable(observer=>{
      this.http.delete(AppSettings.API_ENDPOINT + 'check/' + check.id,{responseType : 'json'})
        .subscribe(data=>{
          this.notify();
          observer.next(data);
        },err=>{
          observer.error(err);
        });
    });
  }
  /**
   * Get notified when a object is deleted, update or created.
   * Dont use it in @Input Components
   */
  subscribeToScanChecks():Observable<boolean>{
    return this.pullerObserver;
  }

  /**
   * Use internally
   */
  private notify(){
    this.subscriber.next(true);
  }
}