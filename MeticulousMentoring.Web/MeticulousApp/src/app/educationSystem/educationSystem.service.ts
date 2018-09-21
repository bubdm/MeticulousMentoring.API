import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import { map } from 'rxjs/operators';

@Injectable()
export class EducationSystemService {
  constructor(private http: Http, private userService: UserService) { }

  private token: string = "";
  private tokenExpiration: Date;

  public get loginRequired(): boolean {
    return this.token.length === 0 || this.tokenExpiration > new Date();
  }

  public get_education_systems() {
    return this.http.get("http://localhost:5005/api/educationSystem",
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }
}
