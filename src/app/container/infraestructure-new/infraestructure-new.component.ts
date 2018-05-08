import { Component, OnInit, Input } from '@angular/core';
import { KubeContainer } from '../container';
import { InfraestructureService } from '../infraestructure.service';

@Component({
  selector: 'infraestructure-new',
  templateUrl: './infraestructure-new.component.html',
  styleUrls: ['./infraestructure-new.component.css']
})
export class InfraestructureNewComponent implements OnInit {
  private _infraestructure: KubeContainer;
  private _content: string = "";
  @Input() set infraestructure(inf: KubeContainer) {
    this._infraestructure = inf;
    if(inf.content)
      this._content = JSON.stringify(inf.content, null, "\t");
  }
  get infraestructure() {
    this._infraestructure.content = JSON.parse(this._content)
    return this._infraestructure;
  }
  constructor(private infrService: InfraestructureService) { }

  ngOnInit() {
  }
  create() {
    this.infrService.createInfraestructure(this.infraestructure).subscribe(data => {
    }, err => {

    })
  }
  cancel() {
    this.infraestructure = null;
  }

}
