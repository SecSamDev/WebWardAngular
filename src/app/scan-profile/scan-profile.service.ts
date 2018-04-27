import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map'
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppSettings } from '../appSettings';
import { AlertService } from '../alert/alert.service';
import { ScanProfile } from './scan-profile'

@Injectable()
export class ScanProfileService {
  private subscriber: Subscriber<boolean>;
  private pullerObserver: Observable<boolean>;
  constructor(private http: HttpClient, private alertService: AlertService) {
    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });

  }
  getProfileTemplates(): Observable<ScanProfile[]> {
    return this.http.get(AppSettings.API_ENDPOINT + 'scan_profile').map(data => data as ScanProfile[]);
  }
  /**
   * Get notified when a object is deleted, update or created.
   * Dont use it in @Input Components
   */
  subscribeToScanProfiles(): Observable<boolean> {
    return this.pullerObserver;
  }

  /**
   * Use internally
   */
  private notify() {
    this.subscriber.next(true);
  }
}