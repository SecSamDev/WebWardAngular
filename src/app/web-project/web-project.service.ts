import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppSettings } from '../appSettings';
import { WebProject } from './web-project';
import { AlertService } from '../alert/alert.service';
import { EnvironmentService } from '../environment/environment.service';
import { Environment } from '../environment/environment';
@Injectable()
export class WebProjectService {
  constructor(private http: HttpClient, private alertService: AlertService, private envServ: EnvironmentService) { }
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
      return this.http.get(AppSettings.API_ENDPOINT + 'webproject')
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
    return this.http.post(AppSettings.API_ENDPOINT + 'webproject', JSON.stringify(project));
  }
  updateWebProject(project: WebProject) {
    return this.http.put(AppSettings.API_ENDPOINT + 'webproject/' + project.id, JSON.stringify(project));
  }
  deleteWebProject(project: WebProject) {
    return this.http.delete(AppSettings.API_ENDPOINT + 'webproject/' + project.id);
  }
}