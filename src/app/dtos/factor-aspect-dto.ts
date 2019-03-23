export class FactorAspectDTO {
    id: number;
    factorID: number;
    factorAspect: string;
    archived: boolean;

    constructor(){
        this.factorAspect = "";
        this.archived = false;
    }
}
