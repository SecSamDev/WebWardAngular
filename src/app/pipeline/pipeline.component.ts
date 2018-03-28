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
  height = 1024;
  width = 1024;
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
    aux.outputNodes.push(aux2);
    this._nodes.push(aux);
    this._nodes.push(aux2);
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

  private reCalculate(){
    try {
      const rect = this.pipeCanvas.nativeElement.getBoundingClientRect();
      this.propX = this.height / rect.height;
      this.propY = this.width / rect.width;
      this.dx = rect.x;
      this.dy = rect.y;
    } catch (err) { }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.reCalculate();
  }
}