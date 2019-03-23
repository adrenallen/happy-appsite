import { RatingDTO } from "./rating-dto";
import { RatingFactorDTO } from "./rating-factor-dto";

export class RatingWithFactorsDTO {
    public rating : RatingDTO;
    public ratingFactors: Array<RatingFactorDTO>;
}
