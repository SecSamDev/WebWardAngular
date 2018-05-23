import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import { AppSettingsService } from '../app-settings.service';
import { WWInfrastructure } from './infrastructure'
@Injectable()
export class InfrastructureService {
  private subscriber: Subscriber<boolean>;
  private pullerObserver: Observable<boolean>;
  constructor(private http: HttpClient, private AppSettings: AppSettingsService) {
    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });
  }

  findInfrastructure(id: string): Observable<WWInfrastructure> {
    return new Observable(observer => {
      this.http.get(this.AppSettings.API_ENDPOINT + 'infrastructure/' + id)
        .map(data => data as WWInfrastructure)
        .subscribe(data => {
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  findInfrastructures(): Observable<WWInfrastructure[]> {
    return new Observable(observer => {
      this.http.get(this.AppSettings.API_ENDPOINT + 'infrastructure')
      .map(data => data as WWInfrastructure[])
        .subscribe(data => {
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  findActiveInfrastructures(): Observable<WWInfrastructure[]> {
    return new Observable(observer => {
      this.http.get(this.AppSettings.API_ENDPOINT + 'infrastructure?active=true')
      .map(data => data as WWInfrastructure[])
        .subscribe(data => {
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  createInfrastructure(obj: WWInfrastructure): Observable<WWInfrastructure> {
    return new Observable(observer => {
      this.http.post(this.AppSettings.API_ENDPOINT + 'infrastructure', obj, { responseType: 'json' })
      .map(data => data as WWInfrastructure)
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  updateInfrastructure(obj: WWInfrastructure): Observable<WWInfrastructure> {
    return new Observable(observer => {
      this.http.put(this.AppSettings.API_ENDPOINT + 'infrastructure/' + obj.id, obj, { responseType: 'json' })
      .map(data => data as WWInfrastructure)
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  updateActiveInfrastructure(obj: WWInfrastructure): Observable<WWInfrastructure> {
    return new Observable(observer => {
      this.http.put(this.AppSettings.API_ENDPOINT + 'infrastructure/' + obj.id + "?active=true", obj, { responseType: 'json' })
      .map(data => data as WWInfrastructure)
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  activateInfrastructure(obj: WWInfrastructure): Observable<WWInfrastructure> {
    return new Observable(observer => {
      this.http.post(this.AppSettings.API_ENDPOINT + 'infrastructure?active=true', obj, { responseType: 'json' })
      .map(data => data as WWInfrastructure)
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  deleteInfrastructure(obj: WWInfrastructure): Observable<WWInfrastructure> {
    return new Observable(observer => {
      this.http.delete(this.AppSettings.API_ENDPOINT + 'infrastructure/' + obj.id, { responseType: 'json' })
      .map(data => data as WWInfrastructure)
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  deleteActiveInfrastructure(obj: WWInfrastructure): Observable<WWInfrastructure>{
    return new Observable(observer => {
    this.http.delete(this.AppSettings.API_ENDPOINT + 'infrastructure/' + obj.name + "?active=true" + (obj.content && obj.content.kind ? "&kind=" + obj.content.kind : ""), { responseType: 'json' })
    .map(data => data as WWInfrastructure)
      .subscribe(data => {
        this.notify();
        observer.next(data);
      }, err => {
        observer.error(err);
      });
  });
  }
  /**
     * Get notified when a object is deleted, update or created.
     * Dont use it in @Input Components
     */
  subscribeToInfrastructures(): Observable<boolean> {
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
