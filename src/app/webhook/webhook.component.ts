import { Component, OnInit,Input } from '@angular/core';
import { WebHook } from './webhook';
import {WebhookService} from './webhook.service'

@Component({
  selector: 'webhook',
  templateUrl: './webhook.component.html',
  styleUrls: ['./webhook.component.css']
})
export class WebhookComponent implements OnInit {
  hooks : WebHook[] = [];
  selectedHook : WebHook= new WebHook();

  private tempHook: WebHook = null;
  constructor(private webhookService : WebhookService) { }

  ngOnInit() {
    console.log("Get webhooks pls")
    this.webhookService.getWebHooks().subscribe((webhooks)=>{
      console.log(webhooks)
      this.hooks = webhooks;
      if(webhooks.length > 0)
          this.selectedHook = webhooks[0];
    },err=>{})
  }
  newHook(){
    this.tempHook = new WebHook();
  }
  onSelect(webhook : WebHook){
    this.selectedHook = webhook;
  }
}
