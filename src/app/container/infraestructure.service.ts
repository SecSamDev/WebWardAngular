import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AppSettings } from '../appSettings';
import { KubeContainer } from './container'
@Injectable()
export class InfraestructureService {

  constructor(private http : HttpClient) { }

  findInfraestructure(id: string) {
    return this.http.get(AppSettings.API_ENDPOINT + 'infraestructure/' + id)
      .map(data => data as KubeContainer);
  }
  findInfraestructures() {
    return this.http.get(AppSettings.API_ENDPOINT + 'infraestructure')
      .map(data => data as KubeContainer[]);
  }
  createInfraestructure(obj: KubeContainer) {
    return this.http.post(AppSettings.API_ENDPOINT + 'infraestructure', obj, { responseType: 'json' }).map(data => data as KubeContainer);
  }
  updateInfraestructure(obj: KubeContainer) {
    return this.http.put(AppSettings.API_ENDPOINT + 'infraestructure/'+obj.id, obj, { responseType: 'json' }).map(data => data as KubeContainer);
  }
  deleteInfraestructure(obj: KubeContainer) {
    return this.http.delete(AppSettings.API_ENDPOINT + 'infraestructure/'+obj.id, { responseType: 'json' }).map(data => data as KubeContainer);
  }
}
