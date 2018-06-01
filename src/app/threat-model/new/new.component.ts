import { Component, OnInit,Input } from '@angular/core';
import { ThreatModel } from '../threat-model';
import { AlertService } from '../../alert/alert.service';
import { ThreatModelService } from '../threat-model.service';

@Component({
  selector: 'threat-model-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class ThreatModelNewComponent implements OnInit {
  @Input() model : ThreatModel;
  constructor(
    private alert: AlertService,
    private thModService: ThreatModelService,
  ) { }

  ngOnInit() {
  }
  save() {
    this.thModService.createThreatModel(this.model).subscribe(data => {
      this.alert.clear();
      this.alert.success("Created")
    }, err => {
      this.alert.clear();
      this.alert.error('message' in err.error ? err.error.message : "Cannot save Threat Model")
    });
  }
  cancel() {
    this.model = null;
  }

}
