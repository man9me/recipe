import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
const key: string = environment.key;
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}
  signup(email: string, password: string) {
    const link1: string =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + key;
    return this.http
      .post<AuthResponseData>(link1, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.errorHandle),
        tap((r) => {
          this.authHandle!(r);
        })
      );
  }
  loging(email: string, password: string) {
    const link1: string =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      key;
    return this.http
      .post<AuthResponseData>(link1, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.errorHandle),
        tap((r) => {
          this.authHandle!(r);
        })
      );
  }
  autoLogging() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')!);

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const exparationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(exparationDuration);
    }
  }
  private errorHandle(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    console.log(errorRes);
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  logout() {
    console.log('logout');

    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  private authHandle(res: {
    email: string;
    localId: string;
    idToken: string;
    expiresIn: string;
  }) {
    console.log('auth');

    const exparationDate = new Date(
      new Date().getTime() + +res.expiresIn * 1000
    );
    const user = new User(res.email, res.localId, res.idToken, exparationDate);
    this.user.next(user);
    this.autoLogout(+res.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
