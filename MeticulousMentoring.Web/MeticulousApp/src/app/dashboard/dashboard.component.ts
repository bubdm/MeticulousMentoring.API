import { Component, OnInit, NgModule } from "@angular/core";
import { AccountService } from "../shared/accountservice";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { IUser } from '../interfaces/iuser';
import { Mentee } from '../interfaces/mentee';
import { Mentor } from '../interfaces/mentor';
import { Address } from '../interfaces/address'
import { Classification } from '../interfaces/classification'
import { School } from '../interfaces/school'
import { EducationalSystem } from "../interfaces/educational_system"
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MenteeFormComponent } from '../forms/mentee.form.component';
import { MentorFormComponent } from '../forms/mentor.form.component';
import { DirectorFormComponent } from '../forms/director.form.component';

@NgModule({
    imports: [MenteeFormComponent,
        MentorFormComponent,
        DirectorFormComponent]
})

@Component({
    selector: "dashboard",
    templateUrl: "dashboard.component.html",
    styleUrls: ["dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
    public user: IUser;
    public users;
    public role: string;

    isExpanded = false;
    mentee: Mentee;
    mentor: Mentor;
    school: School;
    educational_system: EducationalSystem;

    constructor(private userService: UserService, private auth: AccountService, private router: Router, public dialog: MatDialog) { }

    ngOnInit(): void {
        //this.user = this.userService.get();
        this.user = JSON.parse(localStorage.getItem('user'));
        if (!this.user) {
            this.router.navigate([""]);
        } else {
            this.role = this.user.role;
            if (this.user.role === "Admin") {
                this.getUsers();
            }
        }
    }

    public getUsers() {
        let response = this.auth.get_users()
            .subscribe(
            data => {
                this.users = new MatTableDataSource(data);
            },
            error => console.log(error));
    }

    public openMenteeFormDialog() {
        let dialogRef = this.dialog.open(MenteeFormComponent,
            {
                width: '800px',
                height: '780px',
                data: { mentee: this.mentee }
            });

        dialogRef.afterClosed().subscribe(result => {
            this.mentee = result;
        });
    }

    public openMentorFormDialog() {
        let dialogRef = this.dialog.open(MentorFormComponent,
            {
                width: '800px',
                height: '780px'
            });

        dialogRef.afterClosed().subscribe(result => {
            this.mentor = result;
        });
    }

    public openDirectorFormDialog() {
        let diaglogRef = this.dialog.open(DirectorFormComponent,
            {
                width: '800px',
                height: '400px'
            });

        diaglogRef.afterClosed().subscribe(result => { });
    }

    public logout() {
        this.auth.logout();
        this.router.navigate([""]);
    }
}