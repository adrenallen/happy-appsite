import { RatingWithFactorsDTO } from "./rating-with-factors-dto";

export class EditRatingDialogDTO{
    ratingData: RatingWithFactorsDTO;
    factorsPopup: any;
  
    constructor(ratingData,factorsPopup){
      this.ratingData = ratingData;
      this.factorsPopup = factorsPopup;
    }
  }