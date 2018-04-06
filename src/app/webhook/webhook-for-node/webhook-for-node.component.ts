import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { WebHook } from '../webhook';
import {WebhookService} from '../webhook.service';
import {PipelineNode} from '../../pipeline/node'
@Component({
  selector: 'webhook-for-node',
  templateUrl: './webhook-for-node.component.html',
  styleUrls: ['./webhook-for-node.component.css']
})
export class WebhookForNodeComponent implements OnInit {
  private hook : WebHook;
  @Input() node : PipelineNode;
  @Output() hookSelected = new EventEmitter<WebHook>();

  constructor(private webhookService : WebhookService) { }

  ngOnInit() {
    this.hook = new WebHook()
    this.webhookService.getWebHookForNode(this.node).subscribe((webhook)=>{
      if(webhook !== null)
        this.hook = webhook;
    },err=>{
    })
  }
  save(){
    if(this.hook.id && this.hook.id.length > 3){
      this.webhookService.updateWebHook(this.hook).subscribe((data)=>{
        this.hookSelected.emit(this.hook)
      },err=>{})
    }else{
      this.hook.node = this.node.id;
      if(this.hook.node &&  this.hook.node.length > 3){
        this.webhookService.createWebHook(this.hook).subscribe((data)=>{
          this.hookSelected.emit(this.hook)
        },err=>{})
      }else{

      }
      
    }
  }
  delete(){
    this.webhookService.deleteWebHook(this.hook).subscribe((data)=>{
      this.hookSelected.emit(null)
      this.hook = null;
    },err=>{})
  }
  cancel(){
    this.hook = null;
  }

}
