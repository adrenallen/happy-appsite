import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../reports.service';
import { ReportType } from 'src/app/enums/report-type.enum';
import { ReportResultDTO } from 'src/app/dtos/report-result-dto';
import { FactorsService } from '../../factors/factors.service';
import { FactorDTO } from 'src/app/dtos/factor-dto';
import { forkJoin } from 'rxjs';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { ButtonOptionDTO } from 'src/app/dtos/button-option-dto';
import { ReportRequestsService } from '../report-requests.service';

@Component({
  selector: 'hpy-factor-impact',
  templateUrl: './factor-impact.component.html',
  styleUrls: ['./factor-impact.component.scss']
})
export class FactorImpactComponent implements OnInit {
  private factors: Array<FactorDTO>;
  public resultOptions: Array<ReportResultDTO>;
  public selectedResultID : number;
  public labels: Array<string>;
  public datasets : Array<any>;
  public data: Array<number>;
  public showChart = false;
  public canRequest = false;

  constructor(private reportService: ReportsService,
    private factorService: FactorsService,
    private dialogService: HappyDialogService,
    private reportRequestService: ReportRequestsService) {
  }

  ngOnInit() {


    forkJoin(
      this.factorService.getAllFactors(),
      this.reportService.getResultsForReportType(ReportType.FactorImpact),
      this.reportService.getPendingReportRequests(ReportType.FactorImpact)
    ).subscribe((results: any) => {
      this.factors = results[0].factors;
      this.resultOptions = results[1];

      if(this.resultOptions.length > 0){
        this.selectedResultID = this.resultOptions[0].id;
        this.updateResultSet();
      }

      if(results[2].length < 1){
        this.canRequest = true;
      }

    }, (error) => {
      this.dialogService.openNewErrorDialog("Oops...", "We failed to gather your data, please try again later!");
    })
  }

  public updateResultSet(){
    if(this.selectedResultID < 0){
      this.promptRequestNewResults();
      return;
    }

    let resultSet = this.resultOptions.find(r => r.id == this.selectedResultID);
    let orderedResults = Array<any>();
    let resultData = JSON.parse(resultSet.result);
    
    for (let factorID in resultData){
      if(resultData[factorID] !== 0){
        orderedResults.push(new FactorImpactData(factorID, resultData[factorID]))
      }
    }

    //order by highest impact first
    orderedResults.sort((a, b) => {
      return b.impact-a.impact;
    });

    this.data = new Array<number>();
    this.labels = new Array<string>();


    orderedResults.forEach((fiData: FactorImpactData) => {
      
      let factorName = this.factors.find((factor) => factor.id == fiData.factorID).factor;
      if(factorName.length > 32){
        factorName = factorName.substr(0, 32) + '...';
      }

      this.labels.push(factorName);
      this.data.push(fiData.impact);
      
    });

    this.datasets = [{
      data: this.data,
      label: 'Impact'
    }];

    this.showChart = true;
    
  }

  promptRequestNewResults(){
    this.reportRequestService.requestNewReportForType(ReportType.FactorImpact)
    .subscribe((result: boolean) => {
      if(result){
        this.canRequest = false;
      }
    });
  }

}

export class FactorImpactData{
  factorID: number;
  impact: number;
  constructor(f,i){
    this.factorID = f;
    this.impact = i;
  }
}