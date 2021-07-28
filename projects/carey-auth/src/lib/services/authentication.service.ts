import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { JwtRequest } from '../models/jwt-request';
import { JwtResponse } from '../models/jwt-response';
import { tap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AUTH_CONFIG_TOKEN } from '../models/token';
import { AuthConfig } from '../models/auth-config';

const TOKEN_NAME = 'careydev_id_token';
const EXPIRES_AT = 'careydev_token_expires_at';
const USER = 'careydev_user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authNotification$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient, private router: Router,
    @Inject(AUTH_CONFIG_TOKEN) private readonly config: AuthConfig) {
  }

  login(username: string, password: string): Observable<JwtResponse> {
    let jwtRequest: JwtRequest = { username: username, password: password };
    let url: string = `${this.config.baseUrl}/authenticate`;

    return this.http.post<JwtResponse>(url,
        jwtRequest).pipe(
            tap((resp: JwtResponse) => this.successfulLogin(resp)),
            shareReplay()
        );
  }

  private successfulLogin(authResult: JwtResponse) {
    const expiresAt = authResult.expirationDate;
    //console.log("Token expires at " + expiresAt);
    //console.log("Token date and time is " + this.dateService.getShortDateAndTimeDisplay(expiresAt));

    if (authResult && authResult.token) {
      localStorage.setItem(TOKEN_NAME, authResult.token);
      localStorage.setItem(EXPIRES_AT, JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem(USER, JSON.stringify(authResult.user));

      this.authNotification$.next(true);
    }
  }

  clearStorage() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(EXPIRES_AT);
    localStorage.removeItem(USER); 
  }

  logout() {
    this.clearStorage();
    this.authNotification$.next(false);
    this.router.navigate(['/login']);
  }

  isTokenExpired(): boolean {
    let expiration = this.getExpiration();

    if (expiration) {
      return !(Date.now() < expiration);
    }

    return false;
  }

  isLoggedIn(): boolean {
    let loggedIn: boolean = false;

    if (this.token()) {
      loggedIn = !this.isTokenExpired();
    }

    return loggedIn;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  private getExpiration(): number {
    let expiresAt: number = null;

    const expiration = localStorage.getItem(EXPIRES_AT);

      if (expiration) {
          expiresAt = JSON.parse(expiration);
      }

      return expiresAt;
  }

  token(): string {
    return localStorage.getItem(TOKEN_NAME);
  }
}
