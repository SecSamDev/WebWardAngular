import { Component, OnInit, Input } from '@angular/core';
import { KubeDeployment } from './kube-deployment';

@Component({
    selector: 'kube-deployment',
    templateUrl: './kube-deployment.component.html',
    styleUrls: ['./kube-deployment.component.css']
})
/**
 * Show the status of deployments
 */
export class KubeDeploymentComponent implements OnInit {
    @Input()
    private deployment: KubeDeployment;
    constructor() { }

    ngOnInit() {
    }

}