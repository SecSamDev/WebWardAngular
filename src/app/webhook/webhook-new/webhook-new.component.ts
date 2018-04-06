import { Component, OnInit, Input } from '@angular/core';
import { WebHook } from '../webhook'
import { WebhookService } from '../webhook.service'
import { AlertService } from '../../alert/alert.service';
import { PipelineService } from '../../pipeline/pipeline.service';
import { PipelineNode } from '../../pipeline/node';
import { Pipeline } from '../../pipeline/pipeline';

@Component({
  selector: 'webhook-new',
  templateUrl: './webhook-new.component.html',
  styleUrls: ['./webhook-new.component.css']
})
export class WebhookNewComponent implements OnInit {
  private _hook: WebHook;
  private nodes: PipelineNode[];
  private pipes: Pipeline[];
  private selectedPipe: Pipeline;

  @Input() set hook(value: WebHook) {
    this._hook = value;
  }

  get hook(): WebHook {
    return this._hook;
  }
  
  constructor(private webhookService: WebhookService,
    private alert: AlertService,
    private pipeService: PipelineService) { }

  ngOnInit() {
    this.pipeService.findPipelines().subscribe((pips) => {
      this.pipes = pips;
      if(pips.length > 0)
          this.selectPipe(pips[0])
    }, err => { })

  }
  selectPipe(pipe : Pipeline) {
    this.selectedPipe = pipe;
    this.pipeService.getNodesForPipeline(pipe).subscribe((nodes) => {
      this.nodes = nodes;
    }, err => {
    })
  }
  cancel() {
    this._hook = null;
  }
  create() {
    this.webhookService.createWebHook(this.hook).subscribe((data) => {
      this.alert.success("WebHook Saved")
    }, err => {
      this.alert.error("Cannot save Webhook")
    })
  }
}
