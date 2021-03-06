import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import { AppSettingsService } from '../app-settings.service';
import { User } from './user';

@Injectable()
export class UserService {
    private subscriber: Subscriber<boolean>;
    private pullerObserver: Observable<boolean>;

    constructor(private http: HttpClient, private AppSettings : AppSettingsService) {
        this.pullerObserver = new Observable(observer => {
            this.subscriber = observer;
        });

    }
    getUsers(): Observable<User[]> {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'user').map(data => {
            return data as User[];
        });

    }
    getUser(id: string, fill: boolean = false): Observable<User> {
        return this.http.get(this.AppSettings.API_ENDPOINT + 'user/' + id).map(data => data as User);

    }
    postUser(user: User) {
        return new Observable(observer => {
            this.http.post(this.AppSettings.API_ENDPOINT + 'user', user, { responseType: 'json' })
                .subscribe(data => {
                    this.notify();
                    observer.next(data);
                }, err => {
                    observer.error(err);
                });
        });
    }
    updateUser(user: User) {
        return new Observable(observer => {
            this.http.put(this.AppSettings.API_ENDPOINT + 'user/' + user.id, user, { responseType: 'json' })
                .subscribe(data => {
                    this.notify();
                    observer.next(data);
                }, err => {
                    observer.error(err);
                });
        });
    }
    deleteUser(user: User) {

        return new Observable(observer => {
            this.http.delete(this.AppSettings.API_ENDPOINT + 'user/' + user.id, { responseType: 'json' })
                .subscribe(data => {
                    this.notify();
                    observer.next(data);
                }, err => {
                    observer.error(err);
                });
        });
    }
    /**
     * Get notified when a object is deleted, update or created.
     * Dont use it in @Input Components
     */
    subscribeToUsers(): Observable<boolean> {
        return this.pullerObserver;
    }

    /**
     * Use internally
     */
    private notify() {
        try{
            this.subscriber.next(true);
        }catch(err){}
        
    }
}