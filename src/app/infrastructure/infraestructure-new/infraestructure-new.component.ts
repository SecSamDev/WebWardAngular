import { Component, OnInit, Input } from '@angular/core';
import { InfraestructureService } from '../infraestructure.service';
import { WWInfraestructure } from '../infraestructure';

@Component({
  selector: 'infraestructure-new',
  templateUrl: './infraestructure-new.component.html',
  styleUrls: ['./infraestructure-new.component.css']
})
export class InfraestructureNewComponent implements OnInit {
  private _infraestructure: WWInfraestructure;
  private _content: string = "";
  @Input() set infraestructure(inf: WWInfraestructure) {
    this._infraestructure = inf;
  }
  get infraestructure() {
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
