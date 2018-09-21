import { Component, OnInit, NgModule, AfterViewInit, TemplateRef } from "@angular/core";
import { AccountService } from "../../shared/accountservice";
import { UserService } from "../../shared/user.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { UserView } from "../../models/userview";
import { UsersService } from './users.service';
import { Mentee } from '../../interfaces/mentee';
import { Mentor } from '../../interfaces/mentor';
import { Address } from '../../interfaces/address'
import { Classification } from '../../interfaces/classification'
import { School } from '../../interfaces/school'
import { EducationalSystem } from "../../interfaces/educational_system"
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MenteeFormComponent } from '../../forms/mentee.form.component';
import { MentorFormComponent } from '../../forms/mentor.form.component';
import { DirectorFormComponent } from '../../forms/director.form.component';
import { AdminFormComponent } from '../../forms/admin-form.component';
import { ScreenStatus } from '../../enums/screenstatus';

@NgModule({
  imports: [MenteeFormComponent,
    MentorFormComponent,
    DirectorFormComponent,
    AdminFormComponent]
})

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
/** users component*/
export class UsersComponent implements OnInit {
  public user: User;
  public users: Array<UserView>;
  public bsModalRef: BsModalRef;
  public user_to_delete_id: number = -1;
  public role: string;
  public user_to_delete: any;

  ScreenType: any = ScreenStatus;

  mentee: Mentee;
  mentor: Mentor;
  school: School;
  educational_system: EducationalSystem;

  /** users ctor */
  constructor(private usersService: UsersService,
    private userService: UserService,
    private accountService: AccountService,
    private router: Router,
    public dialog: MatDialog,
    private modalService: BsModalService) {
    this.users = new Array<UserView>();
    this.usersService.notify_users_with_roles_changed();
  }

  ngOnInit(): void {
    let newUser = this.userService.get();
    if (newUser) {
      this.user = newUser;
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    this.role = this.user.role;

    this.usersService.users$.subscribe(data => {
      this.users = data;
      switch (this.role) {
        case "Director":
          this.users = data.filter(x => x.role === "Mentor" || x.role === "Mentee");
          break;
        default:
      }
    });
  }

  public openMenteeFormDialog() {
    const initialState = {
      mentee: this.mentee
    }

    this.bsModalRef = this.modalService.show(MenteeFormComponent, { initialState, "class": 'modal-lg', animated: false });
  }

  public openMentorFormDialog() {
    const initialState = {
      mentor: this.mentor
    }

    this.bsModalRef =
      this.modalService.show(MentorFormComponent, { initialState, "class": 'modal-lg', animated: false });
  }

  public openDirectorFormDialog() {
    const initialState = {
      title: "Director"
    }

    this.bsModalRef =
      this.modalService.show(DirectorFormComponent, { initialState, animated: false });
  }

  public openAdminFormDialog() {
    const initialState = {
      title: "Admin"
    }

    this.bsModalRef = this.modalService.show(AdminFormComponent, { initialState, animated: false });
  }

  open_delete_modal(template: TemplateRef<any>, user: any) {
    this.user_to_delete_id = user.id;
    this.user_to_delete = user;

    this.bsModalRef = this.modalService.show(template, { class: 'modal-sm', ignoreBackdropClick: true });
  }

  confirm_user_delete() {
    this.accountService.deleteUser(this.user_to_delete_id).subscribe(data => {
      this.bsModalRef.hide();
      this.usersService.notify_users_with_roles_changed();
    });
  }
}
