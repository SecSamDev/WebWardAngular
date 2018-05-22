import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AppSettingsService } from '../app-settings.service';
import { WWInfrastructure } from './infrastructure'
@Injectable()
export class InfrastructureService {
 
  constructor(private http: HttpClient, private AppSettings: AppSettingsService) { }

  findInfrastructure(id: string) {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'infrastructure/' + id)
      .map(data => data as WWInfrastructure);
  }
  findInfrastructures() {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'infrastructure')
      .map(data => data as WWInfrastructure[]);
  }
  createInfrastructure(obj: WWInfrastructure) {
    return this.http.post(this.AppSettings.API_ENDPOINT + 'infrastructure', obj, { responseType: 'json' }).map(data => data as WWInfrastructure);
  }
  updateInfrastructure(obj: WWInfrastructure) {
    return this.http.put(this.AppSettings.API_ENDPOINT + 'infrastructure/' + obj.id, obj, { responseType: 'json' }).map(data => data as WWInfrastructure);
  }
  deleteInfrastructure(obj: WWInfrastructure) {
    return this.http.delete(this.AppSettings.API_ENDPOINT + 'infrastructure/' + obj.id, { responseType: 'json' }).map(data => data as WWInfrastructure);
  }
}
