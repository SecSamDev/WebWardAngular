import { Component, OnInit, Input } from '@angular/core';
import { PipelineNodeAtribute, PipelineNode, PipelineService } from '../../pipeline/index'
import { AlertService } from '../../alert/alert.service'
import { TypeComponent } from '../type.component'

@Component({
    selector: 'type-days',
    templateUrl: './days-type.component.html',
    styleUrls: ['./days-type.component.css']
})
export class DaysTypeComponent implements OnInit, TypeComponent {
    @Input() node: PipelineNode;
    @Input() param: PipelineNodeAtribute;
    private week_days: boolean[] = [false, false, false, false, false, false, false];

    constructor(private pipService: PipelineService, private alert: AlertService) { }

    ngOnInit() {
        if (this.param.type === 'DAYS_PICKER') {
            this.week_days = stringToDays(this.param.value);
            this.param.decoratorValue = decoratorValue(this.week_days);
        }
    }
    save() {
        this.param.decoratorValue = decoratorValue(this.week_days);
        this.param.value = this.week_days.join(',');
        this.pipService.updateNodeForPipeline(this.node).subscribe((data) => {
            this.alert.success("Propertie: " + this.param.name + " saved")
        }, err => {
            this.alert.error("Cannot save propertie: " + this.param.name)
        })
    }
    delete() {
        this.node.removeParam(this.param)
        this.pipService.updateNodeForPipeline(this.node).subscribe((data) => {
            this.alert.success("Propertie removed")
        }, err => {
            this.alert.error("Cannot remove propertie")
        })
    }

}
function decoratorValue(arr: boolean[]) {
    let retArr = [];
    if (arr.length >= 7) {
        if (arr[0])
            retArr.push('Monday')
        if (arr[1])
            retArr.push('Tuesday')
        if (arr[2])
            retArr.push('Wednesday')
        if (arr[3])
            retArr.push('Thursday')
        if (arr[4])
            retArr.push('Friday')
        if (arr[5])
            retArr.push('Saturday')
        if (arr[6])
            retArr.push('Sunday')
    }
    return retArr.join(',');
}

function stringToDays(days: string) {
    let week_days = [false, false, false, false, false, false, false];
    let split_days = days.split(',');
    if (split_days.length >= 7) {
        for (let i = 0; i < 7; i++) {
            try {
                week_days[i] = split_days[i] === 'true' ? true : false;
            } catch (err) { }
        }
    }
    return week_days;
}
