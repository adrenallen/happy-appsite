import { Pipe, PipeTransform } from '@angular/core';
import { RatingFactorDTO } from '../dtos/rating-factor-dto';
import { FactorType } from '../enums/factor-type.enum';

@Pipe({
  name: 'ratingFactorsFilterByType'
})
export class RatingFactorsFilterByTypePipe implements PipeTransform {

  transform(ratingFactors: Array<RatingFactorDTO>, factorTypeID: FactorType):Array<RatingFactorDTO>{

    ratingFactors = ratingFactors.filter(f => f.factorTypeID == factorTypeID);
    ratingFactors.sort((a: RatingFactorDTO, b: RatingFactorDTO) => {
      return a.rank-b.rank;
    });

    return ratingFactors;
  }

}
