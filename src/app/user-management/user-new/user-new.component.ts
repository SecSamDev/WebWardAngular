import { Component, OnInit, Input } from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../user';
import {AlertService} from '../../alert/alert.service';

@Component({
  selector: 'user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
  @Input() private user : User;
  constructor(private userService: UserService,private alert : AlertService) { }

  ngOnInit() {
  }
  create() {
    this.user.role = parseInt(this.user.role.toString(), 10); 
    this.userService.postUser(this.user).subscribe(data => {
      this.alert.success("Updated")
    }, err => {
      this.alert.error("Cannot save User")
    });
  }
  cancel() {
    this.user = null;
  }

}
