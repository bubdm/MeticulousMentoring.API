import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from "ngx-pipes";
import { BsDatepickerModule, ModalModule, TooltipModule, TabsModule } from 'ngx-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { HighchartsChartModule } from "highcharts-angular";

import { AngularMultiSelectModule } from "angular2-multiselect-dropdown/angular2-multiselect-dropdown";
import { VerticalTimelineModule } from 'angular-vertical-timeline';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header.component';
import { LoginComponent } from './login/login.component';
import { AccountService } from './shared/accountservice';
import { UserService } from './shared/user.service';
import { TimelineService } from './shared/timeline.service';
import { ClassificationService } from './classification/classification.service';
import { EducationSystemService } from './educationSystem/educationSystem.service';
import { MenteeService } from './shared/mentee.service';
import { MentorService } from './mentor/mentor.service';
import { GuardianService } from './guardian/guardian.service';
import { SchoolService } from './school/school.service';
import { DirectorService } from './director/director.service';
import { GradingService } from './shared/grading.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UserchartComponent } from './userchart/userchart.component';
import { MeticulousChartComponent } from './chart/chart.component';
import { MenteeFormComponent } from './forms/mentee.form.component';
import { MenteeProfileComponent } from './mentee/mentee.profile.component';
import { MentorFormComponent } from './forms/mentor.form.component';
import { DirectorFormComponent } from './forms/director.form.component';
import { RoundPipe } from './shared/round.pipe';
import { AdminService } from './shared/admin.service';
import { UsersComponent } from './dashboard/users/users.component';
import { UsersService } from './dashboard/users/users.service';
import { HomeComponent } from './dashboard/home/home.component';
import { MenteeProfileService } from './mentee/mentee.profile.service';
import { AdminFormComponent } from './forms/admin-form.component';

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
import { MentorProfileComponent } from './mentor/mentor.profile.component';
import { MenteeDialogComponent } from './mentee-dialog/mentee-dialog.component';

export const routes = [
  { path: "", component: LoginComponent },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: "", component: HomeComponent, canActivate: [AuthGuard] },
      { path: "users", component: UsersComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    UserchartComponent,
    MeticulousChartComponent,
    MenteeFormComponent,
    MenteeProfileComponent,
    MentorFormComponent,
    DirectorFormComponent,
    RoundPipe,
    MentorProfileComponent,
    MenteeDialogComponent,
    UsersComponent,
    HomeComponent,
    AdminFormComponent

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
    NgPipesModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    ArchwizardModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    MultiselectDropdownModule,
    AngularMultiSelectModule,
    TabsModule.forRoot(),
    VerticalTimelineModule,
    HighchartsChartModule

  ],
  exports: [MenteeFormComponent],
  entryComponents: [MenteeFormComponent, MentorFormComponent, DirectorFormComponent, MenteeDialogComponent, AdminFormComponent],
  providers: [
    AccountService,
    AuthGuard,
    UserService,
    ClassificationService,
    EducationSystemService,
    MenteeService,
    GuardianService,
    SchoolService,
    MentorService,
    DirectorService,
    TimelineService,
    GradingService,
    AdminService,
    UsersService,
    MenteeProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
