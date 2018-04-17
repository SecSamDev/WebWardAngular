import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WebhookService, WebHook } from '../../webhook/index';
import { PipelineNodeAtribute, PipelineNode } from '../../pipeline/node'
import { TypeComponent } from '../type.component'

@Component({
  selector: 'type-webhook',
  templateUrl: './webhook-type.component.html',
  styleUrls: ['./webhook-type.component.css']
})
export class WebhookTypeComponent implements OnInit, TypeComponent {

  private hook: WebHook;
  @Input() node: PipelineNode;
  @Input() param: PipelineNodeAtribute;
  @Output() hookSelected = new EventEmitter<WebHook>();

  constructor(private webhookService: WebhookService) { }

  ngOnInit() {
    this.hook = new WebHook()
    this.webhookService.getWebHookForNode(this.node).subscribe((webhook) => {
      if (webhook !== null)
        this.hook = webhook;
    }, err => {
    })
  }
  save() {
    if (this.hook.id && this.hook.id.length > 3) {
      this.webhookService.updateWebHook(this.hook).subscribe((data) => {
        this.hookSelected.emit(this.hook)
      }, err => { })
    } else {
      this.hook.node = this.node.id;
      if (this.hook.node && this.hook.node.length > 3) {
        this.webhookService.createWebHook(this.hook).subscribe((data) => {
          this.hookSelected.emit(this.hook)
        }, err => { })
      } else {

      }

    }
  }
  delete() {
    this.webhookService.deleteWebHook(this.hook).subscribe((data) => {
      this.hookSelected.emit(null)
      this.hook = null;
    }, err => { })
  }

}
