import { Component, OnInit, Input } from '@angular/core';
import { PipelineNodeAtribute, PipelineNode, PipelineService } from '../../pipeline/index'
import { AlertService } from '../../alert/alert.service'
import { TypeComponent } from '../type.component'

@Component({
    selector: 'type-check',
    templateUrl: './check-type.component.html',
    styleUrls: ['./check-type.component.css']
})
export class CheckTypeComponent implements OnInit, TypeComponent {
    @Input() node: PipelineNode;
    @Input() param: PipelineNodeAtribute;
    private array_elements: string[] = [];

    constructor(private pipService: PipelineService, private alert: AlertService) { }

    ngOnInit() {
        console.log(this.param.value)
        if (this.param.type === 'CHECK_SCAN')
            this.array_elements = parseArray(this.param.value)
        this.param.decoratorValue = this.array_elements.join(',')
    }
    save() {
        if (this.array_elements)
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
function parseArray(val) {
    if (typeof val === 'string') {
        return val.split(',').map((val, i, arr) => {
            return new String(val);
        })
    } else if (val.length > 0) {
        return val.map((val, i, arr) => {
            return new String(val);
        })
    } else {
        return [];
    }

}
