import { Injectable } from '@angular/core';

import { HappyApiService } from './happy-api.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HappySecurityService {

  constructor(private happyAPIService: HappyApiService,
    private router: Router) { }

  public verifyGUIDIsValid() : Observable<boolean>{
    let stream = new Subject<boolean>();

    this.happyAPIService.checkGUIDIsValid().subscribe(
      (value) => { stream.next(true); },
      (error) => { this.router.navigate(['/login']); stream.next(false); }
    );

    return stream;
  }

}
