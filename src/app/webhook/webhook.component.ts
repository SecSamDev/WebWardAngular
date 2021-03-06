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
    this.webhookService.subscribeToWebHooks().subscribe((data)=>{
      this.fetchWebHooks();
    },err=>{})
    this.fetchWebHooks();
    
  }
  newHook(){
    this.tempHook = new WebHook();
  }
  onSelect(webhook : WebHook){
    this.selectedHook = webhook;
  }
  fetchWebHooks(){
    console.log("Fetching")
    this.webhookService.getWebHooks().subscribe((webhooks)=>{
      this.hooks = webhooks;
      if(webhooks.length > 0)
          this.selectedHook = webhooks[0];
      else
        this.selectedHook = null;
    },err=>{
      this.hooks = [];
      this.selectedHook = null;
    })
  }
}
