import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectorService } from '../director/director.service';

@Component({
    selector: 'director-form',
    templateUrl: 'director.form.component.html',
    styleUrls: ['director.form.component.css']
})
export class DirectorFormComponent implements OnInit {
    firstFormGroup: FormGroup;

    constructor(public diaglogRef: MatDialogRef<DirectorFormComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private directorService: DirectorService) { }

    ngOnInit(): void {
        this.firstFormGroup = this.formBuilder.group({
            first_name: ["", Validators.required],
            last_name: ["", Validators.required],
            email: ["", Validators.required]
        });
    }

    onNoClick(): void {
        this.diaglogRef.close();
    }

    submitDirector(): void {
        var directorDto = this.firstFormGroup.value;

        var newDirector = {
            DirectorFirstName: directorDto.first_name,
            DirectorLastName: directorDto.last_name,
            DirectorEmail: directorDto.email
        }

        let response = this.directorService.add_director(newDirector)
            .subscribe(data => { });
    }
}