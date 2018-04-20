import { Component, OnInit, Input } from '@angular/core';
import { PipelineNodeAtribute, PipelineNode, PipelineService } from '../../pipeline/index'
import { AlertService } from '../../alert/alert.service'
import { TypeComponent } from '../type.component'

@Component({
    selector: 'type-time',
    templateUrl: './time-type.component.html',
    styleUrls: ['./time-type.component.css']
})
export class TimeTypeComponent implements OnInit, TypeComponent {
    @Input() node: PipelineNode;
    @Input() param: PipelineNodeAtribute;
    private hour : string = '00';
    private minute : string = '00';

    constructor(private pipService: PipelineService, private alert: AlertService) { }

    ngOnInit() {
        if (this.param.type === 'TIME'){
            let splited = this.param.value.split(':');
            console.log(splited)
            if(splited.length === 2){
                this.hour = parseHour(splited[0]);
                this.minute = parseHour(splited[1]);
            }else{
                this.hour = '00';
                this.minute = '00';
            }
        }
    }
    save() {
        this.param.value = this.hour + ":"+this.minute;
        this.pipService.updateNodeForPipeline(this.node).subscribe((data) => {
            this.alert.success("Propertie: " + this.param.name + " saved")
        }, err => {
            this.alert.error("Cannot save propertie: " + this.param.name)
        })
    }
    delete() {

    }

}


function parseHour(val: string) {
    try{
        let num = Number(val);
        if(num > 23){
            return '00';
        }else if(num <= 0){
            return '00';
        }else{
            return num.toString();
        }
    }catch(err){
        return '00';
    }
}
function parseMinute(val: string) {
    try{
        let num = Number(val);
        if(num > 59){
            return '00';
        }else if(num <= 0){
            return '00';
        }else{
            return num.toString();
        }
    }catch(err){
        return '00';
    }
}
