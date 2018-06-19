import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subscriber } from 'rxjs/Subscriber';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import { AppSettingsService } from '../app-settings.service';
import { WebProjectService } from '../web-project/web-project.service';
import { ThreatModel } from './threat-model';
import { saveAs as importedSaveAs } from "file-saver";

@Injectable()
export class ThreatModelService {

  private subscriber: Subscriber<boolean>;
  private pullerObserver: Observable<boolean>;

  constructor(private http: HttpClient, private AppSettings: AppSettingsService, private webProjService: WebProjectService) {

    this.pullerObserver = new Observable(observer => {
      this.subscriber = observer;
    });

  }
  getThreatModels(): Observable<ThreatModel[]> {
    let webProj = this.webProjService.getActualProject();
    if (webProj && webProj.id) {
      return this.http.get(this.AppSettings.API_ENDPOINT + 'threat-model/' + webProj.id).map(data => data as ThreatModel[]);
    }

  }
  getThreatModel(id: string): Observable<ThreatModel> {
    let webProj = this.webProjService.getActualProject();
    if (webProj && webProj.id) {
      return this.http.get(this.AppSettings.API_ENDPOINT + 'threat-model/' + webProj.id + "/" + id).map(data => data as ThreatModel);
    }

  }
  deleteThreatModel(id: string) {
    return new Observable(observer => {
      let webProj = this.webProjService.getActualProject();
      if (webProj && webProj.id) {
        this.http.delete(this.AppSettings.API_ENDPOINT + 'threat-model/' + webProj.id + "/" + id, { responseType: 'json' })
          .subscribe(data => {
            this.notify();
            observer.next(data);
          }, err => {
            observer.error(err);
          });
      } else {
        observer.error(new Error("No valid threat model"));
      }
    });
  }
  createThreatModel(thMod: ThreatModel): Observable<string> {
    return new Observable(observer => {
      let webProj = this.webProjService.getActualProject();
      if (webProj && webProj.id) {
        this.http.post(this.AppSettings.API_ENDPOINT + 'threat-model/' + webProj.id, thMod, { responseType: 'json' })
          .map(data => data as string)
          .subscribe(data => {
            this.notify();
            observer.next(data);
          }, err => {
            observer.error(err);
          });
      } else {
        observer.error(new Error("No valid threat model"));
      }
    });
  }
  updateThreatModel(thMod: ThreatModel): Observable<ThreatModel> {
    return new Observable(observer => {
      this.http.put(this.AppSettings.API_ENDPOINT + 'threat-model/' + thMod.project + "/" + thMod.id, thMod, { responseType: 'json' })
        .map(data => data as ThreatModel)
        .subscribe(data => {
          this.notify();
          observer.next(data);
        }, err => {
          observer.error(err);
        });
    });
  }
  updateThreatModelWithFiles(thMod: ThreatModel, fileMod: File, fileRep: File,fileTemp : File) {
    let formData: FormData = new FormData();
    if (fileMod)
      formData.append('threatModelFile', fileMod, fileMod.name);
    if (fileRep)
      formData.append('threatModelReport', fileRep, fileRep.name);
    if(fileTemp)
    formData.append('threatModelTemplate', fileTemp, fileTemp.name);
    formData.append('project', thMod.project);
    formData.append('id', thMod.id);
    return this.http.put(this.AppSettings.API_ENDPOINT + "threat-model/" + thMod.project + "/" + thMod.id,
      formData);
  }
  downloadFile(id: string): Observable<Blob> {
    return this.http.get(this.AppSettings.API_FILES + id, { headers: { 'Accept': '*/*'},responseType : 'blob' })
      .map(res => {
        try{
          var myBlob = new Blob([res],{type : extractContentType(id.split('.').pop())});
          return myBlob;
        }catch(err){
          throw err;
        }
        
      });
  }
  /**
   * Get notified when a object is deleted, update or created.
   * Dont use it in @Input Components
   */
  subscribeToThreatModel(): Observable<boolean> {
    return this.pullerObserver;
  }

  /**
   * Use internally
   */
  private notify() {
    try {
      this.subscriber.next(true);
    } catch (err) { }

  }

}
function extractContentType(fileExt) {
  switch (fileExt) {
    case 'htm': 
      return 'text/html';
    case 'html': 
      return 'text/html';
    case 'doc': 
      return 'application/msword';
    case 'pdf': 
      return 'application/pdf';
    default: 
      return 'application/octet-stream';
  }
}