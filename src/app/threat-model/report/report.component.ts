import { Component, OnInit, Input } from '@angular/core';
import { ThreatModel } from '../threat-model';
import { AppSettingsService } from '../../app-settings.service';
import { ThreatModelService } from '../threat-model.service';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'threat-model-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ThreatModelReportComponent implements OnInit {
  private _model: ThreatModel;
  private reportBlobURL : string;
  @Input() set model(mod: ThreatModel) {
    this._model = mod;
    if (mod.threatmodelreport && (typeof mod.threatmodelreport === 'string')){
      this.downloadFile(mod.threatmodelreport)
    }
  }
  get model() {
    return this._model;
  }
  constructor(
    private APP_SETTINGS: AppSettingsService, 
    private thModService : ThreatModelService,
  private sanitizer : DomSanitizer) { }

  ngOnInit() {
  }
  downloadFile(name : string){
    this.thModService.downloadFile(name).subscribe((data)=>{
      try{
        
        this.reportBlobURL = window.URL.createObjectURL(data);
      }catch(err){
      }
      
    },err=>{
    })
  }
  htmlFrame(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.reportBlobURL);
  }

}
