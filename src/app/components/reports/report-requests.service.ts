import { Injectable } from '@angular/core';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { ReportType } from 'src/app/enums/report-type.enum';
import { ButtonOptionDTO } from 'src/app/dtos/button-option-dto';
import { ReportsService } from './reports.service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportRequestsService {

  constructor(private dialogService: HappyDialogService, private reportService: ReportsService) { }

  public requestNewReportForType(reportType: ReportType): Observable<boolean>{

    switch(reportType){
      case ReportType.FactorImpact:
        return this.factorImpactReportRequest();
    }

    let stream = new Subject<boolean>();
    stream.next(false);
    return stream;
  }

  factorImpactReportRequest() : Observable<boolean>{
    let stream = new Subject<boolean>();
    
    let buttons = new Array<ButtonOptionDTO>();
    buttons.push(new ButtonOptionDTO("Request New!", true, "primary"));
    buttons.push(new ButtonOptionDTO("Nevermind...", false, "warn"));
    
    this.dialogService.openPromptDialog("Request a new result set?",
     "Requests may take time to process, you will be notified when your results are ready.",
     buttons).afterClosed().subscribe((result: ButtonOptionDTO) =>{
       if(result.value === true){
         this.reportService.requestNewReportResult(ReportType.FactorImpact).subscribe(() => {
           this.dialogService.openNewSuccessDialog("Request received!", "You will be notified when your results are ready!");
           stream.next(true);
         },
         (error) => {
           this.dialogService.openNewErrorDialog("Whoops...",
            "We had trouble requesting this report for you.  Make sure you don't have a pending request out already for this report, and try again!");
            stream.next(false);
         });
       }
     });

     return stream;
  }

}
