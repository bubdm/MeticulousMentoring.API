import { Http, Response, Headers } from "@angular/http";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
//import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "../shared/user.service";
import { UserView } from '../models/userview';
import { AdminView } from '../models/adminview';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {
  constructor(private http: Http, private userService: UserService, private httpClient: HttpClient) { }

  private token: string = "";
  private tokenExpiration: Date;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  public get loginRequired(): boolean {
    return this.token.length === 0 || this.tokenExpiration > new Date();
  }

  public loggedIn() {
    var token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }

  public login(creds) {
    return this.http.post("http://localhost:5005/api/account/createtoken", creds)
      .pipe(map((res: Response) => res.json()));
  }

  public logout() {
    this.userService.delete();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  public get_users() {
    return this.http.get("http://localhost:5005/api/account/getusers",
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      })
      .pipe(map((res: Response) => res.json()));
  }

  public get_users_with_roles() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token').toString()
      })
    };

    return this.httpClient.get<UserView[]>("http://localhost:5005/api/account/GetUserWithRoles", httpOptions);
  }

  public add_admin(admin: AdminView) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token').toString()
      })
    };

    return this.httpClient.post<AdminView[]>("http://localhost:5005/api/account/AddAdmin", admin, httpOptions);
  }

  public deleteUser(id: number) {
    return this.http.delete("http://localhost:5005/api/account/deleteUser/" + id,
      {
        headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
      }).pipe();
  }

  public upload_image(id: number, form: FormData) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token').toString()
      })
    };

    return this.httpClient.post<any>("http://localhost:5005/api/account/UploadImage/" + id, form, httpOptions);
  }
}
