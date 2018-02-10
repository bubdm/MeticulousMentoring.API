import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassificationService } from '../classification/classification.service';
import { EducationSystemService } from '../educationSystem/educationSystem.service';
import { MenteeService } from '../mentee/mentee.service';
import { GuardianService } from '../guardian/guardian.service';
import { SchoolService } from '../school/school.service';
import { Mentee } from '../interfaces/mentee';

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
    public mentee: Mentee;
    public classifications;
    public educationSystems;
    public schools;
    public menteeId: string;
    isChildAddressShared = false;

    constructor(public dialogRef: MatDialogRef<MenteeFormComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private classificationService: ClassificationService,
        private educationSystemService: EducationSystemService,
        private menteeService: MenteeService,
        private guardianService: GuardianService,
        private schoolService: SchoolService) {
    }

    ngOnInit(): void {
        this.getClassifications();
        this.getEducationSystems();
        this.getSchools();
        this.firstFormGroup = this.formBuilder.group({
            first_name: ["", Validators.required],
            last_name: ["", Validators.required],
            address1: ["", Validators.required],
            address2: [""],
            city: ["", Validators.required],
            zip: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            menteeGender: ["", Validators.required],
            dob: ["", Validators.required]
        });
        this.secondFormGroup = this.formBuilder.group({
            school: ["", Validators.required],
            classification: ["", Validators.required]
        });
        this.thirdFormGroup = this.formBuilder.group({
            guardianFirstName: ["", Validators.required],
            guardianLastName: ["", Validators.required],
            guardianGender: ["", Validators.required],
            guardianAddress1: ["", Validators.required],
            guardianAddress2: [""],
            guardianCity: ["", Validators.required],
            guardianZip: ["", Validators.required],
            guardianEmail: ["", Validators.required]
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
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
            this.thirdFormGroup.controls['guardianAddress1'].setValue(this.firstFormGroup.get('address1').value);
            this.thirdFormGroup.controls['guardianAddress2'].setValue(this.firstFormGroup.get('address2').value);
            this.thirdFormGroup.controls['guardianCity'].setValue(this.firstFormGroup.get('city').value);
            this.thirdFormGroup.controls['guardianZip'].setValue(this.firstFormGroup.get('zip').value);
        } else {
            this.thirdFormGroup.controls['guardianAddress1'].setValue('');
            this.thirdFormGroup.controls['guardianAddress2'].setValue('');
            this.thirdFormGroup.controls['guardianCity'].setValue('');
            this.thirdFormGroup.controls['guardianZip'].setValue('');
        }
    }

    submitMentee(): void {
        var test = this.firstFormGroup.value;
        var test2 = this.secondFormGroup.value;
        var test3 = this.thirdFormGroup.value;

        var newMentee = {
            MenteeFirstName: test.first_name,
            MenteeLastName: test.last_name,
            MenteeAddress: {
                address1: test.address1,
                address2: test.address2,
                city: test.city,
                zip: test.zip,
            },
            MenteeDOB: test.dob,
            MenteeEmail: test.email,
            MenteeGender: test.menteeGender,
            MenteeClassification: {
                id: test2.classification.classificationId,
                classification_id: test2.classification.classificationClassId,
                description: test2.classification.classificationDescription
            },
            MenteeSchool: {
                id: test2.school.schoolId
            },
        }

        let response = this.menteeService.add_mentee(newMentee)
            .subscribe(
            data => {
                this.menteeId = data.menteeId;

                var newGuardian = {
                    GuardianFirstName: test3.guardianFirstName,
                    GuardianLastName: test3.guardianLastName,
                    GuardianGender: test3.guardianGender,
                    GuardianAddress: {
                        address1: test3.guardianAddress1,
                        address2: test3.guardianAddress2,
                        city: test3.guardianCity,
                        zip: test3.guardianZip
                    },
                    GuardianEmail: test3.guardianEmail,
                    GuardianChildren: [{
                        id: this.menteeId
                    }]
                }

                this.guardianService.add_guardian(newGuardian)
                    .subscribe(r => { });
            },
            error => console.log(error));
    }
}