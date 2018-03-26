import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user-management/user.service';

@Component({
  selector: 'app-web-project-user',
  templateUrl: './web-project-user.component.html',
  styleUrls: ['./web-project-user.component.css']
})
export class WebProjectUserComponent implements OnInit {

  constructor(private auth : AuthService, private userService : UserService) { }

  ngOnInit() {
  }

}
