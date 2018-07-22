import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class GradingService {
  constructor(private http: Http) { }

  public get_grading_periods() {
    return this.http.get("http://localhost:5005/api/grading/GetGradingPeriods")
      .pipe(map((res: Response) => res.json()));
  }

  public get_courses_by_systemid(system_id, classification_id) {
    let myParams = new URLSearchParams();
    myParams.append('system_id', system_id);
    myParams.append('classification_id', classification_id);
    let options = new RequestOptions({ params: myParams });

    return this.http.get("http://localhost:5005/api/grading/GetCoursesBySystem", options)
      .pipe(map((res: Response) => res.json()));
  }
}
