import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from "@angular/core";
import { AccountService } from "../shared/accountservice";
import { UserService } from "../shared/user.service";
import { GradingService } from "../shared/grading.service";
import { TimelineService } from '../shared/timeline.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { User } from '../models/user';
import { MenteeService } from '../shared/mentee.service';
import { MenteeProfileService } from '../mentee/mentee.profile.service';
import { MentorService } from '../mentor/mentor.service';
import { Mentee } from '../models/mentee';
import { Mentor } from '../models/mentor';
import { Guardian } from '../models/guardian';
import { GradingPeriod } from '../models/gradingperiod';
import { Grade } from '../models/grade';
import { GradePointAverage } from '../models/gradepointaverage';
import { SiteAverage } from '../models/siteaverage';
import { TabsetComponent } from "ngx-bootstrap";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import * as Highcharts from "highcharts";
import 'rxjs/Rx';
//import * as _ from 'lodash';
import { _ } from "underscore";

@Component({
  selector: "mentee-profile",
  templateUrl: "mentee.profile.component.html",
  styleUrls: ["mentee.profile.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenteeProfileComponent implements OnInit {
  @ViewChild('gpaChart') chart: BaseChartDirective;
  public user: User;
  public mentee: Mentee = new Mentee();
  public menteeId;
  public Highcharts = Highcharts;
  public chartOptions = {
    series: [
      {
        data: [1, 2, 3, 4, 5, 6]
      }]
  };
  public mentor: Mentor = new Mentor();
  public guardian: Guardian = new Guardian();
  public grades: Array<Grade> = new Array<Grade>();
  public gpas: Array<GradePointAverage> = new Array<GradePointAverage>();
  public gradeGroup = {};
  public messages: number = 1;
  public timelineData = [];
  public gradingPeriods: Array<GradingPeriod> = new Array<GradingPeriod>();
  public allPeriods: Array<GradingPeriod> = [];
  public allSiteAverages: Array<SiteAverage> = [];
  public lineChartData: Array<any> = new Array<any>();
  public lineChartLabels: Array<any> = new Array<any>();
  public lineChartOptions: any = { responsive: true };
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public chartColors: Array<any> = [
    { // first color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }];
  //ngx
  public view: any[] = [700, 400];
  public multi: any[] = [];
  public showXAxis: boolean = true;
  public showYAxis: boolean = true;
  public gradient: boolean = false;
  public showLegend: boolean = false;
  public showXAxisLabel: boolean = true;
  public xAxisLabel: string = 'Subject';
  public showYAxisLabel: boolean = true;
  public yAxisLabel: string = 'GPA';
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  public autoScale: boolean = true;

  public blankGrades = [];
  public courses = [];
  public labels = [];
  public system_id = 0;
  public classification_id = 0;
  public isShown: boolean = false;
  public myForm: FormGroup;
  public selectedPeriod: string = '-1';
  @ViewChild('menteeTabs') menteeTabs: TabsetComponent;

  constructor(private menteeService: MenteeService,
    private mentorService: MentorService,
    private userService: UserService,
    private timelineService: TimelineService,
    private router: Router,
    private gradingService: GradingService,
    private _fb: FormBuilder,
    private menteeProfileService: MenteeProfileService) {
    this.menteeProfileService.notify_change_in_grades();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.myForm = this._fb.group({
      grades: this._fb.array([])
    });
    if (!this.user) {
      this.router.navigate([""]);
    } else {
      this.menteeId = this.user.iat;
      this.addGpas();

      this.getMentee(this.menteeId);

      this.menteeService.get_mentor_by_mentee_id(this.menteeId)
        .subscribe(data => {
          this.mentor = data;
        },
          error => console.log(error));

      this.menteeService.get_guardian_by_mentee_id(this.menteeId)
        .subscribe(data => {
          this.guardian = data;
        },
          error => console.log(error));

      this.menteeProfileService.mentee_grades$.subscribe(data => {
        this.grades = data;

        this.getMenteeGrades();
      },
        error => console.log(error));

      this.menteeProfileService.notify_change_in_grades();

      this.timelineService.get_timeline_data(this.menteeId)
        .subscribe(data => {
          this.timelineData = data;
        },
          error => console.log(error));
    }
  }

  public add_blank_grade() {
    const control = <FormArray>this.myForm.controls['grades'];
    control.push(this._fb.group({
      period: [''],
      course: ['', Validators.required],
      value: ['', Validators.required]
    }));
  }

  public removeGrade(i: number) {
    const control = <FormArray>this.myForm.controls['grades'];
    control.removeAt(i);
  }

  public getPeriodGpa(id: string, period: any) {
    var period_id = period[0].gradePeriod.id;

    var userGpa: GradePointAverage = new GradePointAverage();
    userGpa = this.gpas.filter(x => x.mentee_id === parseInt(this.menteeId) && x.period_id === period_id)[0];

    return userGpa.gpa;
  }

  public async getMentee(menteeId: number) {
    await this.menteeService.get_mentee_by_id(menteeId)
      .subscribe(async data => {
        this.mentee = data;
        this.system_id = this.mentee.menteeSchool.system.id;
        this.classification_id = data.menteeClassification.id;

        this.addSiteAverages(this.classification_id);

        this.gradingService.get_courses_by_systemid(this.system_id, this.classification_id)
          .subscribe(data => {
            this.courses = data;
          });
      },
        error => console.log(error));
  }

  public async addSiteAverages(classificationId: number) {
    await this.menteeService.get_all_averages_for_user(classificationId)
      .subscribe(data => {
        this.allSiteAverages = data;
        var aData = [];
        var tData = [];
        for (var i = 0; i < this.allSiteAverages.length; i++) {
          aData.push(this.allSiteAverages[i].gpa);
        }

        this.lineChartData.push({
          data: aData, label: "Site Avg", backgroundColor: 'rgba(66,158,206,0.2)',
          fill: false,
          borderColor: 'rgba(66,158,206,0.2)',
          pointBackgroundColor: 'rgba(66,158,206,0.2)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(66,158,206,0.2)'
        });

        tData = this.lineChartData;
        this.chart.chart.config.data.colors = this.chartColors;
        this.chart.chart.config.data.datasets = tData;
        this.chart.chart.update();
      });
  }

  public async addGpas() {
    await this.menteeProfileService.mentee_gpas$.subscribe(async data => {
      this.gpas = data;
      var gData = [];
      var series = [];

      for (var i = 0; i < this.gpas.length; i++) {
        gData.push(this.gpas[i].gpa);
      }

      this.multi.push({ name: this.user.given_name, series: series });

      this.lineChartData.push({
        data: gData, label: this.user.given_name, backgroundColor: 'rgba(128,170,0,0.2)',
        fill: false,
        borderColor: 'rgba(128,170,0,0.2)',
        pointBackgroundColor: 'rgba(128,170,0,0.2)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(128,170,0,0.2)'
      });
    });
  }

  public async getMenteeGrades() {
    if (this.allPeriods.length < 1) {
      var previousId = 0;
      let nPeriods: Array<GradingPeriod> = _.pluck(this.grades, 'gradePeriod');
      for (var i = 0; i < nPeriods.length; i++) {
        if (nPeriods[i].id !== previousId) {
          this.allPeriods.push({
            id: nPeriods[i].id,
            period: nPeriods[i].period,
            description: nPeriods[i].description
          });
        }
        previousId = nPeriods[i].id;
      }

      for (var k = 0; k < this.allPeriods.length; k++) {
        this.labels.push(this.allPeriods[k].description);
      }

      this.lineChartLabels = this.labels;

      this.gradingService.get_grading_periods()
        .subscribe(data => {
          var aPeriods = this.allPeriods;

          for (var j = 0; j < data.length; j++) {
            let gp = !_.findWhere(this.allPeriods, { id: data[j].id });

            if (gp && this.gradingPeriods.length < 4) {
              this.gradingPeriods.push(data[j]);
            }
          }
        });
    }
  }

  public save_grades(form) {
    var grades = form.value.grades;
    var new_grades = [];

    grades.forEach(grade => {
      new_grades.push({
        course_id: grade.course,
        mentee_id: this.menteeId,
        grade_value: grade.value,
        period_id: this.selectedPeriod,
        school_year: '2017-2018'
      });
    });

    this.menteeService.add_mentee_grades(new_grades)
      .subscribe(r => {
        let response = r;
        this.menteeProfileService.notify_change_in_grades();
        this.menteeTabs.tabs[1].active = true;
        //this.menteeTabs.tabs[3].active = true;
      });

    const control = <FormArray>this.myForm.controls['grades'];
    while (control.length !== 0) {
      this.removeGrade(0);
    }
  }
}
