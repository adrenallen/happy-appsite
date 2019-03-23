import { RatingFactorDTO } from "./rating-factor-dto";

export class RatingFactorsDTO {
    ratingFactors: Array<RatingFactorDTO>

    constructor(ratingFactors: Array<RatingFactorDTO>){
        this.ratingFactors = ratingFactors;
    }
}
