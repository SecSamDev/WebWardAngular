import { Injectable } from '@angular/core';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { AlertService } from '../alert/alert.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { AppSettingsService } from '../app-settings.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService, private alerts: AlertService, private AppSettings: AppSettingsService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiURL = new URL(this.AppSettings.API_ENDPOINT);
        let targetURL = new URL(request.url);
        if (apiURL.origin === targetURL.origin) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
        }

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                switch (err.status) {
                    case 0:
                        this.alerts.clear()
                        this.alerts.error("Server not responding", false);
                        break;
                    case 404:
                        this.alerts.error("Not Found", false);
                        break;
                    case 401:
                        this.alerts.clear()
                        this.alerts.error("Unauthorized", false);
                        this.auth.signOut();
                        break;
                }
            }
        });
    }
}