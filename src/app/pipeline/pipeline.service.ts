import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map'
import { AppSettings } from '../appSettings';
import { AlertService } from '../alert/alert.service';

import { PipelineNode,PipelineNodeAtribute } from './node';
import { PIPE_TAGS } from './node';


@Injectable()
export class PipelineService {
  private nodes: PipelineNode[] = [];
  private subscriber: Subscriber<boolean>;
  private pullerObserver: Observable<boolean>;

  constructor(private http: HttpClient,
    private alertService: AlertService
  ) {
    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });

  }

}
