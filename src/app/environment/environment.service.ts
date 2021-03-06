import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { JwtHelperService } from '@auth0/angular-jwt';
import { Environment } from './environment';
import { AlertService } from '../alert/alert.service';
import { AppSettingsService } from '../app-settings.service';

@Injectable()
export class EnvironmentService {
  constructor(private http: HttpClient, private alertService: AlertService,private AppSettings : AppSettingsService) { }
  getEnvironments(fill: boolean = false): Observable<Environment[]> {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'environment').map(data => data as Environment[]);

  }
  getEnvironment(id: string, fill: boolean = false): Observable<Environment> {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'environment/' + id).map(data => data as Environment);
  }
  postEnvironment(env: Environment) {
    return this.http.post(this.AppSettings.API_ENDPOINT + 'environment', JSON.stringify(env));
  }
  updateEnvironment(env: Environment) {
    return this.http.put(this.AppSettings.API_ENDPOINT + 'environment/' + env.id, JSON.stringify(env));
  }
  deleteEnvironment(env: Environment) {
    return this.http.delete(this.AppSettings.API_ENDPOINT + 'environment/' + env.id);
  }
}