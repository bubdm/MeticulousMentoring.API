import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassificationService } from '../classification/classification.service';
import { EducationSystemService } from '../educationSystem/educationSystem.service';
import { MenteeService } from '../shared/mentee.service';
import { GuardianService } from '../guardian/guardian.service';
import { SchoolService } from '../school/school.service';
import { AdminService } from '../shared/admin.service';
import { AccountService } from '../shared/accountservice';
import { Mentee } from '../interfaces/mentee';
import { WizardStep } from '../models/WizardStep';
import { BsModalRef } from "ngx-bootstrap/modal";
import { UsersService } from '../dashboard/users/users.service';

@Component({
  selector: 'mentee-form',
  templateUrl: 'mentee.form.component.html',
  styleUrls: ['mentee.form.component.css']
})
export class MenteeFormComponent implements OnInit {
  startDate = new Date(1999, 0, 1);
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  menteeForm1: FormGroup;
  menteeForm2: FormGroup;

  public mentee: Mentee;
  public classifications;
  public educationSystems;
  public schools;
  public menteeId: string;
  isChildAddressShared = false;
  public selectedFile: string | ArrayBuffer = "https://www.dropbox.com/s/m7lteis9sb5djcb/DefaultImg.png?raw=1";
  public fileConst: File;
  public fileName: string;
  public file: File;

  genders = [{ gender: "M", description: "Male" },
  { gender: "F", description: "Female" }];

  constructor(private formBuilder: FormBuilder,
    private classificationService: ClassificationService,
    private educationSystemService: EducationSystemService,
    private menteeService: MenteeService,
    private guardianService: GuardianService,
    private schoolService: SchoolService,
    private adminService: AdminService,
    private bsModalRef: BsModalRef,
    private usersService: UsersService,
    private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getClassifications();
    this.getEducationSystems();
    this.getSchools();

    this.menteeForm1 = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      address1: ["", Validators.required],
      address2: [null],
      city: ["", Validators.required],
      zip: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      menteeGender: ["", Validators.required],
      dob: ["", Validators.required],
      school: ["", Validators.required],
      classification: ["", Validators.required],
    });

    this.menteeForm2 = this.formBuilder.group({
      guardianFirstName: ["", Validators.required],
      guardianLastName: ["", Validators.required],
      guardianGender: ["", Validators.required],
      guardianAddress1: ["", Validators.required],
      guardianAddress2: [null],
      guardianCity: ["", Validators.required],
      guardianZip: ["", Validators.required],
      guardianEmail: ["", Validators.required]
    });
  }

  onNoClick(): void {
  }

  public getClassifications() {
    let response = this.classificationService.get_classifications()
      .subscribe(
        data => {
          this.classifications = data;
        },
        error => console.log(error));
  }

  public getEducationSystems() {
    let response = this.educationSystemService.get_education_systems()
      .subscribe(
        data => {
          this.educationSystems = data;
        },
        error => console.log(error));
  }

  public getSchools() {
    let response = this.schoolService.get_schools()
      .subscribe(
        data => {
          this.schools = data;
        },
        error => console.log(error));
  }

  copyAddress(): void {
    if (this.isChildAddressShared) {
      this.menteeForm2.controls['guardianAddress1'].setValue(this.menteeForm1.get('address1').value);
      this.menteeForm2.controls['guardianAddress2'].setValue(this.menteeForm1.get('address2').value);
      this.menteeForm2.controls['guardianCity'].setValue(this.menteeForm1.get('city').value);
      this.menteeForm2.controls['guardianZip'].setValue(this.menteeForm1.get('zip').value);
    } else {
      this.menteeForm2.controls['guardianAddress1'].setValue('');
      this.menteeForm2.controls['guardianAddress2'].setValue('');
      this.menteeForm2.controls['guardianCity'].setValue('');
      this.menteeForm2.controls['guardianZip'].setValue('');
    }
  }

  submitMentee(): void {
    var mentee_info = this.menteeForm1.value;
    var guardian_info = this.menteeForm2.value;

    var newMentee = {
      MenteeFirstName: mentee_info.first_name,
      MenteeLastName: mentee_info.last_name,
      MenteeAddress: {
        address1: mentee_info.address1,
        address2: mentee_info.address2,
        city: mentee_info.city,
        zip: mentee_info.zip,
      },
      MenteeDOB: mentee_info.dob,
      MenteeEmail: mentee_info.email,
      MenteeGender: mentee_info.menteeGender,
      MenteeClassification: {
        id: mentee_info.classification.classificationId,
        classification_id: mentee_info.classification.classificationClassId,
        description: mentee_info.classification.classificationDescription
      },
      MenteeSchool: {
        id: mentee_info.school.schoolId
      },
      MenteeImageFile: this.fileConst
    }

    let response = this.menteeService.add_mentee(newMentee)
      .subscribe(
        data => {
          this.menteeId = data.menteeId;
          this.upload(parseInt(this.menteeId));

          var newGuardian = {
            GuardianFirstName: guardian_info.guardianFirstName,
            GuardianLastName: guardian_info.guardianLastName,
            GuardianGender: guardian_info.guardianGender,
            GuardianAddress: {
              address1: guardian_info.guardianAddress1,
              address2: guardian_info.guardianAddress2,
              city: guardian_info.guardianCity,
              zip: guardian_info.guardianZip
            },
            GuardianEmail: guardian_info.guardianEmail,
            GuardianChildren: [{
              id: this.menteeId
            }]
          }

          this.guardianService.add_guardian(newGuardian)
            .subscribe(r => {
              this.hide_modal();
              this.usersService.notify_users_with_roles_changed();
            });
        },
        error => console.log(error));
  }

  public hide_modal() {
    this.bsModalRef.hide();
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.file = event.target.files[0];
      this.fileConst = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.selectedFile = reader.result;

      reader.readAsDataURL(file);
    }
  }

  upload(menteeId: number) {
    const formData = new FormData();

    formData.append(this.fileName, this.file);
    this.accountService.upload_image(menteeId, formData).subscribe(data => {
    });
  }
}
