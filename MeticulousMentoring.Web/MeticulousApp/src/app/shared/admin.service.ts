import { Injectable } from '@angular/core';
import { AccountService } from '../shared/accountservice';
import { Subject } from 'rxjs/Subject';
import { UserView } from '../models/userview';

@Injectable()
export class AdminService {
  public users$ = new Subject<Array<UserView>>();

  constructor(private accountService: AccountService) {
    this.get_users();
  }

  private get_users() {
    this.accountService.get_users().subscribe(data => this.users$.next(data));
  }

  public notify_users_change() {
    this.get_users();
  }
}
