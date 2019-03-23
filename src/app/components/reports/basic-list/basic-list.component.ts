import { Component, OnInit, Input } from '@angular/core';
import { RatingWithFactorsDTO } from '../../../dtos/rating-with-factors-dto';
import { HappyApiService } from '../../../services/happy-api.service';
import { HappyDialogService } from '../../../services/happy-dialog.service';
import { HappyIconService } from '../../../services/happy-icon.service';
import { RatingFactorDTO } from 'src/app/dtos/rating-factor-dto';
import { Router } from '@angular/router';
import { RatingsService } from '../../ratings/ratings.service';

@Component({
  selector: 'hpy-basic-list',
  templateUrl: './basic-list.component.html',
  styleUrls: ['./basic-list.component.scss']
})
export class BasicListComponent implements OnInit {

  constructor(private happyAPIService: HappyApiService, private happyDialogs: HappyDialogService, private happyIconService: HappyIconService, private router: Router,
    private ratingsService: RatingsService) { }

  public ratingsWithRatingFactors : Array<RatingWithFactorsDTO>;
  public filterStartDate : Date;
  public filterEndDate : Date;
  public datePickerSettings = {
    timePicker: true,
    format: 'short',
    closeOnSelect: false
  };
  public dataLoaded : boolean = false;


  ngOnInit() {
    //TODO - make these date pickers
    let startDate = new Date();
    let endDate = new Date(); 
    startDate.setDate(endDate.getDate() - 7);
    startDate.setHours(0,0,0);
    endDate.setHours(23,59,59);

    this.filterStartDate = startDate;
    this.filterEndDate = endDate;

    this.getDataForList();
  }

  public getIconNameForRating(rating) : string{
    return this.happyIconService.getRatingFaceIconNameFromRating(rating);
  }

  public editRating(rating : RatingWithFactorsDTO){
    this.router.navigate(['/main/editrating', rating.rating.id]);
  }

  public getRatingFactorRowText(ratingFactor: RatingFactorDTO):string{
    return ratingFactor.factor.factor +
        ((ratingFactor.factorAspect.id > 0) ? " - " + ratingFactor.factorAspect.factorAspect : "");
  }

  public updateDataWithNewDates(){
    this.getDataForList();
  }

  private getDataForList(){
    this.ratingsService.getRatingsWithFactors(this.filterStartDate, this.filterEndDate).subscribe(
      (result) => {
        this.ratingsWithRatingFactors = <Array<RatingWithFactorsDTO>>result;
        if(this.ratingsWithRatingFactors.length > 0){
          this.ratingsWithRatingFactors.sort((a,b) => {
            const aDate = new Date(a.rating.createdDatetime);
            const bDate = new Date(b.rating.createdDatetime);
            return bDate.valueOf()-aDate.valueOf();
          });
        }
        this.dataLoaded = true;
      },
      (error) => {
        this.happyDialogs.openNewErrorDialog(null, error.errorMessage);
      }
    );
  }
}
