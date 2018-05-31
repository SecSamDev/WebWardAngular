import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/map';
@Injectable()
export class ArachniService {
  private subscriber: Subscriber<boolean>;
  private pullerObserver: Observable<boolean>;

  constructor(
    private AppSettings: AppSettingsService,
    private http: HttpClient) {
    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });
  }
  getAllReportsREST(): Observable<any[]> {
    return new Observable(observer => {
      this.http.get(this.AppSettings.API_ENDPOINT + 'arachni/rest', { responseType: 'json' })
        .subscribe(data => {
          let keys = Object.keys(data);
          observer.next(keys.map((val, i, arr) => {
            return {
              id: val,
              content: {}
            }
          }));
        }, err => {
          observer.error(err);
        });
    });
  }
  getReportREST(id): Observable<any> {
    return new Observable(observer => {
      this.http.get(this.AppSettings.API_ENDPOINT + 'arachni/rest/' + id, { responseType: 'json' })
        .subscribe(data => {
          observer.next({ id: id, content: data });
        }, err => {
          observer.error(err);
        });
    });
  }
  deleteReportREST(id): Observable<any> {
    return new Observable(observer => {
      this.http.delete(this.AppSettings.API_ENDPOINT + 'arachni/rest/' + id, { responseType: 'json' })
        .subscribe(data => {
          observer.next({ id: id, content: data });
        }, err => {
          observer.error(err);
        });
    });
  }


  subscribeToArachni(): Observable<boolean> {
    return this.pullerObserver;
  }
  private notify() {
    try {
      this.subscriber.next(true);
    } catch (err) { }

  }
}

