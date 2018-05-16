import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WebhookService, WebHook } from '../../webhook/index';
import { PipelineNodeAtribute, PipelineNode,PipelineService } from '../../pipeline/index'
import { TypeComponent } from '../type.component'
import { AlertService } from '../../alert/alert.service'

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

  constructor(private webhookService: WebhookService, private pipService : PipelineService, private alert : AlertService) { }

  ngOnInit() {
    this.hook = new WebHook()
    this.webhookService.getWebHookForNode(this.node).subscribe((webhook) => {
      if (webhook !== null)
        this.hook = webhook;
        if(this.param.value === '' || !this.param.value){
          this.param.value = this.hook.id;
          this.pipService.updateNodeForPipeline(this.node).subscribe((data)=>{
            this.alert.success("Propertie: " + this.param.name + " saved")
          },err=>{
            this.alert.error("Cannot save propertie: " +this.param.name)
          })
        }
    }, err => {
    })
  }
  activate(){
    if(this.hook.id){
      this.webhookService.activateWebHook(this.hook).subscribe((data)=>{
        this.alert.success("Webhook: " + this.hook.name + " activated")
      },err=>{
        this.alert.error("Cannot activate webhook")
      })
    }
  }
  save() {
    if (this.hook.id && this.hook.id.length > 3) {
      //Webhook alredy exists
      
      this.webhookService.updateWebHook(this.hook).subscribe((data) => {
        this.hookSelected.emit(this.hook)
      }, err => { })
    } else {
      this.hook.node = this.node.id;
      if (this.hook.node && this.hook.node.length > 3) {
        //Node exists but hook not
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
