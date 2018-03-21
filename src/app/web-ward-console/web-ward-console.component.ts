import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../appSettings';
import { AlertService } from '../alert/alert.service';
@Component({
  selector: 'app-web-ward-console',
  templateUrl: './web-ward-console.component.html',
  styleUrls: ['./web-ward-console.component.css']
})
export class WebWardConsoleComponent implements OnInit {
  actualCommand: string = "";
  commandHistory: string = "";
  constructor(private auth: AuthService, private http: HttpClient, private alertService: AlertService) { }

  ngOnInit() {
  }
  send() {
    if (this.actualCommand !== "") {
      this.http.post(AppSettings.API_ENDPOINT + 'console', { 'command': this.actualCommand }, { responseType: 'text' }).pipe().subscribe(data => {
        console.log(data)
        this.commandHistory =this.commandHistory+ data + "\n";
        this.actualCommand = "";

      })


    }

  }

}
