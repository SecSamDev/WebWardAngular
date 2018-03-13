import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { JwtHelperService } from '@auth0/angular-jwt';
import {AppSettings} from '../appSettings';
import {Router} from '@angular/router';
@Injectable()
export class AuthService {
    helper = new JwtHelperService();
    constructor(private http: HttpClient,private router : Router) { }
    myVar: boolean = true;
    public getToken() {
        return localStorage.getItem('token');
    }

    public isAuthenticated(): boolean {
        console.log("is auth?")
        const token = this.getToken();
        //this.http.get<any>(AppSettings.API_ENDPOINT + 'authenticate').toPromise();
        return !this.helper.isTokenExpired(token);
        
        
    }
    /**
     * Send auth
     */
    public signIn(username: string, password: string) {
        return this.http.post<any>(
            AppSettings.API_ENDPOINT + 'authenticate', 
            { 'username': username, 'password': password },{responseType : 'json'}
        )
            .map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.createToken(data.token);
                }
                return data.token;
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
        this.router.navigate(['login'])
    }

}