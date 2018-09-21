import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import { map } from 'rxjs/operators';

@Injectable()
export class GuardianService {
  constructor(private http: Http, private userService: UserService) { }

  public add_guardian(guardian) {
    return this.http.post("http://localhost:5005/api/mentees/AddGuardian",
      guardian,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }
}
