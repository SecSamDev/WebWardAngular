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
import { PIPE_TAGS } from './pipe-tags';

const pip1Prop = new PipelineNodeAtribute();
pip1Prop.name = "Select Notify System";
pip1Prop.description = "Select a notify system";
pip1Prop.optional = false;
pip1Prop.type = 'select';
pip1Prop.value = ["WebHook, Periodic, Button"];


const pip1 = new PipelineNode();
pip1.name = "Pipe Start";
pip1.id = "";
pip1.tag = PIPE_TAGS.START;
pip1.x = 200;
pip1.y = 200;
pip1.properties = []

const pip2 = new PipelineNode();
pip2.name = "Integration";
pip2.id = "";
pip2.tag = PIPE_TAGS.INTEGRATION;
pip2.x = 500;
pip2.y = 200;
pip2.outputParams = []

const nodes: PipelineNode[] = [
  pip1,pip2
];
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
