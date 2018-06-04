import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingsService {
  private _API_ENDPOINT ='http://localhost:80/api/';
  private _API_FILES ='http://localhost:80/files/';
  public get API_FILES(){
    return this._API_FILES;
  }
  public set API_FILES(api : string){
    this._API_FILES = api;
  }
  public get API_ENDPOINT(){
    return this._API_ENDPOINT;
  }
  public set API_ENDPOINT(api : string){
    this._API_ENDPOINT = api;
    try{
      var urlAux = new URL(api);
      this._API_FILES = urlAux.origin;
    }catch(err){}
    console.log("Api Endpoint: " + this._API_ENDPOINT)
  }
  constructor() { }
}
