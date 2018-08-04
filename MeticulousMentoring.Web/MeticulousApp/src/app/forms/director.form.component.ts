import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectorService } from '../director/director.service';
import { BsModalRef } from "ngx-bootstrap/modal";
import { UsersService } from '../dashboard/users/users.service';

@Component({
  selector: 'director-form',
  templateUrl: 'director.form.component.html',
  styleUrls: ['director.form.component.css']
})
export class DirectorFormComponent implements OnInit {
  directorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private directorService: DirectorService,
    private bsModalRef: BsModalRef,
    private userService: UsersService) { }

  ngOnInit(): void {
    this.directorForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.required]
    });
  }

  onNoClick(): void {
  }

  submitDirector(): void {
    var directorDto = this.directorForm.value;

    var newDirector = {
      DirectorFirstName: directorDto.first_name,
      DirectorLastName: directorDto.last_name,
      DirectorEmail: directorDto.email
    }

    let response = this.directorService.add_director(newDirector)
      .subscribe(data => {
        this.hide_modal();
        this.userService.notify_users_with_roles_changed();
      });
  }

  public hide_modal() {
    this.bsModalRef.hide();
  }
}
