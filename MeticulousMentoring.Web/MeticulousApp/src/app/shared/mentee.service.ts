import { Http, Response, Headers } from "@angular/http";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { map } from 'rxjs/operators';
import { UserService } from "./user.service";
import { Mentee } from '../models/mentee';
import { Grade } from '../models/grade';
import { GradePointAverage } from '../models/gradepointaverage';
import { SiteAverage } from '../models/siteaverage';

@Injectable()
export class MenteeService {
  constructor(private http: Http, private userService: UserService, private httpClient: HttpClient) { }

  public get_mentees() {
    return this.http.get("http://localhost:5005/api/mentees",
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }

  public get_total_mentees() {
    return this.http.get("http://localhost:5005/api/mentees/totalmentees",
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      }).pipe(map((res: Response) => res.json()));
  }

  public add_mentee(mentee) {
    return this.http.post("http://localhost:5005/api/mentees",
      mentee,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      }).pipe(map((res: Response) => res.json()));
  }

  public get_mentee_by_id(menteeId) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token').toString()
      })
    };

    return this.httpClient.get<Mentee>("http://localhost:5005/api/mentees/" + menteeId, httpOptions);
  }

  public get_mentor_by_mentee_id(menteeId) {
    return this.http.get("http://localhost:5005/api/mentees/GetMentor/" + menteeId,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }

  public get_guardian_by_mentee_id(menteeId) {
    return this.http.get("http://localhost:5005/api/mentees/GetGuardian/" + menteeId,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }

  public get_mentee_grades(menteeId) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token').toString()
      })
    };

    return this.httpClient.get<Grade[]>("http://localhost:5005/api/mentees/MenteeGrades/" + menteeId, httpOptions);
  }

  public add_mentee_grades(grades) {
    return this.http.post("http://localhost:5005/api/mentees/AddGrades",
      grades,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      });
  }

  public get_grade_point_average(id: number, period: number) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token').toString()
      })
    };

    return this.httpClient.get<number>("http://localhost:5005/api/mentees/GradePointAverage/" + id + "/" + period,
      httpOptions);
  }

  public get_grade_point_averages(id: number) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token').toString()
      })
    };

    return this.httpClient.get<GradePointAverage[]>("http://localhost:5005/api/mentees/GradePointAverages/" + id,
      httpOptions);
  }

  public get_all_averages_for_user(classificationId: number) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token').toString()
      })
    };

    return this.httpClient.get<SiteAverage[]>(
      "http://localhost:5005/api/mentees/GetAllAveragesForUser/" + classificationId,
      httpOptions);
  }
}
