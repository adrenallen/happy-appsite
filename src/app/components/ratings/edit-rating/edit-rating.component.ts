import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RatingWithFactorsDTO } from '../../../dtos/rating-with-factors-dto';
import { HappyApiService } from '../../../services/happy-api.service';
import { RatingFactorDTO } from '../../../dtos/rating-factor-dto';
import { FactorType } from '../../../enums/factor-type.enum';
import { RatingDTO } from '../../../dtos/rating-dto';
import { forkJoin } from 'rxjs';
import { IdListDTO } from '../../../dtos/id-list-dto';
import { RatingFactorsDTO } from '../../../dtos/rating-factors-dto';
import { HappyDialogService } from '../../../services/happy-dialog.service';
import { ButtonOptionDTO } from '../../../dtos/button-option-dto';
import { FactorFormDTO, FactorFormComponent } from 'src/app/components/factors/factor-form/factor-form.component';
import { FactorAspectDTO } from 'src/app/dtos/factor-aspect-dto';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RatingsService } from '../ratings.service';
import { FactorsService } from '../../factors/factors.service';

@Component({
  selector: 'hpy-edit-rating',
  templateUrl: './edit-rating.component.html',
  styleUrls: ['./edit-rating.component.scss']
})
export class EditRatingComponent implements OnInit {

  public factors : any;
  public negativeRatingFactors : Array<RatingFactorDTO>;
  public positiveRatingFactors : Array<RatingFactorDTO>;
  public rating : RatingDTO;
  public factorTypes = FactorType;

  public ogNegativeRatingFactors : Array<RatingFactorDTO>;
  public ogPositiveRatingFactors : Array<RatingFactorDTO>;
  public ogRating : RatingDTO;

  public showLoadingCard: boolean = true;

  public factorAspects: FactorAspectDTO[];

  private initialRatingWithFactors : RatingWithFactorsDTO;

  constructor(private happyAPIService: HappyApiService, 
    private _dialogService: HappyDialogService,
    private route : ActivatedRoute,
    private router: Router,
    private ratingsService: RatingsService,
    private factorsService: FactorsService) {

    let ratingID = +this.route.snapshot.params['id'];

    forkJoin(
      factorsService.getAllFactors(),
      factorsService.getAllFactorAspects(),
      ratingsService.getRatingWithFactors(ratingID)
    ).subscribe((results: [any, FactorAspectDTO[], RatingWithFactorsDTO])=> {
      this.factors = results[0].factors; 
      this.factorAspects = results[1];
      this.initialRatingWithFactors = results[2];
      this.rating = this.initialRatingWithFactors.rating;
      this.initEditorValuesFromData(this.initialRatingWithFactors);
    },  error => {
      console.log("Error: ", error);
    });
    
  }

  ngOnInit() {
  }

