import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PipelineNode, pipelineNodeFromJSON } from '../node';
import { AlertService } from '../../alert/alert.service';
import { PipelineService } from '../pipeline.service';

@Component({
  selector: 'contextual-menu',
  templateUrl: './contextual-menu.component.html',
  styleUrls: ['./contextual-menu.component.css']
})
export class ContextualMenuComponent implements OnInit {
  @Input() posX: number = 0;
  @Input() posY: number = 0;
  @Input() node: PipelineNode;
  @Output() completed = new EventEmitter<any>();
  private storedNodes : PipelineNode[] = []
  constructor(private alertService: AlertService, private pipService :PipelineService) { }

  ngOnInit() {
    if (!this.node) {
      //Contextual menu witouth node
    } else {
      //Contextual menu over node
    }
  }
  storeNode(){
    if (this.node) {
      var clonedNode = obtainCleanNode(this.node)
      this.pipService.newStoredNode(clonedNode).subscribe(data=>{

      },err=>{})
      this.completed.emit({
        "event": "store"
      });
    }
  }
  copyNode() {
    if (this.node) {
      try {
        var clonedNode = obtainCleanNode(this.node)
        localStorage.setItem('clip-node', JSON.stringify(clonedNode));
        this.completed.emit({
          "event": "copy"
        });
      } catch (err) {}

    }
  }
  cloneNode() {
    if (this.node) {
      try {
        var clonedNode = obtainCleanNode(this.node)
        this.completed.emit({
          "event": "clone",
          "node": pipelineNodeFromJSON(clonedNode)
        });
      } catch (err) {
      }

    }
  }
  pasteNode() {
    if (!this.node) {
      try {
        var copiedNode = JSON.parse(localStorage.getItem('clip-node'));
        localStorage.removeItem('clip-node');
        copiedNode.x = this.posX;
        copiedNode.y = this.posY;
        this.completed.emit({
          "event": "paste",
          "node": pipelineNodeFromJSON(copiedNode)
        });
      } catch (err) { }

    }
  }
  newNode(node){

  }
  getStoredNodes(){
    this.pipService.getStoredNodes().subscribe((nodes)=>{
      this.storedNodes = nodes;
    },err=>{})
  }
  deleteNode() {
    if (this.node) {
      try {
        this.completed.emit({
          "event": "delete",
          "node": this.node
        });

      } catch (err) { }

    }
  }
  newNodeFromTemplate(node : PipelineNode) {
    if (!this.node) {
      try {
        node.x = this.posX;
        node.y = this.posY;
        this.completed.emit({
          "event": "template",
          "node": node
        });
      } catch (err) { }

    }
  }

}
function obtainCleanNode(node: PipelineNode) {
  var clonedNode = node.toJSON()
  clonedNode.inputConnectors.map((val, i, arr) => {
    val.conectedNodes = [];
    val.originNode = null;
    return val;
  })
  clonedNode.outputConnectors.map((val, i, arr) => {
    val.conectedNodes = [];
    val.originNode = null;
    return val;
  })
  clonedNode.errorConnectors.map((val, i, arr) => {
    val.conectedNodes = [];
    val.originNode = null;
    return val;
  })
  clonedNode.id = "";
  clonedNode.pipe = "";
  return clonedNode;
}
