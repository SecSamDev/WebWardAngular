import { Component, OnInit,Input } from '@angular/core';
import { User} from '../user';
import { UserService} from '../user.service';
import { AlertService} from '../../alert/alert.service';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input()
  user : User;

  private userBackup: User;
  ngOnInit() {
  }

  
  constructor(private userService :UserService,private alert: AlertService, private modalService: NgbModal,public activeModal: NgbActiveModal) { }

  edit() {
    this.userBackup = Object.assign({}, this.user);
    this.userService.updateUser(this.user).subscribe(data => {
      this.alert.success("Updated")
    }, err => {
      this.alert.error("Cannot save User")
    });
  }
  cancel() {
    this.user = Object.assign(this.user, this.userBackup);
    this.user = null;
  }
  sureDelete() {
    this.activeModal.close('Close click');
    this.userService.deleteUser(this.user).subscribe(data => {
      this.alert.success("Deleted");
      this.user = null;
      this.userBackup = null;
    }, err => {
      this.alert.error("Cannot delete User")
    });
  }
  deleteModal(content){
    this.modalService.open(content).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.error(reason)
    }).catch(err=>{
      console.error(err)
    });
  }
  ngOnChanges() {
    this.userBackup = Object.assign({}, this.user);
  }

}
