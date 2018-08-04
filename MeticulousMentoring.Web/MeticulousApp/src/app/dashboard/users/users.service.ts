import { Injectable } from '@angular/core';
import { AccountService } from '../../shared/accountservice';
import { Subject } from 'rxjs/Subject';
import { UserView } from '../../models/userview';

@Injectable()
export class UsersService {
  public users$ = new Subject<Array<UserView>>();

  constructor(private accountService: AccountService) {
    this.get_users_with_roles();
  }

  private get_users_with_roles() {
    this.accountService.get_users_with_roles().subscribe(data => this.users$.next(data));
  }

  public notify_users_with_roles_changed() {
    this.get_users_with_roles();
  }
}
