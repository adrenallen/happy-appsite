import { Pipe, PipeTransform } from '@angular/core';
import { RatingFactorDTO } from '../dtos/rating-factor-dto';

@Pipe({
  name: 'ratingFactorOrderByRank',
  pure:false
})
export class RatingFactorOrderByRankPipe implements PipeTransform {

  transform(ratingFactors: Array<RatingFactorDTO>):Array<RatingFactorDTO>{
    ratingFactors.sort((a: RatingFactorDTO, b: RatingFactorDTO) => {
      return a.rank-b.rank;
    });

    return ratingFactors.filter(f => f.factor.id != null);
  }

}
