import { Injectable } from '@angular/core';
import { UserService } from "../shared/user.service";
import { MenteeService } from '../shared/mentee.service';
import { Subject } from 'rxjs/Subject';
import { Mentee } from '../models/mentee';
import { Grade } from '../models/grade';
import { User } from "../models/user";

@Injectable()
export class MenteeProfileService {
  public user: User;
  public mentee_grades$ = new Subject<Array<Grade>>();

  constructor(private menteeService: MenteeService, private userService: UserService) {
    this.get_mentee_grades();
  }

  private get_mentee_grades() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.menteeService.get_mentee_grades(parseInt(this.user.iat)).subscribe(data => this.mentee_grades$.next(data));
  }

  public notify_change_in_grades() {
    this.get_mentee_grades();
  }
}
