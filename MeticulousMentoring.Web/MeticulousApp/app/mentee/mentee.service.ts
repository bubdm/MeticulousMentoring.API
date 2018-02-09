import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { UserService } from "../shared/user.service";


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

    public get_guardian_by_mentee_id(menteeId) {
        return this.http.get("http://localhost:52373/api/mentees/GetGuardian/" + menteeId,
                {
                    headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
                })
            .map((res: Response) => res.json());
    }

    public get_mentee_grades(menteeId) {
        return this.http.get("http://localhost:52373/api/mentees/MenteeGrades/" + menteeId,
                {
                    headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
                })
            .map((res: Response) => res.json());

    }
}