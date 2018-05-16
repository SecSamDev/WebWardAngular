import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PipelineNodeAtribute, PipelineNode, PipelineService } from '../../pipeline/index'
import { TypeComponent } from '../type.component'
import { AlertService } from '../../alert/alert.service'
import { ScanProfileService } from '../../scan-profile/scan-profile.service';
import { ScanProfile } from '../../scan-profile/scan-profile';

@Component({
  selector: 'type-scan-profile',
  templateUrl: './scan-profile-type.component.html',
  styleUrls: ['./scan-profile-type.component.css']
}) 
export class ScanProfileTypeComponent implements OnInit, TypeComponent {
  private templates: ScanProfile[] = [];
  @Input() node: PipelineNode;
  @Input() param: PipelineNodeAtribute;
  private array_elements: string[] = [];

  constructor(private pipService: PipelineService, private alert: AlertService, private profileService : ScanProfileService) { }

  ngOnInit() {
    this.profileService.getProfileTemplates().subscribe((data)=>{
      if(data.length > 0){
        console.log(data)
        this.templates = data;
      }
    },err=>{

    });
    if (this.param.type === 'SCAN_PROFILE')
      this.array_elements = parseJSONArray(this.param.value)
  }
  save() {
    this.param.value = this.array_elements.join(',');
    this.pipService.updateNodeForPipeline(this.node).subscribe((data) => {
      this.alert.success("Propertie: " + this.param.name + " saved")
    }, err => {
      this.alert.error("Cannot save propertie: " + this.param.name)
    })
  }
  delete() {
    let found = false;
    for (let i = 0; i < this.node.properties.length && !found; i++) {
      if (this.node.properties[i] === this.param) {
        this.node.properties.splice(i, 1);
        this.param = null;
        found = true;
      }
    }
    for (let i = 0; i < this.node.errorParams.length && !found; i++) {
      if (this.node.errorParams[i] === this.param) {
        this.node.errorParams.splice(i, 1);
        this.param = null;
        found = true;
      }
    }
    for (let i = 0; i < this.node.outputParams.length && !found; i++) {
      if (this.node.outputParams[i] === this.param) {
        this.node.outputParams.splice(i, 1);
        this.param = null;
        found = true;
      }
    }
    if (found) {
      this.pipService.updateNodeForPipeline(this.node).subscribe((data) => {
        this.alert.success("Propertie: " + this.param.name + " saved")
      }, err => {
        this.alert.error("Cannot save propertie: " + this.param.name)
      })
    }
  }
  addRow() {
    this.array_elements.push(`Element ${this.array_elements.length}`)
  }
  removeRow(pos: number = 0) {
    this.array_elements.splice(pos, 1)
  }
  selectTemplate(i: number) {
    console.log("SELECT: " + i)
    this.array_elements = this.templates[i].checks;
  }
  trackByFn(index: any, item: any) {
    return index;
  }

}
function parseJSONArray(val) {
  if (val.length > 0) {
    return val;
  } else if (typeof val === 'string') {
    return val.split(',');
  }
}
