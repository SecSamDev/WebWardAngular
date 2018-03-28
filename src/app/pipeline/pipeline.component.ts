import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { PipelineNode } from './node';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit, AfterViewInit {
  private _nodes: PipelineNode[] = [];
  /**
   * The node that is selected. Only for do changes in active node
   */
  private selectedNode: PipelineNode = null;

  /**
   * The node active, changes goes to this node
   */
  private activeNode: PipelineNode = null;
  height = 2048;
  width = 2048;
  radius = 40;
  propX = 1;
  propY = 1;
  dx = 0;
  dy = 0;
  @ViewChild('pipeCanvas') public pipeCanvas: ElementRef;
  constructor() {
    let aux = new PipelineNode();
    aux.name = "pipe1";
    aux.x = 0;
    aux.y = 0;
    let aux2 = new PipelineNode();
    aux2.name = "pipe2";
    aux2.x = 512;
    aux2.y = 50;
    let aux3 = new PipelineNode();
    aux3.name = "pipe3";
    aux3.x = 200;
    aux3.y = 200;
    aux.outputNodes.push(aux2);
    aux.errorNodes.push(aux3);
    this._nodes.push(aux);
    this._nodes.push(aux2);
    this._nodes.push(aux3);
  }
  ngAfterViewInit() {
    try{
      this.reCalculate()
    }catch(err){}
    
  }
  ngOnInit() {
    this.reCalculate()

  }
  get nodes(): PipelineNode[] {
    return this._nodes;
  }
  @Input()
  set nodes(nodes: PipelineNode[]) {
    this._nodes = nodes;
  }
  handleNodeClick(event: PipelineNode) {
    console.log("Handle node click: " + event.name + " " + event.x + " " + event.y)
  }
  handleZoom(delta : number) {
    this.height *= (1+delta);
    this.width *= (1+delta);
    this.reCalculate(); 
  }
  handleMove(xY : number[]){
    this.dx += xY[0];
    this.dy += xY[1];
  }
  handleMoveX(delta : number) {
    this.dx += delta;
  }
  handleMoveY(delta : number) {
    this.dy += delta;
  }

  private reCalculate(){
    try {
      const rect = this.pipeCanvas.nativeElement.getBoundingClientRect();
      this.propX = this.height / rect.height;
      this.propY = this.width / rect.width;
    } catch (err) { }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.reCalculate();
  }
}