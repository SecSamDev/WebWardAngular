import { Component, OnInit, Input } from '@angular/core';
import { ThreatModel } from '../threat-model';
import { AppSettingsService } from '../../app-settings.service';
@Component({
  selector: 'threat-model-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ThreatModelReportComponent implements OnInit {
  private _model: ThreatModel;
  private fileURL: string;
  private modelURL : string;
  @Input() set model(mod: ThreatModel) {
    this._model = mod;
    if (mod.threatmodelreport && (typeof mod.threatmodelreport === 'string')){
      this.fileURL = this.APP_SETTINGS.API_FILES + mod.threatmodelreport;
      this.modelURL = this.APP_SETTINGS.API_FILES + mod.threatmodelfile;
    }
    else
      this.fileURL = null;
  }
  get model() {
    return this._model;
  }
  constructor(private APP_SETTINGS: AppSettingsService) { }

  ngOnInit() {
  }

}
