import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { FactorType } from '../../../enums/factor-type.enum';
import { MatSnackBar, MatIconRegistry } from '@angular/material';
import { RatingFactorDTO } from '../../../dtos/rating-factor-dto';
import { DomSanitizer } from '@angular/platform-browser';
import { FactorDTO } from '../../../dtos/factor-dto';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { FactorAspectDTO } from 'src/app/dtos/factor-aspect-dto';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { HappyFeatureService } from 'src/app/services/happy-feature.service';
import { HappyStringService } from 'src/app/services/happy-string.service';

@Component({
  selector: 'hpy-rating-factors-form',
  templateUrl: './rating-factors-form.component.html',
  styleUrls: ['./rating-factors-form.component.scss']
})
export class RatingFactorsFormComponent implements OnInit {

  @Input() public factorType: FactorType;
  @Input() public factors: Array<any> = [];
  @Input() public factorAspects: Array<FactorAspectDTO> = [];
  @Input() public ratingFactors: Array<RatingFactorDTO>;
  @Input() public ratingID: number;

  public selectedFactor: number;

  constructor(private snackBar : MatSnackBar,
     private iconRegistry: MatIconRegistry,
     private sanitizer: DomSanitizer,
     private dialogService: HappyDialogService,
     private featureService : HappyFeatureService,
     private stringService : HappyStringService) {
    iconRegistry.addSvgIcon('delete_icon',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-delete-24px.svg'));
    iconRegistry.addSvgIcon('arrow_up_icon',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-arrow_upward-24px.svg'));
    iconRegistry.addSvgIcon('arrow_down_icon',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-arrow_downward-24px.svg'));

  }

  ngOnInit() {
    if(this.ratingFactors == null){
      this.ratingFactors = [];
    }
    this.rerankRatingFactors();
  }

  public itemMoveDrop(event : CdkDragDrop<Array<RatingFactorDTO>>){
    moveItemInArray(this.ratingFactors, event.previousIndex, event.currentIndex);
    this.assignFactorRanksByIndex();
  }

  public addSelectedFactor(){
    if(this.selectedFactor < 0 || this.selectedFactor == null){
      this.snackBar.open("You must select a factor to add one", null, {duration: 3500});
    }else if(this.doesFactorExistInRatingFactors(this.selectedFactor)){
      this.snackBar.open("You cannot add a factor more than once!", null, {duration: 3500});
    }else{
      this.addFactorToRatingFactors(this.selectedFactor);
      this.selectedFactor = null;
      //add the factor and reset the drop
    }
  }
  
  public getFactorNameFromType(factorType :FactorType) :string{
    switch(factorType){
      case FactorType.Positive:
        return "Positive";
      case FactorType.Negative:
        return "Negative";
      default:
        return "";
    }
  }

  public getRatingFactorRowText(ratingFactor: RatingFactorDTO) : string{
      return this.findFactorNameByFactorID(ratingFactor.factor.id) + 
        ((ratingFactor.factorAspect.id > 0) ? ' - ' : '') +
        this.findFactorAspectNameByFactorAspectID(ratingFactor.factorAspect.id);
  }

  public openFactorAspectSelectForRating(ratingFactor: RatingFactorDTO, factorAspect: FactorAspectDTO){
    const fullFactor = this.factors.find(f => f.id == ratingFactor.factor.id);
    
    let allFactorAspects = this.factorAspects.filter(f => f.factorID == fullFactor.id);
    let availableAspects = allFactorAspects.filter(f => !this.ratingFactors.some(r => r.factorAspect != null && r.factorAspect.id == f.id) || f.id == factorAspect.id);
    let factorAspectID = null;

    let allowNoneOption = true;
    if(factorAspect != null){
      factorAspectID = factorAspect.id;
      
      //if we have this factor on the page with no aspect then dont allow them to select none as the aspect)
      allowNoneOption = !this.ratingFactors.some(r => r.factor.id == ratingFactor.factor.id && !(r.factorAspect.id > 0) && r != ratingFactor);
    }

    this.dialogService.openSelectFactorAspectDialog(availableAspects, fullFactor, allFactorAspects, factorAspectID, allowNoneOption).beforeClose()
      .subscribe((result: FactorAspectDTO) => {
        if(result != null){
          ratingFactor.factorAspectID = result.id;
          ratingFactor.factorAspect = result;
          //if we dont have this aspect already, add to our list
          if(!this.factorAspects.some(f => f.id == result.id)){
            this.factorAspects.push(result);
            this.factorAspects.sort((a, b) => {
              return a.factorAspect > b.factorAspect ? 1 : -1;
            })
          }
        }
      });
  }

  private addFactorToRatingFactors(factorID){
    let newRatingFactor = new RatingFactorDTO(0, factorID, this.factorType, this.ratingFactors.length + 1);
    newRatingFactor.factor = new FactorDTO();
    newRatingFactor.factor.id = factorID;
    newRatingFactor.factorAspect = new FactorAspectDTO();
    this.ratingFactors.push(newRatingFactor);
    this.ratingFactors = this.ratingFactors;
  }

  private doesFactorExistInRatingFactors(factorID){
    return this.ratingFactors.some(r => r.factor.id == factorID && !(r.factorAspect.id > 0));
  }

  public factorsNotInRating() : Array<any>{
    if(this.factors == null || this.factors.length < 1) return [];

    return this.factors.filter(f => !this.ratingFactors.some(r => r.factor.id == f.id && !(r.factorAspect.id > 0)));
  }

  public findFactorNameByFactorID(factorID) : string{
    let factor = this.factors.find(f => f.id == factorID);
    if(factor != null && factor.factor != null) return this.stringService.decodeHTMLEntities(factor.factor);
    return null;
  }

  public findFactorAspectNameByFactorAspectID(factorAspectID) : string{
    let factorAspect = this.factorAspects.find(f => f.id == factorAspectID);
    if(factorAspect != null && factorAspect.factorAspect != null) return this.stringService.decodeHTMLEntities(factorAspect.factorAspect);
    return "";
  }

  public changeRankOfRatingFactor(ratingFactor: RatingFactorDTO, rankChange: number){
    let toReplaceRatingFactor = this.ratingFactors.find(f => f.rank == ratingFactor.rank+rankChange);
    if(toReplaceRatingFactor != null){
      toReplaceRatingFactor.rank = ratingFactor.rank;
      ratingFactor.rank += rankChange;
    }
    this.rerankRatingFactors();
  }

  public removeRatingFactor(ratingFactor:RatingFactorDTO){
    const idx = this.ratingFactors.findIndex(f => f == ratingFactor);
    this.ratingFactors.splice(idx,1);
    this.rerankRatingFactors();
  }

  private rerankRatingFactors(){
    this.ratingFactors.sort((a: RatingFactorDTO, b: RatingFactorDTO) => {
      return a.rank - b.rank;
    });

    let newRank = 1;
    this.ratingFactors.forEach(f => {
      f.rank = newRank++;
    });
  }

  private assignFactorRanksByIndex(){
    let newRank = 1;
    this.ratingFactors.forEach(f => {
      f.rank = newRank++;
    });
  }

}

