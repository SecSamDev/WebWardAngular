import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { PipelineNode } from './node';
import {HosePipe,HosePipeService} from './hose-pipe.service';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import {PipelineMouseService} from './pipeline-mouse.service'
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
  private letItBe: boolean = true;
  private hosePipe : HosePipe;
  /**
   * The node active, changes goes to this node
   */
  private activeNode: PipelineNode = null;
  height = 1280;
  width = 2048;
  radius = 40;
  propX = 1;
  propY = 1;
  dx = 0;
  dy = 0;
  lastX : number = 0;
  lastY : number = 0;
  @ViewChild('pipeCanvas') public pipeCanvas: ElementRef;
  constructor(private hosePipeService : HosePipeService,private pipMouseService : PipelineMouseService) {
    let aux = new PipelineNode();
    aux.name = "pipe1";
    aux.type = "START";
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
    this.hosePipe = this.hosePipeService.getHosePipe();
  }
  ngAfterViewInit() {
    try {
      this.reCalculate()
    } catch (err) { }

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
    //If double click in less than 1 sec then set as active node
    setTimeout(() => {
      this.letItBe = false;
    }, 1000);
    if (this.selectedNode === event && this.letItBe) {
      this.activeNode = event;
      this.selectedNode = null;
    } else {
      if (this.activeNode === event) {
        this.activeNode = null
      }
      this.selectedNode = event;
      this.letItBe = true;

    }

  }
  /**
   * Zoom in and out from the canvas
   * @param delta 
   */
  handleZoom(delta: number) {
    this.height *= (1 + delta);
    this.width *= (1 + delta);
    this.reCalculate();
  }
  /**
   * Moves the canvas
   * @param xY 
   */
  handleMove(xY: number[]) {
    this.dx += xY[0];
    this.dy += xY[1];
  }
  /**
   * Give us the position of the mouse
   */
  handleMousePos(event) {
    if(event.evnt === 'mousemove'){
      console.log("Mouse move")
      if(this.lastX === 0 && this.lastY === 0){

      }else{
        this.hosePipeService.setPos((event.x -this.lastX)*this.propX, (event.y -this.lastY)*this.propY)
      }
      this.registerMousePos(event.clientX ,event.clientY)
    }
    
  }
  /**
   * Give us the position of the mouse
   */
  onMouseMove(event) {
    this.pipMouseService.sendMouseEvent({
      'name' : 'mousemove',
      'x' : event.clientX*this.propX,
      'y' : event.clientY*this.propY
    });
    if(this.lastX === 0 && this.lastY === 0){

      }else{
        this.hosePipeService.setPos((event.clientX -this.lastX)*this.propX, (event.clientY -this.lastY)*this.propY)
      }
      this.registerMousePos(event.clientX ,event.clientY)

  }
  private registerMousePos(x : number, y : number){
    this.lastX = x;
    this.lastY = y;
  }
  onMouseDown(event) {
    this.pipMouseService.sendMouseEvent({
      'name' : 'mousedown',
      'x' : event.clientX*this.propX,
      'y' : event.clientY*this.propY
    });
  }
  onMouseUp(event) {
    this.pipMouseService.sendMouseEvent({
      'name' : 'mouseup',
      'x' : event.clientX*this.propX,
      'y' : event.clientY*this.propY
    });
  }
  onMouseLeave(event) {
    this.pipMouseService.sendMouseEvent({
      'name' : 'mouseleave',
      'x' : event.clientX*this.propX,
      'y' : event.clientY*this.propY
    });
  }
  /**
   * Moves the canvas to allow the node to be in the center
   * @param node 
   */
  focusNode(node : PipelineNode){
    try {
      const rect = this.pipeCanvas.nativeElement.getBoundingClientRect();
      this.dx += rect.width*this.propX/2 - this.dx - node.x -node.width/2;
      this.dy += rect.height*this.propY/2 - this.dy - node.y -node.height/2;
      this.selectedNode = node;
    } catch (err) { }
  }
  print(event){
    console.log("print")
  }
  private reCalculate() {
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