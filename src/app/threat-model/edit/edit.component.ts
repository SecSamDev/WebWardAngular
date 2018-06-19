import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
  fileTemplate: File;
  model: ThreatModel;

  @ViewChild('autoDownloadContentReport') autoDownload: ElementRef;

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
    if (this.fileModel || this.fileReport || this.fileTemplate) {
      this.thModService.updateThreatModelWithFiles(this.model, this.fileModel, this.fileReport,this.fileTemplate).subscribe((data) => {
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
  fileChangeTemplate(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.fileTemplate = fileList[0];
    }
  }
  cancel(){
    this.location.back();
  }
  downloadFile(name : string){
    this.thModService.downloadFile(name).subscribe((data)=>{
      try{
        var url= window.URL.createObjectURL(data);
        var anchor = this.autoDownload.nativeElement;
        anchor.download =  this.model.name + "_v" + this.model.version + "r" + this.model.review +"."+ name.split('.').pop();
        anchor.href = url;
        anchor.click();
        //window.open(url, '_blank');
      }catch(error){
      }
      
    },err=>{
      console.log(err)
    })
  }
}

