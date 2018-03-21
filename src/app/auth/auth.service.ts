import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppSettings } from '../appSettings';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
    helper = new JwtHelperService();
    constructor(private http: HttpClient, private router: Router) { }
    myVar: boolean = true;
    public getToken() {
        return localStorage.getItem('token');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        //this.http.get<any>(AppSettings.API_ENDPOINT + 'authenticate').toPromise();
        return !this.helper.isTokenExpired(token);


    }
    /**
     * Send auth
     */
    public signIn(username: string, password: string, remember: boolean = false) {
        return this.http.post<any>(
            AppSettings.API_ENDPOINT + 'authenticate',
            { 'username': username, 'password': password, 'remember': remember }, { responseType: 'json' }
        )
            .map(data => {
                // login successful if there's a jwt token in the response
                if (data && data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.createToken(data.token);
                    if (data.user && 'name' in data.user && 'id' in data.user && 'role' in data.user) {
                        this.storeUser(data.user.name, data.user.id, data.user.role);
                    }
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
     * Saves simple User information like role, ID, name etc
     */
    public storeUser(userName: string, userID: string, userRole: number) {
        localStorage.setItem('userName', userName);
        localStorage.setItem('userID', userID);
        localStorage.setItem('userRole', userRole.toString());
    }
    public getUser() {
        let user = {
            id: localStorage.getItem('userID'),
            name: localStorage.getItem('userName'),
            role: parseInt(localStorage.getItem('userRole'))
        };
        return localStorage.getItem('userID') !== null ? user : null;
    }
    /**
     * Remove Auth token
     */
    public signOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userID');
        localStorage.removeItem('userRole');
        this.router.navigate(['login'])
    }
    isDev() {
        let user = this.getUser();
        if (user === null || user.id === null) {
            return true;
        } else {
            return user.role == 0 ? true : false;
        }
    }
    isAuth() {
        let user = this.getUser();
        if (user === null || user.id === null) {
            return false;
        } else {
            return true;
        }
    }
    isAdmin() {
        let user = this.getUser();
        if (user && 'role' in user && user.role === 3) {
            return true;
        } else {
            return false;
        }
    }

}