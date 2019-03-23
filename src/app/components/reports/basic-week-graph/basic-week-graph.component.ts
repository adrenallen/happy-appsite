import { Component, OnInit } from '@angular/core';
import { HappyApiService } from '../../../services/happy-api.service';
import { RatingWithFactorsDTO } from '../../../dtos/rating-with-factors-dto';
import { HappyDialogService } from '../../../services/happy-dialog.service';
import * as moment from 'moment-timezone';
import { RatingsService } from '../../ratings/ratings.service';

@Component({
  selector: 'hpy-basic-week-graph',
  templateUrl: './basic-week-graph.component.html',
  styleUrls: ['./basic-week-graph.component.scss']
})
export class BasicWeekGraphComponent implements OnInit {


  public ratingsWithRatingFactors : Array<RatingWithFactorsDTO>;
  public filterStartDate : Date;
  public filterEndDate : Date;

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartLegend:boolean=true;
  public lineChartType:string = 'line';

  constructor(private happyAPIService: HappyApiService, private happyDialogs: HappyDialogService,
    private ratingsService: RatingsService) { }

  ngOnInit() {
    //TODO - make these date pickers
    this.filterStartDate = new Date();
    this.filterEndDate = new Date(); 
    this.filterStartDate.setDate(this.filterEndDate.getDate() - 7);
    this.filterEndDate.setDate(this.filterEndDate.getDate() + 1);
    this.updateDataWithNewDates();
  }

  public updateDataWithNewDates(){
    this.lineChartData = [];
    this.lineChartLabels = [];

    this.ratingsService.getRatingsWithFactors(this.filterStartDate, this.filterEndDate).subscribe(
      (result) => {
        this.ratingsWithRatingFactors = <Array<RatingWithFactorsDTO>>result;
        
        this.getLineChartLabelsFromRatingsWithFactors(this.ratingsWithRatingFactors);

        //build new 
      },
      (error) => {
        this.happyDialogs.openNewErrorDialog(null, error.errorMessage);
      }
    );
  }

  private getLineChartLabelsFromRatingsWithFactors(ratingsWithRatingFactors:Array<RatingWithFactorsDTO>) {
    let returnArray = [];

    let returnDataSeries = {data: [], label: 'Rating Averages'};

    let dayTotalCounts = [];
    let daySums = [];

    ratingsWithRatingFactors.sort((a,b) => {
      let dateA = new Date(a.rating.createdDatetime);
      let dateB = new Date(b.rating.createdDatetime);
      return dateA.getTime() - dateB.getTime();
    })

    ratingsWithRatingFactors.forEach(f => {
      let dateObj = new Date(f.rating.createdDatetime);
      let shortHandDate = moment(dateObj).format("MM/DD");
      if(!returnArray.some( r => r == shortHandDate)){
        returnArray.push(shortHandDate);
      }

      if(dayTotalCounts[shortHandDate] == null){
        dayTotalCounts[shortHandDate] = 1;
      }else{
        dayTotalCounts[shortHandDate] += 1;
      }
      if(daySums[shortHandDate] == null){
        daySums[shortHandDate] = f.rating.rating;
      }else{
        daySums[shortHandDate] += f.rating.rating;
      }

    });

    for(let day of returnArray){
      returnDataSeries.data.push(daySums[day]/dayTotalCounts[day]);
    }

    this.lineChartData.push(returnDataSeries);

    this.lineChartLabels = returnArray;
  }  

}
