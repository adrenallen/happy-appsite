import { Injectable } from '@angular/core';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportType } from 'src/app/enums/report-type.enum';
import { ReportResultDTO } from 'src/app/dtos/report-result-dto';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends HappyApiService {

  constructor(http: HttpClient, cookieService: CookieService) { 
    super(http, cookieService);
  }

  public getReportFactorToRatingOccurrences() : Observable<Object>{
    return super.postAndInjectGUID('/reports/factortoratingoccurrences', {});
  }

  public getResultsForReportType(reportTypeID: ReportType) : Observable<Object>{
    return super.postAndInjectGUID('/reports/results', {reportTypeID: reportTypeID});
  }

  public requestNewReportResult(reportTypeID: ReportType) : Observable<Object>{
    return super.postAndInjectGUID('/reports/request', {reportTypeID: reportTypeID});
  }

  public getPendingReportRequests(reportTypeID: ReportType) : Observable<Object>{
    return super.postAndInjectGUID('/reports/getreportpending', {reportTypeID: reportTypeID});
  }

  public getFullDataExport() : Observable<Object>{
    return super.postAndInjectGUID('/reports/getfulldataexport', {});
  }
}
