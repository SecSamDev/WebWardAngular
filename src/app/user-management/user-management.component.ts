import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  private users: User[];
  private tempUser: User;
  selectedUser: User;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.tempUser = null;
    this.fetchData();
    this.userService.subscribeToUsers().subscribe((data) => {
      this.fetchData();
    }, err => {

    });
  }
  onSelect(user: User): void {
    this.selectedUser = user;
  }
  fetchData() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users)
    });
  }
  newUser(){
    this.tempUser = new User();
  }

}
