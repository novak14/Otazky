import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    baseUrl: string;
    authenticated = false;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string,
        private router: Router) {
        this.baseUrl = baseUrl;
    }

    async signIn(password: string) {
        return await this.http.get(this.baseUrl + 'api/Account/Login', {
            params: new HttpParams().set('password', password)
          }).toPromise();
    }

    isAuthenticated() {
        const token = localStorage.getItem('tmr');
        if (token) {
            return true;
        } else {
            return false;
        }
    }
}
