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
  @Input() set model(mod: ThreatModel) {
    this._model = mod;
    if (mod.threatModelReport && typeof mod.threatModelReport === 'string' && mod.threatModelReport.length > 8)
      this.fileURL = this.APP_SETTINGS.API_ENDPOINT + "/files/" + mod.threatModelFile;
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
