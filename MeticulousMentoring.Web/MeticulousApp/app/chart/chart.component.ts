import { Component } from '@angular/core';
import { ChartsModule } from "ng2-charts/ng2-charts";

@Component({
    selector: 'meticulous-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class MeticulousChartComponent {
    public labels: string[] = ["October", "November", "December"];
    public chartData: number[] = [1, 2, 0];
    public chartType: string = 'bar'

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}