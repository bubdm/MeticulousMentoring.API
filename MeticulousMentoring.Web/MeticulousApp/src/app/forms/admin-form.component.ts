import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from "ngx-bootstrap/modal";
import { UsersService } from '../dashboard/users/users.service';
import { AccountService } from '../shared/accountservice';
import { AdminView } from '../models/adminview';

@Component({
  selector: 'admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
/** admin.form component*/
export class AdminFormComponent implements OnInit {
  adminForm: FormGroup;
  admin: AdminView;

  /** admin.form ctor */
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private bsModalRef: BsModalRef,
    private usersService: UsersService) {
    this.admin = new AdminView();
  }

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.required]
    });
  }

  submitAdmin(): void {
    var adminDto = this.adminForm.value;

    this.admin.adminFirstName = adminDto.first_name;
    this.admin.adminLastName = adminDto.last_name;
    this.admin.adminEmail = adminDto.email;

    let response = this.accountService.add_admin(this.admin).subscribe(data => {
      this.hide_modal();
      this.usersService.notify_users_with_roles_changed();
    });
  }

  public hide_modal() {
    this.bsModalRef.hide();
  }
}
