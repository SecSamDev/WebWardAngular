import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingsService {
  private _API_ENDPOINT ='http://localhost:80/api/';
  public get API_ENDPOINT(){
    return this._API_ENDPOINT;
  }
  public set API_ENDPOINT(api : string){
    this._API_ENDPOINT = api;
    console.log("Api Endpoint: " + this._API_ENDPOINT)
  }
  constructor() { }
}
