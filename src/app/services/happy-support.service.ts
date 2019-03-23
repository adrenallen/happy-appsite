import { Injectable } from '@angular/core';
import { HappyApiService } from './happy-api.service';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
declare var require :any;
const { version: appVersion } = require('../../../package.json');

@Injectable({
  providedIn: 'root'
})
export class HappySupportService {

  private _latestChangeSeenCookieName : string = "latestChangeSeen";
  constructor(private happyAPIService : HappyApiService, private cookieService : CookieService,private http: HttpClient) { }

  public sendFeedback(feedback: string) : Observable<Object>{
    return this.happyAPIService.sendFeedback(feedback);
  }

  public shouldShowUserLatestChanges() : Observable<boolean>{
    let stream = new Subject<boolean>();
    
    this.happyAPIService.getChangelogSeenVersion().subscribe(
      (res:any) => {
          stream.next(res.versionString != appVersion)
      }
    );

    return stream;
  }

  public setShownUserLatestChanges() : void{
    this.happyAPIService.setChangelogSeenVersion(appVersion).subscribe(null, (error) => {
      console.error("Failed to set latest changelog seen for user ", error);
    });
  }

  public getLatestChangelog() : Observable<string>{
    return this.http.get('/assets/changelog.html', {responseType: 'text'});
  }
}
