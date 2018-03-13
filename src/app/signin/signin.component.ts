import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {AlertService} from '../alert/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private username : string = "";
  private password : string = "";
  constructor(private auth : AuthService,private router: Router,private alerts : AlertService) { }

  ngOnInit() {
  }
  

  signIn(){
    if(this.username.length > 5){
      this.auth.signIn(this.username, this.password).subscribe(data =>{
        this.router.navigate(['']);
      },err =>{
        
      });
    }else{
      this.alerts.error("No user provided",false);
    }
  }

}
