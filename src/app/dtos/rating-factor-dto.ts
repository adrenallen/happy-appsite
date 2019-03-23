import { FactorDTO } from "./factor-dto";
import { FactorAspectDTO } from "./factor-aspect-dto";

export class RatingFactorDTO {
    id : number;
    ratingID: number;
    factorID: number;
    rank: number;
    factorTypeID: number;
    factor?: FactorDTO;
    factorAspectID: number;
    factorAspect? : FactorAspectDTO;

    constructor(id: number, factorID: number, factorTypeID: number, rank :number){
        this.id = id;
        this.factorID = factorID;
        this.factorTypeID = factorTypeID;
        this.rank = rank;
        
        this.factor = new FactorDTO();
        this.factor.id = this.factorID;

        this.factorAspect = new FactorAspectDTO();
    }
}
