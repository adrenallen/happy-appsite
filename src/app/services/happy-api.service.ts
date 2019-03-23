import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import { UserDTO } from '../dtos/user-dto';
@Injectable({
  providedIn: 'root'
})
export class HappyApiService {
  
  readonly url = environment.apiURL;
  readonly guidCookieName = 'guid';

  constructor(private http: HttpClient, private cookieService: CookieService) { 
  }

  tryLogin(user: string, pass: string): Observable<Object>{
    return this.http.post(this.url + "/user/newsession", {user: user, password: pass});
  }

  saveGUIDToCookies(guid: string){
    this.cookieService.set(this.guidCookieName, guid, null, '/');
  }

  getGUIDFromCookies() : string{
    return this.cookieService.get(this.guidCookieName);
  }

  public checkGUIDIsValid() : Observable<Object>{
    return this.http.post(this.url + '/user/verifyguid', {guid: this.getGUIDFromCookies()});
  }

  public logout() : Observable<Object>{
    const guid = this.getGUIDFromCookies();
    this.cookieService.delete(this.guidCookieName, '/');
    return this.http.post(this.url + '/user/logout', {guid: guid});
  }

  public doesUsernameExist(username : string):Observable<Object>{
    return this.http.post(this.url + '/user/doesuserexist', {username: username});
  }

  public doesEmailExist(email : string):Observable<Object>{
    return this.http.post(this.url + '/user/doesemailexist', {email: email});
  }

  //Special for sending code with signup for EAC
  public createNewUserWithCode(username : string, email : string, password : string, code : string) : Observable<Object>{
    let requestDTO = {
      email, 
      username,
      password,
      code
    };

    return this.http.post(this.url + '/user/createuser', requestDTO);
  }

  public createNewUser(username : string, email : string, password : string) : Observable<Object>{
    let requestDTO = new UserDTO();
    requestDTO.email = email;
    requestDTO.username = username;
    requestDTO.password = password;

    return this.http.post(this.url + '/user/createuser', requestDTO);
  }

  public setUserPhone(phone: string): Observable<Object>{
    return this.postAndInjectGUID('/user/setphone', {mobileNumber: phone});
  }

  public forgotPassword(email : string) : Observable<Object>{
    return this.http.post(this.url + '/user/forgotpassword', {email: email});
  }

  public resetPassword(token : string, password : string) : Observable<Object>{
    return this.http.post(this.url + '/user/resetpassword', {token: token, password: password});
  }

  public sendFeedback(feedback : string) : Observable<Object>{
    return this.http.post(this.url + '/support/sendfeedback', this.injectGUIDIntoDTO({feedback: feedback}));
  }

  public getChangelogSeenVersion() : Observable<Object>{
    return this.http.post(this.url + '/support/getuserchangelogseen', this.injectGUIDIntoDTO({}));
  }

  public setChangelogSeenVersion(version : string) : Observable<Object>{
    return this.http.post(this.url + '/support/setuserchangelogseen', this.injectGUIDIntoDTO({version: version}));
  }

  public getUserForGUID() : Observable<Object>{
    return this.http.post(this.url + '/user/getuser', this.injectGUIDIntoDTO({}));
  }

  public postAndInjectGUID(path: string, request: Object) : Observable<Object>{
    return this.http.post(this.url + path, this.injectGUIDIntoDTO(request));
  }

  //puts a guid in the object before sending it
  private injectGUIDIntoDTO(dto : any) : any{
    dto.guid = this.getGUIDFromCookies();
    return dto;
  }
  
}