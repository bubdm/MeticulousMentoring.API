import { Http, Response, Headers } from "@angular/http";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import { Mentor } from '../models/mentor';
import { map } from 'rxjs/operators';

@Injectable()
export class MentorService {
  constructor(private http: Http, private httpClient: HttpClient, private userService: UserService) { }

  public get_mentors() {
    return this.http.get("http://localhost:5005/api/mentors",
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }

  public add_mentor(mentor) {
    return this.http.post("http://localhost:5005/api/mentors",
      mentor,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }

  public get_mentor_by_id(mentorId) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token').toString()
      })
    };

    return this.httpClient.get<Mentor>("http://localhost:5005/api/mentors/" + mentorId, httpOptions);
  }
}
