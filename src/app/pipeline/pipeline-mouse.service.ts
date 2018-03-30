import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map'
import { AppSettings } from '../appSettings';
import { AlertService } from '../alert/alert.service';

import { PipelineNode, PipelineNodeAtribute } from './node';
import { PIPE_TAGS } from './pipe-tags';

@Injectable()
export class PipelineMouseService {
    private nodes: PipelineNode[] = [];
    private subscriber: Subscriber<any>;
    private pullerObserver: Observable<any>;

    constructor(
        private alertService: AlertService
    ) {
        this.pullerObserver = new Observable(observer => {
            this.subscriber = observer;
        });
    }
    getMouseEvents() {
        return this.pullerObserver;
    }
    sendMouseEvent(event){
        try{
            this.subscriber.next(event);
        }catch(err){}
    }

}