  public updateRating(){
    let ratingFactorsToDelete = Array<RatingFactorDTO>();
    let ratingFactorsToCreate = Array<RatingFactorDTO>();
    let ratingFactorsToUpdate = Array<RatingFactorDTO>();
    let updateRating : boolean = this.ogRating.rating != this.rating.rating || this.ogRating.journalEntry != this.rating.journalEntry;


    //find what factors are no longer in the lists
    ratingFactorsToDelete = this.ogNegativeRatingFactors.filter(o => !this.negativeRatingFactors.some(n => n.id == o.id));
    ratingFactorsToDelete = ratingFactorsToDelete.concat(this.ogPositiveRatingFactors.filter(o => !this.positiveRatingFactors.some(n => n.id == o.id)));

    
    ratingFactorsToUpdate = this.negativeRatingFactors.filter(f => f.id > 0);
    ratingFactorsToUpdate = ratingFactorsToUpdate.concat(this.positiveRatingFactors.filter(f => f.id > 0));
    
    ratingFactorsToCreate = this.negativeRatingFactors.filter(f => f.id < 1);
    ratingFactorsToCreate = ratingFactorsToCreate.concat(this.positiveRatingFactors.filter(f => f.id < 1));

    let observables = [];

    if(updateRating){
      let ratingDTO = { ...this.initialRatingWithFactors.rating };
      ratingDTO.rating = this.rating.rating;
      ratingDTO.journalEntry = this.rating.journalEntry;
      
      observables.push(this.ratingsService.updateRating(ratingDTO));
    }

    //delete rating facotrs
    if(ratingFactorsToDelete.length > 0){
      observables.push(this.ratingsService.deleteRatingFactors(new IdListDTO(ratingFactorsToDelete.map(r => r.id))));
    }

    if(ratingFactorsToUpdate.length > 0){
      
      //Set the factor aspect id to save it
      ratingFactorsToUpdate.forEach(f => f.factorAspectID = f.factorAspect.id);

      //update existing rating factors
      observables.push(this.ratingsService.updateRatingFactors(new RatingFactorsDTO(ratingFactorsToUpdate)));
    }

    if(ratingFactorsToCreate.length > 0){
      ratingFactorsToCreate.forEach(r => r.ratingID = this.initialRatingWithFactors.rating.id);
      //create rating factors
      observables.push(this.ratingsService.saveNewRatingFactors(new RatingFactorsDTO(ratingFactorsToCreate)));
    }
    
    if(observables.length > 0){
      forkJoin(observables).subscribe(
        (results) => {
          this._dialogService.openNewSuccessDialog("Rating updated!", "Rating updated successfully!")
            .afterClosed().subscribe((result) => {
              this.backToDashboard();
            });
          },
        (error) => { 
          this._dialogService.openNewErrorDialog("Something happened!", "An error occurred! Please try again or contact support!");
          console.error(error); 
        }
      );
    }else{
      this._dialogService.openNewSuccessDialog("Rating updated!", "Rating updated successfully!")
          .afterClosed().subscribe((result) => {
            this.backToDashboard();
          });
    }
  }

  public confirmDeleteRating(){
    this._dialogService.openPromptDialog("Delete rating",
     "Are you sure you want to delete this rating?").beforeClose().subscribe((result:ButtonOptionDTO) => {
        if(result != null && result.value == true){
          //delete
          this._dialogService.showLoadingDialog();
          this.ratingsService.deleteRating(this.rating.id).subscribe((result) => {
            this._dialogService.hideLoadingDialog();
            this._dialogService.openNewSuccessDialog("Success", "Rating deleted!")
              .afterClosed().subscribe((result) => {
                this.backToDashboard();
              });
          }, (error) => {
           this._dialogService.hideLoadingDialog();
           this._dialogService.openNewErrorDialog(null, error); 
          });
        }
     });
  }

  private initEditorValuesFromData(ratingData: RatingWithFactorsDTO){
    this.negativeRatingFactors = ratingData.ratingFactors.filter(r => r.factorTypeID == FactorType.Negative);
    this.positiveRatingFactors = ratingData.ratingFactors.filter(r => r.factorTypeID == FactorType.Positive);

    this.rating.rating = ratingData.rating.rating;

    //Save copy of original so we know what actions to take on save
    this.ogNegativeRatingFactors = [...this.negativeRatingFactors];
    this.ogPositiveRatingFactors = [...this.positiveRatingFactors];
    this.ogRating =  {...this.rating};

    this.showLoadingCard = false;
  }

  public openNewFactorDialog(isPositiveFactorStep: boolean) {
    let dialogWidth = '30%';
    if (window.innerWidth < 640) {
      dialogWidth = '90%';
    }

    const newFactorDialogRef = this._dialogService.dialog.open(FactorFormComponent, {
      width: dialogWidth,
      data: new FactorFormDTO(this.factors, this._dialogService)
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

  public backToDashboard() {
    this.router.navigate(['/main/dashboard'], { relativeTo: this.route });
  }
}
