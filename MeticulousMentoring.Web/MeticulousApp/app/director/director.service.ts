import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import 'rxjs/add/operator/map';


@Injectable()
export class DirectorService {
    constructor(private http: Http) { }

    public add_director(director) {
        return this.http.post("http://localhost:52373/api/directors",
                director,
                {
                    headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
                })
            .map((res: Response) => res.json());
    }
 }