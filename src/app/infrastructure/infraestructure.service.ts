import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AppSettingsService } from '../app-settings.service';
import { WWInfraestructure } from './infraestructure'
@Injectable()
export class InfraestructureService {
 
  constructor(private http: HttpClient, private AppSettings: AppSettingsService) { }

  findInfraestructure(id: string) {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'infraestructure/' + id)
      .map(data => data as WWInfraestructure);
  }
  findInfraestructures() {
    return this.http.get(this.AppSettings.API_ENDPOINT + 'infraestructure')
      .map(data => data as WWInfraestructure[]);
  }
  createInfraestructure(obj: WWInfraestructure) {
    return this.http.post(this.AppSettings.API_ENDPOINT + 'infraestructure', obj, { responseType: 'json' }).map(data => data as WWInfraestructure);
  }
  updateInfraestructure(obj: WWInfraestructure) {
    return this.http.put(this.AppSettings.API_ENDPOINT + 'infraestructure/' + obj.id, obj, { responseType: 'json' }).map(data => data as WWInfraestructure);
  }
  deleteInfraestructure(obj: WWInfraestructure) {
    return this.http.delete(this.AppSettings.API_ENDPOINT + 'infraestructure/' + obj.id, { responseType: 'json' }).map(data => data as WWInfraestructure);
  }
}
