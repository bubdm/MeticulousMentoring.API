import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

@Injectable()
export class GradingService {
    constructor(private http: Http) { }

    public get_grading_periods() {
        return this.http.get("http://localhost:5005/api/grading/GetGradingPeriods")
            .map((res: Response) => res.json());
    }

    public get_courses_by_systemid(system_id, classification_id) {
        let myParams = new URLSearchParams();
        myParams.append('system_id', system_id);
        myParams.append('classification_id', classification_id);
        let options = new RequestOptions({ params: myParams });

        return this.http.get("http://localhost:5005/api/grading/GetCoursesBySystem", options)
            .map((res: Response) => res.json());
    }
}