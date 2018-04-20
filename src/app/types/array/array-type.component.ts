import { Component, OnInit, Input } from '@angular/core';
import { PipelineNodeAtribute, PipelineNode, PipelineService } from '../../pipeline/index'
import { AlertService } from '../../alert/alert.service'
import { TypeComponent } from '../type.component'

@Component({
    selector: 'type-array',
    templateUrl: './array-type.component.html',
    styleUrls: ['./array-type.component.css']
})
export class ArrayTypeComponent implements OnInit, TypeComponent {
    @Input() node: PipelineNode;
    @Input() param: PipelineNodeAtribute;
    private array_elements: string[] = [];

    constructor(private pipService: PipelineService, private alert: AlertService) { }

    ngOnInit() {
        if (this.param.type === 'ARRAY')
            this.array_elements = parseArray(this.param.value)
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
        for(let i = 0; i < this.node.properties.length && !found;  i++){
            if(this.node.properties[i] === this.param){
                this.node.properties.splice(i,1);
                this.param = null;
                found = true;
            }
        }
        for(let i = 0; i < this.node.errorParams.length && !found;  i++){
            if(this.node.errorParams[i] === this.param){
                this.node.errorParams.splice(i,1);
                this.param = null;
                found = true;
            }
        }
        for(let i = 0; i < this.node.outputParams.length && !found;  i++){
            if(this.node.outputParams[i] === this.param){
                this.node.outputParams.splice(i,1);
                this.param = null;
                found = true;
            }
        }
        if(found){
            this.pipService.updateNodeForPipeline(this.node).subscribe((data) => {
                this.alert.success("Propertie: " + this.param.name + " saved")
            }, err => {
                this.alert.error("Cannot save propertie: " + this.param.name)
            })
        }
    }
    addRow(){
        this.array_elements.push(`Element ${this.array_elements.length}`)
    }
    removeRow(pos:number = 0){
        this.array_elements.splice(pos,1)
    }

}
function parseArray(val: string) {
    return val.split(',');
}
