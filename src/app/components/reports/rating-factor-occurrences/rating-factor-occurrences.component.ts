import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { FactorToRatingOccurrenceDTO } from 'src/app/dtos/factor-to-rating-occurrence-dto';
import { FactorDTO } from 'src/app/dtos/factor-dto';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { FactorType } from 'src/app/enums/factor-type.enum';
import { ReportsService } from '../reports.service';
import { FactorsService } from '../../factors/factors.service';
import { RelatedFactorsToRatingsChartDTO } from 'src/app/dtos/related-factors-to-ratings-chart-dto';

@Component({
  selector: 'hpy-rating-factor-occurrences',
  templateUrl: './rating-factor-occurrences.component.html',
  styleUrls: ['./rating-factor-occurrences.component.scss']
})
export class RatingFactorOccurrencesComponent implements OnInit {

  public chartData: Array<RelatedFactorsToRatingsChartDTO> = new Array<RelatedFactorsToRatingsChartDTO>();
  public activeChartRating: number = 3;
  public factorTypes = FactorType;
  public factors : Array<FactorDTO>;
  public ratingOptions = [1,2,3,4,5];
  public showCharts = false;
  public showPositiveLegend = false;
  public showNegativeLegend = false;

  constructor(private apiService: HappyApiService, private reportService: ReportsService, private dialogService: HappyDialogService,
    private factorsService: FactorsService) { 
  }

  ngOnInit() {
    this.factorsService.getAllFactors().subscribe((result:any) => {
      this.factors = result.factors;
    },
    (error) => {
      console.error(error);
    },  
    () => {
      this.getReportData();
    });
    
  }

  public getFactorDataForRating(rating : number, factorType: FactorType) : number[]{
    let data = this.chartData.find(c => c.factorType == factorType && c.rating == rating);
    if(data == null){
      return [1];
    }
    return data.data;
  }

  public getFactorLabelsForRating(rating : number, factorType: FactorType) : string[]{
    let data = this.chartData.find(c => c.factorType == factorType && c.rating == rating);
    if(data == null){
      return ["No entries"];
    }
    return data.labels;
  }

  public selectRating(rating){
    this.activeChartRating = rating;
    this.refreshCharts();
  }
  //This is super bad, it is forcing the charts to refresh when we 
  //pick a new number since change detection isn't working right :(
  public refreshCharts(){
    this.showCharts = false;
    setTimeout(() => {this.showCharts = true;}, 10);
  }

  private getReportData(){
    this.reportService.getReportFactorToRatingOccurrences().subscribe((result: Array<FactorToRatingOccurrenceDTO>) => {
      result.forEach(r => {
        let existingDTO = this.chartData.find(c => c.factorType == <FactorType>r.factorTypeID && c.rating == r.rating);
        if(existingDTO){
          existingDTO.data.push(r.occurrences);
          existingDTO.labels.push(this.factors.find(f => f.id == r.factorID).factor)
        }else{
          let newDTO = new RelatedFactorsToRatingsChartDTO();
          newDTO.factorType = r.factorTypeID;
          newDTO.rating = r.rating;

          newDTO.data = [r.occurrences];
          newDTO.labels = [this.factors.find(f => f.id == r.factorID).factor];
          
          this.chartData.push(newDTO);
        }

      });

      this.showCharts = true;
      
    });
  }

}
