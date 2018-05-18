import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-settings.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/map';
import {WebWardModule} from './wwmodule'

@Injectable()
export class WwmodulesService {
  private subscriber: Subscriber<boolean>;
  private pullerObserver: Observable<boolean>;

  constructor(
    private AppSettings : AppSettingsService,
    private http: HttpClient) {
    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });
  }
  getWWModules(): Observable<WebWardModule[]> {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'ww-module').map(data => data as WebWardModule[]);
  }
  deleteWWModules(wwmd: WebWardModule) {
    return this.http.delete(this.AppSettings.API_ENDPOINT + 'ww-module/' + wwmd.name);
  }
  createWWModules(wwmd: WebWardModule) {
    return this.http.post(this.AppSettings.API_ENDPOINT + 'ww-module', wwmd, { responseType: 'json' });
  }
  checkWWModule(wwmd: WebWardModule){
    return this.http.post(this.AppSettings.API_ENDPOINT + 'ww-module/checkModule', wwmd, { responseType: 'json' }).map(data => data as WebWardModule);
  }
  subscribeToWWModules(): Observable<boolean> {
    return this.pullerObserver;
  }
  private notify() {
    try {
      this.subscriber.next(true);
    } catch (err) { }

  }

}
