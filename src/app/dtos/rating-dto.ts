import { DateDTO } from "./date-dto";

export class RatingDTO {
    id:  number;
    date : DateDTO; //this is what we send to the api
    rating : number;
    createdDatetime? : string;  //this is what we get back from the api
    journalEntry? : string;
}
