import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenteeService } from '../mentee/mentee.service';
import { MentorService } from '../mentor/mentor.service';
import { Mentee } from '../interfaces/mentee';
import { BsModalRef } from "ngx-bootstrap/modal";
import { UsersService } from '../dashboard/users/users.service';
import * as $ from "jquery/dist/jquery.min.js";
import "../../assets/script.js";

@Component({
  selector: 'mentor-form',
  templateUrl: 'mentor.form.component.html',
  styleUrls: ['mentor.form.component.css']
})
export class MentorFormComponent implements OnInit {
  mentorForm: FormGroup;
  public mentee: Mentee;
  public mentees = [];

  genders = [{ gender: "M", description: "Male" },
  { gender: "F", description: "Female" }];

  // Settings configuration
  dropdownSettings = {};
  selectedItems = [];

  constructor(
    private formBuilder: FormBuilder,
    private menteeService: MenteeService,
    private mentorService: MentorService,
    private bsModalRef: BsModalRef,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      text: "Select Mentee(s)",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      primaryKey: "menteeId",
      labelKey: 'menteeFirstName'
    };
    this.getAllMentees();
    this.mentorForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      address1: ["", Validators.required],
      address2: [""],
      city: ["", Validators.required],
      zip: ["", Validators.required],
      mentorGender: ["", Validators.required],
      mentees: [""]
    });
  }

  onNoClick(): void {
  }

  getAllMentees() {
    let response = this.menteeService.get_mentees()
      .subscribe(data => {
        this.mentees = data;
      },
        error => console.log(error));
  }

  submitMentor(): void {
    var mentorDto = this.mentorForm.value;

    var newMentor = {
      MentorFirstName: mentorDto.first_name,
      MentorLastName: mentorDto.last_name,
      MentorAddress: {
        address1: mentorDto.address1,
        address2: mentorDto.address2,
        city: mentorDto.city,
        zip: mentorDto.zip
      },
      MentorGender: mentorDto.mentorGender,
      MentorMentees: mentorDto.mentees
    }

    let response = this.mentorService.add_mentor(newMentor)
      .subscribe(
        data => {
          this.hide_modal();
          this.usersService.notify_users_with_roles_changed();
        });
  }

  public hide_modal() {
    this.bsModalRef.hide();
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
