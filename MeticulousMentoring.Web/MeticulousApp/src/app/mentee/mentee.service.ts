import { Http, Response, Headers } from "@angular/http";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { map } from 'rxjs/operators';
import { UserService } from "../shared/user.service";
import { Mentee } from '../models/mentee';

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
    return this.http.get("http://localhost:5005/api/mentees/" + menteeId,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
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
    return this.http.get("http://localhost:5005/api/mentees/MenteeGrades/" + menteeId,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }

  public add_mentee_grades(grades) {
    return this.http.post("http://localhost:5005/api/mentees/AddGrades",
      grades,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      });
  }
}