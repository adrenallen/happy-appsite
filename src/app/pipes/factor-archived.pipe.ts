import { Pipe, PipeTransform } from '@angular/core';
import { FactorDTO } from '../dtos/factor-dto';

@Pipe({
  name: 'factorArchived'
})
export class FactorArchivedPipe implements PipeTransform {

  transform(factors: Array<FactorDTO>, archived: boolean): any {
    if(factors != null){
      return factors.filter(f => f.archived == archived);
    }else{
      return factors;
    }
  }

}
