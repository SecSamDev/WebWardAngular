import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ThreatModel } from '../threat-model';
import { AppSettingsService } from '../../app-settings.service';
import { ThreatModelService } from '../threat-model.service';
import 'rxjs/Rx';
@Component({
  selector: 'threat-model-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ThreatModelViewComponent implements OnInit {
  fileURL: string;
  modelURL: string;
  @ViewChild('autoDownloadContentReport') autoDownload: ElementRef;
  private _model: ThreatModel;
  @Input() set model(mod: ThreatModel) {
    this._model = mod;
    this.fileURL = this.APP_SETTINGS.API_FILES + mod.threatmodelreport;
    this.modelURL = this.APP_SETTINGS.API_FILES + mod.threatmodelfile;
  }
  get model() {
    return this._model;
  }




  constructor(private APP_SETTINGS: AppSettingsService, private threatModelServ: ThreatModelService) { }

  ngOnInit() {

  }
  downloadFile(name: string) {
    this.threatModelServ.downloadFile(name).subscribe((data) => {
      try {
        var url = window.URL.createObjectURL(data);
        var anchor = this.autoDownload.nativeElement;
        anchor.download = this.model.name + "_v" + this.model.version + "r" + this.model.review +"."+ name.split('.').pop();
        anchor.href = url;
        anchor.click();
        //window.open(url, '_blank');
      } catch (error) {
      }

    }, err => {
      console.log(err)
    })
  }
}
