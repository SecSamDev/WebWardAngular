import { Component, OnInit } from '@angular/core';
import { ThreatModel } from './threat-model';
import { ThreatModelService } from './threat-model.service';

@Component({
  selector: 'app-threat-model',
  templateUrl: './threat-model.component.html',
  styleUrls: ['./threat-model.component.css']
})
export class ThreatModelComponent implements OnInit {

  private models: ThreatModel[] = []
  private selectedModel: ThreatModel;
  private tempModel: ThreatModel;
  constructor(private thModService: ThreatModelService) { }

  ngOnInit() {
    this.fetchData();
    this.thModService.subscribeToThreatModel().subscribe(data => {
      this.fetchData();
    }, err => { })
  }
  fetchData() {
    this.thModService.getThreatModels().subscribe((data) => {
      this.models = data;
    }, err => {
      this.models = [];
    })
  }
  onSelect(mod: ThreatModel) {
    this.selectedModel = mod;
  }
  newThreatModel(){
    console.log("New threat model")
    this.tempModel = new ThreatModel();
    this.tempModel.name = "Threat Model Name";
    this.tempModel.description = "Threat Model Description"
  }


}
