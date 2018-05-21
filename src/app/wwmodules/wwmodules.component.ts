import { Component, OnInit } from '@angular/core';
import { WebWardModule } from './wwmodule'
import {WwmodulesService} from './wwmodules.service'


@Component({
  selector: 'app-wwmodules',
  templateUrl: './wwmodules.component.html',
  styleUrls: ['./wwmodules.component.css']
})
export class WwmodulesComponent implements OnInit {
  private moduleList: WebWardModule[];
  private selectedMod : WebWardModule = null;
  private tempModule : WebWardModule = null;
  constructor(private wwmodService : WwmodulesService) { }

  ngOnInit() {
    this.fetchData();
    this.wwmodService.subscribeToWWModules().subscribe(()=>{
      this.fetchData();
    },err=>{})
  }
  onSelect(mod: WebWardModule){
    this.selectedMod = mod;
  }
  newModule(){
    this.tempModule = new WebWardModule();
  }
  fetchData(){
    this.wwmodService.getWWModules().subscribe((mods)=>{
      this.moduleList = mods;
      console.log(mods)
    },err=>{

    })
  }

}
