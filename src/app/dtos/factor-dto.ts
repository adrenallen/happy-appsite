export class FactorDTO {
    id: number;
    userID: number;
    factor: string;
    archived: boolean;

    constructor(factor?: string){
        if(factor != null){
            this.factor = factor;
        }else{
            this.factor = "";
        }
        this.archived = false;
    }
}
