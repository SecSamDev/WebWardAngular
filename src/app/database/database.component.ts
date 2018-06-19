import { Component, OnInit } from '@angular/core';
import { AppSettingsService } from '../app-settings.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  actualCommand: string = "";
  lastCommands: string[] = [];
  commandHistory: string = "";
  constructor(
    private AppSettings : AppSettingsService,
    private auth: AuthService, 
    private http: HttpClient, 
    private alertService: AlertService) { }

  ngOnInit() {
  }
  send() {
    if (this.actualCommand !== "") {
      this.lastCommands.push(this.actualCommand);
      this.http.post(this.AppSettings.API_ENDPOINT + 'database', { 'command': this.actualCommand }, { responseType: 'text' }).pipe().subscribe(data => {
        this.commandHistory =this.commandHistory+ data + "\n";
        this.actualCommand = "";

      })


    }

  }

}
