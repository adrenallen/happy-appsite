export class ButtonOptionDTO {
    label: string;
    value : any;
    color : string;

    constructor(label: string, value: any, color?:string){
        this.label = label;
        this.value = value;
        if(color != null){
            this.color = color;
        }else{
            this.color = "primary";
        }
    }
}

