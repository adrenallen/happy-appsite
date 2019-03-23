import { Injectable } from '@angular/core';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { RatingDTO } from 'src/app/dtos/rating-dto';
import { Observable } from 'rxjs';
import { DateDTO } from 'src/app/dtos/date-dto';
import { RatingFactorsDTO } from 'src/app/dtos/rating-factors-dto';
import { IdListDTO } from 'src/app/dtos/id-list-dto';
import { RatingsWithFactorsRequestDTO } from 'src/app/dtos/ratings-with-factors-request-dto';
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class RatingsService extends HappyApiService{

  constructor(http: HttpClient, cookieService: CookieService) { 
    super(http, cookieService);
  }

  public saveNewRating(rating: RatingDTO) : Observable<Object>{
    //if the date value is null, build from createddatetime
    if(rating.date == null && rating.createdDatetime != null){
      console.log("Rating date was null and created was not");
      rating.date = new DateDTO();
      rating.date.buildFromDateString(rating.createdDatetime);
    }
    return super.postAndInjectGUID('/ratings/newrating', rating);
  }

  public saveNewRatingFactors(ratingFactors:RatingFactorsDTO) : Observable<Object>{
    return super.postAndInjectGUID('/ratings/newratingfactors', ratingFactors);
  }

  public updateRating(rating: RatingDTO) : Observable<Object>{
    return super.postAndInjectGUID('/ratings/updaterating', rating);
  }

  public updateRatingFactors(ratingFactors:RatingFactorsDTO) : Observable<Object>{
    return super.postAndInjectGUID('/ratings/updateratingfactors', ratingFactors);
  }

  public deleteRatingFactors(ratingFactorIDs : IdListDTO) : Observable<Object>{
    return super.postAndInjectGUID('/ratings/deleteratingfactors', ratingFactorIDs);
  }

  public getRatingsWithFactors(startDate: Date, endDate: Date) : Observable<Object>{
    let requestDTO = new RatingsWithFactorsRequestDTO();

    requestDTO.startdate = new DateDTO();
    requestDTO.startdate.buildFromDate(startDate, moment.tz.guess());
    requestDTO.enddate = new DateDTO();
    requestDTO.enddate.buildFromDate(endDate, moment.tz.guess());

    return super.postAndInjectGUID('/ratings/getratingswithfactors', requestDTO);
  }

  public getRatingWithFactors(ratingID: number) : Observable<Object>{
    return super.postAndInjectGUID('/ratings/get', {ratingID: ratingID});
  }

  public deleteRating(ratingID: number) : Observable<Object>{
    let requestDTO = {
      ratingID: ratingID
    };

    return super.postAndInjectGUID('/ratings/deleterating', requestDTO);
  }

  public getAllRatingsWithFactors() : Observable<Object>{
    return super.postAndInjectGUID('/ratings/getallratingswithfactors', {});
  }
}
