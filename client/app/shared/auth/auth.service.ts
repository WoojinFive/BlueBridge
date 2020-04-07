import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Auth } from './auth.model';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { DataStorageService } from '../data-storage.service';

export interface AuthResponseData {
  userID: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  token: string;
  expiresIn: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: User[];
  user = new BehaviorSubject<Auth>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private dataStorageService: DataStorageService
  ) {}

  signup() {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('http://localhost:3000/api/users/login', {
        email: email,
        password: password,
      })
      .pipe(
        tap((resData) => {
          this.dataStorageService.fetchUsers().subscribe(() => {
            const allUsers = this.userService.getUsers();
            const currentUser = allUsers.filter(
              (user) => user._id === resData.userID
            )[0];

            // add login time in db
            this.users = this.userService.users;

            const date = new Date();
            const currentDate = new Date(
              date.getTime() - date.getTimezoneOffset() * 60000
            ).toISOString();

            const updatedCurrentUser = {
              ...currentUser,
              workInfo: {
                ...currentUser['workInfo'],
                lastLoginTime: currentDate,
              },
              isLogin: true,
            };

            this.dataStorageService.updateUsers(updatedCurrentUser);

            this.handleAuthentication(
              resData.userID,
              resData.email,
              resData.firstName,
              resData.lastName,
              resData.picture,
              resData.token,
              +resData.expiresIn
            );
          });
        })
      );
  }

  autoLogin() {
    const userData: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      picture: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new Auth(
      userData.id,
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.picture,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser); // auto login
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime(); // duration for auto logout after auto login
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    // get current login user cookie
    const userData = JSON.parse(localStorage.getItem('userData'));

    // add login time in db
    this.users = this.userService.users;
    const currentUser = this.users.filter(
      (user) => user._id === userData.userID
    )[0];
    const date = new Date();
    const currentDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    const updatedCurrentUser = {
      ...currentUser,
      workInfo: {
        ...currentUser['workInfo'],
        lastLogoutTime: currentDate,
      },
      isLogin: false,
    };

    this.dataStorageService.updateUsers(updatedCurrentUser);

    this.user.next(null);

    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.router.navigate(['/signin']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    userID: string,
    email: string,
    firstName: string,
    lastName: string,
    picture: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new Auth(
      userID,
      email,
      firstName,
      lastName,
      picture,
      token,
      expirationDate
    );
    this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

    /*
    // add login time in db
    this.users = this.userService.users;
    const currentUser = this.users.filter((user) => user._id === userID)[0];
    const date = new Date();
    const currentDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    const updatedCurrentUser = {
      ...currentUser,
      workInfo: {
        ...currentUser['workInfo'],
        lastLoginTime: currentDate,
      },
      isLogin: true,
    };

    this.dataStorageService.updateUsers(updatedCurrentUser);

    this.user.next(null);
    */
  }
}
