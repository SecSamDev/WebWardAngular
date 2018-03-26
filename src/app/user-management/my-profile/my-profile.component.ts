import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { AlertService } from '../../alert/alert.service';
import { AuthService } from '../../auth/auth.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private alert: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal) { }

  private user: User = new User();
  private password1: string;
  private password2: string;
  ngOnInit() {
    let usr = this.auth.getUser();
    if (usr !== null) {
      this.userService.getUser(usr.id).subscribe(user => this.user = user, err => {
        this.auth.signOut();
      });
    } else {
      this.auth.signOut();
    }
  }
  edit() {
    this.userService.updateUser(this.user).subscribe(data => {
      this.alert.success("Updated")
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot save User")
    });
  }
  changePassword() {
    if (this.password1.length >= 5
      && this.password1 === this.password2) {
      if (!this.isValidPassword(this.user.name, this.password1)) {
        this.alert.error("Password must be at leats 8 characters, contain 1 upper case and 1 lower case letter and cannot contain more than 3 consecutive letters from the user name")
      } else {
        let auxUsr = new User();
        auxUsr.id = this.user.id;
        auxUsr.password = this.password1;
        this.userService.updateUser(auxUsr).subscribe(data => {
          this.alert.success("Updated")
        }, err => {
          this.alert.error('message' in err.error ? err.error.message : "Cannot update Password")
        });
      }
    } else {
      this.alert.warn("Passwords must match")
    }

  }
  private isValidPassword(userName: string, password: string) {
    if (!password.match(passwordPattern))
      return false;
    for (let i = 0; (i + 3) < userName.length; i++)
      if (password.indexOf(userName.substring(i, i + 3)) != -1)
        return false;
    return true;
  }
}
