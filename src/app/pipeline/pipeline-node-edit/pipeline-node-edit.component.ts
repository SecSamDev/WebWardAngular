import { Component, OnInit,Input } from '@angular/core';
import { AlertService } from '../../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {PipelineNode} from '../node'
import {PipelineService} from '../pipeline.service'
@Component({
  selector: 'pipeline-node-edit',
  templateUrl: './pipeline-node-edit.component.html',
  styleUrls: ['./pipeline-node-edit.component.css']
})
/**
 * For editing a PipelineNode
 */
export class PipelineNodeEditComponent implements OnInit {
  @Input() node : PipelineNode;
  /**
   * Clone Node
   */
  private _node : PipelineNode;
  constructor(private alert: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private pipService : PipelineService) { }

  ngOnInit() {
  }
  save() {
    this._node = Object.assign({}, this.node);
  }
  cancel() {
    this.node = Object.assign(this.node, this._node);
  }
  sureDelete() {
    this.node.removeMe();
    this.pipService.removeNodeForPipeline(this.node).subscribe((data)=>{
      this.alert.clear();
      this.alert.success("Deleted")
    },err=>{
      this.alert.error("Cant delete")
    });
    this.activeModal.close('Close click');
  }
  deleteModal(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.error(reason)
    }).catch(err => {
      console.error(err)
    });
  }
  ngOnChanges() {
    this._node = Object.assign({}, this.node);
  }
  addOutConnector(){
    this.node.createOutputConnector();
  }
  addInConnector(){
    this.node.createInputConnector();
  }
  addErrConnector(){
    this.node.createErrorConnector();
  }
}
