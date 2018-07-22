import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import { map } from 'rxjs/operators';

@Injectable()
export class MentorService {
  constructor(private http: Http, private userService: UserService) { }

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
    return this.http.get("http://localhost:5005/api/mentors/" + mentorId,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }
}
