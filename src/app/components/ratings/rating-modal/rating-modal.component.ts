import { Component, OnInit } from '@angular/core';
import { FactorType } from '../../../enums/factor-type.enum';
import { HappyApiService } from '../../../services/happy-api.service';
import { RatingDTO } from '../../../dtos/rating-dto';
import { Observable, forkJoin } from 'rxjs';
import { RatingFactorDTO } from '../../../dtos/rating-factor-dto';
import { RatingFactorsDTO } from '../../../dtos/rating-factors-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { FactorFormComponent, FactorFormDTO } from '../../factors/factor-form/factor-form.component';
import { HappySecurityService } from '../../../services/happy-security.service';
import { HappyDialogService } from '../../../services/happy-dialog.service';
import { FactorAspectDTO } from 'src/app/dtos/factor-aspect-dto';
import { RatingsService } from '../ratings.service';
import { FactorsService } from '../../factors/factors.service';

@Component({
  selector: 'hpy-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss']
})
export class RatingModalComponent implements OnInit {

  public factorTypes: any = FactorType;

  public factors: any;
  public factorAspects: Array<FactorAspectDTO>;
  public negativeRatingFactors: Array<RatingFactorDTO> = [];
  public positiveRatingFactors: Array<RatingFactorDTO> = [];
  public rating: RatingDTO;

  public showLoadingCard: boolean = false;

  constructor(private happyAPIService: HappyApiService,
     private router: Router,
     private happyDialogService: HappyDialogService,
     private route: ActivatedRoute,
     private ratingsService: RatingsService,
     private factorsService: FactorsService) {

    this.rating = new RatingDTO();
    this.rating.rating = 3;

    factorsService.getAllFactors().subscribe(
      (result: any) => { this.factors = result.factors; },
      (error: any) => { console.log("Error: ", error); }
    );

    factorsService.getAllFactorAspects().subscribe(
      (result: Array<FactorAspectDTO>) => { this.factorAspects = result;},
      (error: any) => { console.log("Error: ", error); }
    );
  }

  ngOnInit() {

  }

  public submitRating() {

    this.showLoadingCard = true;

    let ratingToSave = new RatingDTO();

    ratingToSave.rating = this.rating.rating;
    ratingToSave.createdDatetime = this.rating.createdDatetime;
    ratingToSave.journalEntry = this.rating.journalEntry;

    this.ratingsService.saveNewRating(ratingToSave).subscribe(
      (result: any) => {
        //result.id is the new rating id

        //update all the rating factors with the new id
        this.positiveRatingFactors.forEach((f, idx, ratingFactors) => ratingFactors[idx].ratingID = result.id);
        this.negativeRatingFactors.forEach((f, idx, ratingFactors) => ratingFactors[idx].ratingID = result.id);

        forkJoin(
          this.ratingsService.saveNewRatingFactors(new RatingFactorsDTO(this.positiveRatingFactors)),
          this.ratingsService.saveNewRatingFactors(new RatingFactorsDTO(this.negativeRatingFactors))
        ).subscribe(results => {
          this.showLoadingCard = false;
          this.happyDialogService.openNewSuccessDialog(null, "Rating recorded!").beforeClose().subscribe(() => { this.backToDashboard(); });
        },
          error => {
            this.happyDialogService.openNewErrorDialog(null, error);
          });


      },
      (error: any) => {
        this.happyDialogService.openNewErrorDialog(null, error);
      }
    );
  }

  public backToDashboard() {
    this.router.navigate(['/main/dashboard'], { relativeTo: this.route });
  }

  public openNewFactorDialog(isPositiveFactorStep: boolean) {
    let dialogWidth = '30%';
    if (window.innerWidth < 640) {
      dialogWidth = '90%';
    }

    const newFactorDialogRef = this.happyDialogService.dialog.open(FactorFormComponent, {
      width: dialogWidth,
      data: new FactorFormDTO(this.factors, this.happyDialogService)
    });

    newFactorDialogRef.afterClosed().subscribe(result => {
      //if we got a result then add that to our existing list
      if (result != null && result != "") {

        this.factors.push(result);
        this.factors = this.factors;

        if (isPositiveFactorStep) {
          this.positiveRatingFactors.push(new RatingFactorDTO(0, result.id, this.factorTypes.Positive, this.positiveRatingFactors.length + 1));
        } else {
          this.negativeRatingFactors.push(new RatingFactorDTO(0, result.id, this.factorTypes.Negative, this.negativeRatingFactors.length + 1));
        }
      }
    });


  }
}
