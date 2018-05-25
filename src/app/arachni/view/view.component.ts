import { Component, OnInit, Input } from '@angular/core';
import { ArachniService } from '../arachni.service';

@Component({
  selector: 'arachni-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ArachniViewComponent implements OnInit {
  private _report : any;
  private _content : string = "";
  @Input() set report(rep){
    this._report = rep;
    this.arachService.getReport(rep.id).subscribe((dat)=>{
      Object.assign(this._report,dat)
      this._content = JSON.stringify(this._report.content, null, '\t')
    },err=>{
      console.log(err)
    })
  }
  get report(){
    return this._report;
  }
  constructor(private arachService : ArachniService) { }

  ngOnInit() {
  }

}
