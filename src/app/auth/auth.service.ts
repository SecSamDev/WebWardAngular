import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    helper = new JwtHelperService();
    constructor(private http: HttpClient) { }
    myVar: boolean = true;
    public getToken() {
        return localStorage.getItem('token');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();

        // Check whether the token is expired and return
        // true or false
        return !this.helper.isTokenExpired(token);
    }
    /**
     * Send auth
     */
    public signIn(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(token => {
                // login successful if there's a jwt token in the response
                if (token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.createToken(token);
                }
                return token;
            });
    }
    /**
     * Saves a token in the localstorage
     * @param token The token from the Server
     */
    public createToken(token: string) {
        localStorage.setItem('token', token);
    }
    /**
     * Remove Auth token
     */
    public signOut() {
        localStorage.removeItem('token');
    }

}