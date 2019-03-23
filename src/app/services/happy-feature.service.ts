import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { version } from 'punycode';


@Injectable({
  providedIn: 'root'
})
export class HappyFeatureService {

  constructor() { 

  }

  public isFeatureEnabled(featureName : string):boolean{
    if(environment.featureFlags[featureName] === true){
      return true;
    }
    return false;
  }
}
