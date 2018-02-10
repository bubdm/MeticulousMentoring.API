import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { CommonModule } from "@angular/common";
import { NgPipesModule } from "ngx-pipes";

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header.component';
import { LoginComponent } from './login/login.component';
import { AccountService } from './shared/accountservice';
import { UserService } from './shared/user.service';
import { ClassificationService } from './classification/classification.service';
import { EducationSystemService } from './educationSystem/educationSystem.service';
import { MenteeService } from './mentee/mentee.service';
import { MentorService } from './mentor/mentor.service';
import { GuardianService } from './guardian/guardian.service';
import { SchoolService } from './school/school.service';
import { DirectorService } from './director/director.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UsertableComponent } from './usertable/usertable.component';
import { UserchartComponent } from './userchart/userchart.component';
import { MeticulousChartComponent } from './chart/chart.component';
import { MenteeFormComponent } from './forms/mentee.form.component';
import { MenteeProfileComponent } from './mentee/mentee.profile.component';
import { MentorFormComponent } from './forms/mentor.form.component';
import { DirectorFormComponent } from './forms/director.form.component';
import { RoundPipe } from './shared/round.pipe';

import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from './shared/auth-guard.service';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

export const routes = [
    { path: "", component: LoginComponent },
    { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        LoginComponent,
        DashboardComponent,
        AdminComponent,
        UsertableComponent,
        UserchartComponent,
        MeticulousChartComponent,
        MenteeFormComponent,
        MenteeProfileComponent,
        MentorFormComponent,
        DirectorFormComponent,
        RoundPipe

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        ChartsModule,
        RouterModule.forRoot(routes,
            {
                useHash: true,
                enableTracing: false
            }),
        FormsModule,
        CdkTableModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatStepperModule,
        CdkTableModule,
        CommonModule,
        NgPipesModule

    ],
    exports: [MenteeFormComponent],
    entryComponents: [MenteeFormComponent, MentorFormComponent, DirectorFormComponent],
    providers: [AccountService,
        AuthGuard,
        UserService,
        ClassificationService,
        EducationSystemService,
        MenteeService,
        GuardianService,
        SchoolService,
        MentorService,
        DirectorService],
    bootstrap: [AppComponent]
})
export class AppModule { }