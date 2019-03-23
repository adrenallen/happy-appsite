import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { FactorDTO } from 'src/app/dtos/factor-dto';
import { Observable } from 'rxjs';
import { FactorAspectDTO } from 'src/app/dtos/factor-aspect-dto';

@Injectable({
  providedIn: 'root'
})
export class FactorsService extends HappyApiService {

  constructor(http: HttpClient, cookieService: CookieService) { 
    super(http, cookieService);
  }

  public renameFactor(factor: FactorDTO) : Observable<Object>{
    return super.postAndInjectGUID('/factors/renamefactor', {factorID: factor.id, factor: factor.factor});
  }

  public setFactorArchive(factor: FactorDTO) : Observable<Object>{
    return super.postAndInjectGUID('/factors/setfactorarchive', {factorID: factor.id, archive: factor.archived});
  }

  public saveNewFactor(factor: FactorDTO) : Observable<Object>{
    return super.postAndInjectGUID('/factors/newfactor',factor);
  }

  public getAllFactors() : Observable<Object>{
    return super.postAndInjectGUID('/factors/getall', {guid: super.getGUIDFromCookies()});
  }

  public getAllFactorAspects() : Observable<Object>{
    return super.postAndInjectGUID('/factoraspects/getall',{});
  }

  public saveNewFactorAspect(aspect: FactorAspectDTO) : Observable<Object>{
    return super.postAndInjectGUID('/factoraspects/newfactoraspect',aspect);
  }

  public renameFactorAspect(factorAspect: FactorAspectDTO) : Observable<Object>{
    return super.postAndInjectGUID('/factoraspects/renamefactoraspect',
      {factorAspectID: factorAspect.id, factorAspect: factorAspect.factorAspect});
  }

  public setFactorAspectArchive(factorAspect: FactorAspectDTO) : Observable<Object>{
    return super.postAndInjectGUID('/factoraspects/setfactoraspectarchive', 
      {factorAspectID: factorAspect.id, archive: factorAspect.archived});
  }
}
