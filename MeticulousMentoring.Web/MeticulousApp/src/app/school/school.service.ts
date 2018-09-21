import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import { map } from 'rxjs/operators';

@Injectable()
export class SchoolService {
  constructor(private http: Http, private userService: UserService) { }

  public get_schools() {
    return this.http.get("http://localhost:5005/api/schools",
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }
}
