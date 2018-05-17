import { Component, AfterViewInit, NgModule, OnInit } from '@angular/core';
import { ChartsModule } from "ng2-charts/ng2-charts"
import Chart from "chart.js";
import { MenteeService } from '../mentee/mentee.service';
import { MentorService } from '../mentor/mentor.service';
import { DirectorService } from '../director/director.service';

@NgModule({
    imports: [ChartsModule]
})

@Component({
    selector: 'meticulous-userchart',
    templateUrl: './userchart.component.html',
    styleUrls: ['./userchart.component.css']
})
export class UserchartComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
    }

    public chartLabels: string[] = ['Mentees', 'Mentors'];
    public chartData: number[] = [];
    public chartType: string = 'pie';
    public chartColors: any[] =
    [
        {
            backgroundColor: ['#f20d0d', '#ff00ff']
        }
    ];
    public cDataMentees: number = 0;
    public cDataMentors: number = 0;

    constructor(private menteeService: MenteeService, private mentorService: MentorService, private directorService: DirectorService) {
        //this.menteeService.mentees
        //    .subscribe(d => {
        //        this.cDataMentees = d.length;
        //        this.setChartData();
        //    });
        this.mentorService.get_mentors()
            .subscribe(data => {
                this.cDataMentors = data.length;
            });
    }

    ngOnInit(): void { }

    setChartData(): void {
        setTimeout(() => {
            this.chartData.push(this.cDataMentees);
            this.chartData.push(this.cDataMentors);
        }, 30);
    }
}