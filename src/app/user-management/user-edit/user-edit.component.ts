import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { AlertService } from '../../alert/alert.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  private user: User = new User();
  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params['id']))
      .subscribe(user => this.user = user);
  }


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private alert: AlertService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal) { }

  edit() {
    this.userService.updateUser(this.user).subscribe(data => {
      this.alert.success("Updated")
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot save User")
    });
  }
  cancel() {
    this.user = null;
    this.location.back();
  }
  sureDelete() {
    this.activeModal.close('Close click');
    this.userService.deleteUser(this.user).subscribe(data => {
      this.alert.success("Deleted");
      this.user = null;
    }, err => {
      this.alert.error('message' in err.error ? err.error.message : "Cannot delete User")
    });
  }
  deleteModal(content) {
    this.modalService.open(content).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.error(reason)
    }).catch(err => {
      console.error(err)
    });
  }

}
