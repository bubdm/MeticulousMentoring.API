import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import 'rxjs/add/operator/map';

@Injectable()
export class MenteeService {
    constructor(private http: Http, private userService: UserService) { }

    public get_mentees() {
        return this.http.get("http://localhost:52373/api/mentees",
                {
                    headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
                })
            .map((res: Response) => res.json());
    }

    public get_total_mentees() {
        return this.http.get("http://localhost:52373/api/mentees/totalmentees",
                {
                    headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
                })
            .map((res: Response) => res.json());
    }


    public add_mentee(mentee) {
        return this.http.post("http://localhost:52373/api/mentees",
            mentee,
            {
                headers: new Headers({"Authorization": "Bearer " + localStorage.getItem('token').toString()})
            }).map((res: Response) => res.json());
    }

    public get_mentee_by_id(menteeId) {
        return this.http.get("http://localhost:52373/api/mentees/" + menteeId,
                {
                    headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
                })
            .map((res: Response) => res.json());
    }

    public get_mentor_by_mentee_id(menteeId) {
        return this.http.get("http://localhost:52373/api/mentees/GetMentor/" + menteeId,
                {
                    headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
                })
            .map((res: Response) => res.json());
    }
}