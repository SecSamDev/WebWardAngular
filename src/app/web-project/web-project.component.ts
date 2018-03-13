import { Component,Input, OnInit } from '@angular/core';
import {WebProject} from './web-project';
@Component({
  selector: 'web-project',
  templateUrl: './web-project.component.html',
  styleUrls: ['./web-project.component.css']
})
export class WebProjectComponent implements OnInit {
  @Input() project: WebProject;
  constructor() { }

  ngOnInit() {
  }

}
