import { Component, OnInit,Input } from '@angular/core';
import {WebWardModule} from '../wwmodule'
import {WwmodulesService} from '../wwmodules.service'
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'new-module',
  templateUrl: './new-module.component.html',
  styleUrls: ['./new-module.component.css']
})
export class NewModuleComponent implements OnInit {
  @Input() mod : WebWardModule;
  isValid = false;
  constructor(
    private alert: AlertService,
    private wwmodService : WwmodulesService) { }

  ngOnInit() {
  }
  validate(){
    this.wwmodService.checkWWModule(this.mod).subscribe(data => {
      this.alert.success("Valid Module")
      this.mod = data;
      this.isValid = true;
    }, err => {
      this.isValid = false;
      this.alert.error('message' in err.error ? err.error.message : "No valid module")
    });
  }
  save() {
    this.validate();
    if(this.isValid){
      this.wwmodService.createWWModules(this.mod).subscribe(data => {
        this.alert.success("Module " + this.mod.name + " imported")
        this.mod = null;
        this.isValid = false;
      }, err => {
        this.isValid = false;
        this.alert.error('message' in err.error ? err.error.message : "Cannot import module")
      });
    }else{
      this.alert.info("Module needs to be validated first")
    }
    
  }
  cancel() {
    this.mod = null;
  }

}
