import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassificationService } from '../classification/classification.service';
import { EducationSystemService } from '../educationSystem/educationSystem.service';
import { MenteeService } from '../mentee/mentee.service';
import { MentorService } from '../mentor/mentor.service';
import { Mentee } from '../interfaces/mentee';

@Component({
    selector: 'mentor-form',
    templateUrl: 'mentor.form.component.html',
    styleUrls: ['mentor.form.component.css']
})
export class MentorFormComponent implements OnInit {
    firstFormGroup: FormGroup;
    public mentee: Mentee;
    public mentees;

    constructor(public dialogRef: MatDialogRef<MentorFormComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private menteeService: MenteeService,
        private mentorService: MentorService) { }

    ngOnInit(): void {
        this.getAllMentees();
        this.firstFormGroup = this.formBuilder.group({
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
        this.dialogRef.close();
    }

    getAllMentees() {
        let response = this.menteeService.get_mentees()
            .subscribe(data => {
                this.mentees = data;
            },
            error => console.log(error));
    }

    submitMentor(): void {
        var mentorDto = this.firstFormGroup.value;

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
            data => { });
    }
}