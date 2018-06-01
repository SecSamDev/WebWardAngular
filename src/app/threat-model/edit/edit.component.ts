import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { ThreatModelService } from '../threat-model.service';
import { ThreatModel } from '../threat-model';
import { ThreatModelNewComponent } from '../new/new.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'threat-model-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ThreatModelEditComponent implements OnInit {
  fileModel: File;
  fileReport: File;
  model: ThreatModel;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private alert: AlertService,
    private thModService: ThreatModelService,
  ) { }

  ngOnInit() {
    setTimeout(this.fetchData.bind(this),500);
  }
  fetchData(){
    this.route.params
    .switchMap((params: Params) => this.thModService.getThreatModel(params['id']))
    .subscribe((data)=>{
      this.model = data;
    },err=>{});
  }
  save() {
    this.thModService.updateThreatModel(this.model).subscribe((data) => {
      this.alert.success("Threat Model saved")
    }, err => {
      this.alert.success("Can´t save Threat Model")
    })
  }
  saveFiles() {
    if (this.fileModel || this.fileReport) {
      this.thModService.updateThreatModelWithFiles(this.model, this.fileModel, this.fileReport).subscribe((data) => {
        this.alert.success("Threat Model saved")
      }, err => {
        console.log(err)
        this.alert.error("Can´t save Threat Model")
      })
    }
  }
  fileChangeModel(event) {
    let fileList: FileList = event.target.files;
    console.log(fileList)
    if (fileList.length > 0) {
      this.fileModel = fileList[0];
    }
  }
  fileChangeReport(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.fileReport = fileList[0];
    }
  }
}

