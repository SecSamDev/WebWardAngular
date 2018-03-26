import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map'
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppSettings } from '../appSettings';
import { WebProject } from './web-project';
import { AlertService } from '../alert/alert.service';
import { EnvironmentService } from '../environment/environment.service';
import { Environment } from '../environment/environment';

@Injectable()
export class WebProjectService {
  private subscriber : Subscriber<boolean>;
  private pullerObserver :Observable<boolean>;
  constructor(private http: HttpClient, private alertService: AlertService, private envServ: EnvironmentService) {
    this.pullerObserver = new Observable(observer=>{
      this.subscriber = observer;
    });

  }
  getWebProjects(fill: boolean = false): Observable<WebProject[]> {
    if (fill) {
      return this.http.get(AppSettings.API_ENDPOINT + 'webproject')
        .map(data => data as WebProject[])
        .flatMap((projects: WebProject[]) => Observable.forkJoin(projects.map(
          (project: WebProject) => {
            return Observable.forkJoin(project.environments.map(
              (env: Environment) => {
                return this.envServ.getEnvironment(env.id);
              }
            )).map((environmnts: Environment[]) => {
              project.environments = environmnts;
              return project;
            })
          })))
    } else {
      return this.http.get(AppSettings.API_ENDPOINT + 'webproject').map(data => data as WebProject[]);
    }

  }
  getWebProject(id: string, fill: boolean = false): Observable<WebProject> {
    if (fill) {
      return this.http.get(AppSettings.API_ENDPOINT + 'webproject/' + id )
        .map(data => data as WebProject)
        .flatMap((project: WebProject) => {
          return Observable.forkJoin(project.environments.map(
            (env: Environment) => {
              return this.envServ.getEnvironment(env.id);
            }
          )).map((environmnts: Environment[]) => {
            project.environments = environmnts;
            return project;
          })
        }
        )
    } else {
      return this.http.get(AppSettings.API_ENDPOINT + 'webproject/' + id).map(data => data as WebProject);
    }

  }
  postWebProject(project: WebProject) {
    return new Observable(observer=>{
      this.http.post(AppSettings.API_ENDPOINT + 'webproject', project,{responseType : 'json'})
        .subscribe(data=>{
          this.notify();
          observer.next(data);
        },err=>{
          observer.error(err);
        });
    });
  }
  updateWebProject(project: WebProject) {
    return new Observable(observer=>{
      this.http.put(AppSettings.API_ENDPOINT + 'webproject/' + project.id, project,{responseType : 'json'})
        .subscribe(data=>{
          this.notify();
          observer.next(data);
        },err=>{
          observer.error(err);
        });
    });
  }
  deleteWebProject(project: WebProject) {

    return new Observable(observer=>{
      this.http.delete(AppSettings.API_ENDPOINT + 'webproject/' + project.id,{responseType : 'json'})
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
  subscribeToWebProjects():Observable<boolean>{
    return this.pullerObserver;
  }

  /**
   * Use internally
   */
  private notify(){
    try{
      this.subscriber.next(true);
    }catch(err){}
    
  }
}