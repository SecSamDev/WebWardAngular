import { Injectable } from '@angular/core';
import { AppSettings } from '../appSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebHook } from './webhook'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PipelineNode} from '../pipeline/node'
@Injectable()
export class WebhookService {

  constructor(private http: HttpClient) { }
  getWebHooks(): Observable<WebHook[]> {
    return this.http.get(AppSettings.API_ENDPOINT + 'webhook').map(data => data as WebHook[]);
  }
  deleteWebHook(webhook: WebHook) {
    return this.http.delete(AppSettings.API_ENDPOINT + 'webhook/' + webhook.id);
  }
  createWebHook(webhook: WebHook) {
    return this.http.post(AppSettings.API_ENDPOINT + 'webhook', webhook, { responseType: 'json' });
  }
  getWebHookForNode(node : PipelineNode) {
    return this.http.get(AppSettings.API_ENDPOINT + 'webhook/node/'+node.id, { responseType: 'json' }).map(data => data as WebHook);
  }
  updateWebHook(webhook: WebHook) {
    return this.http.put(AppSettings.API_ENDPOINT + 'webhook/' + webhook.id,webhook, { responseType: 'json' });
  }
}
