import { Pipe, PipeTransform } from '@angular/core';
import { FactorAspectDTO } from '../dtos/factor-aspect-dto';

@Pipe({
  name: 'factorAspectArchived'
})
export class FactorAspectArchivedPipe implements PipeTransform {

  transform(factorAspects: Array<FactorAspectDTO>, archived: boolean): any {
    if(factorAspects != null){
      return factorAspects.filter(f => f.archived == archived);
    }else{
      return factorAspects;
    }
  }

}
