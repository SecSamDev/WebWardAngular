import { Component, OnInit,Input } from '@angular/core';
import {Pipeline} from '../pipeline'
@Component({
  selector: 'app-pipeline-edit',
  templateUrl: './pipeline-edit.component.html',
  styleUrls: ['./pipeline-edit.component.css']
})
export class PipelineEditComponent implements OnInit {
  @Input() pipeline : Pipeline;
  constructor() { }

  ngOnInit() {
  }

}
