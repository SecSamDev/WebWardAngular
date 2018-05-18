import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PipelineNodeAtribute, PipelineNode, PipelineService } from '../../../pipeline/index'
import { AlertService } from '../../../alert/alert.service'
import { TypeComponent } from '../../type.component'

@Component({
  selector: 'type-arach-auth',
  templateUrl: './arach-auth-type.component.html',
  styleUrls: ['./arach-auth-type.component.css']
})
export class ArachAuthTypeComponent implements OnInit, TypeComponent {
  private _param: PipelineNodeAtribute = new PipelineNodeAtribute();
  private username: string = "";
  private password: string = "";
  private type: string = "bearer";
  @Input() node: PipelineNode;

  @Input() set param(prm) {
    this._param = prm;
    try {
      let obj = JSON.parse(prm.value)
      if ('password' in obj) {
        this.password = (obj.password).toString();
      }
      if ('username' in obj) {
        this.username = (obj.username).toString();
      }
      if ('type' in obj) {
        this.type = (obj.type).toString();
      }
    } catch (err) {
      try {
        prm.value = JSON.stringify({ 'username': '', 'password': '', 'type': 'bearer' });
      } catch (err2) { }
    }
  };
  get param() {
    return this._param;
  }

  constructor(private pipService: PipelineService, private alert: AlertService) { }

  ngOnInit() {

  }
  save() {
    try {
      this._param.value = JSON.stringify({ 'username': this.username, 'password': this.password, 'type': this.type });
      this.pipService.updateNodeForPipeline(this.node).subscribe((data) => {
        this.alert.success("Arachni Authentication saved")
      }, err => {
        this.alert.error("Cannot save authentication")
      })
    } catch (err) { }
  }
  delete() {
    this.username = "";
    this.password = "";
    this.type = "none";
    this.save();
  }

}
