import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import {AuthService} from '../../auth/auth.service'

@Component({
  selector: 'user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  @Input()
  user: User;
  ngOnInit() {
  }
  constructor(public auth : AuthService) { }


}
