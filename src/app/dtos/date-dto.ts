import * as moment from 'moment-timezone';
export class DateDTO {
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
    second: number;
    nanosecond: number;
    timezone: string;

    constructor(){}
    public buildFromValues(month: number, day: number, year: number, hour: number, minute: number, second: number, timezone: string){
        this.month = month;
        this.day = day;
        this.year = year;
        this.hour = hour;
        this.minute = minute;
        this.second = second;
        this.timezone = timezone;
    }

    public buildFromDate(dateObj: Date, timezone: string){
        this.month = dateObj.getMonth()+1;
        this.day = dateObj.getDate();
        this.year = dateObj.getFullYear();
        this.hour = dateObj.getHours();
        this.minute = dateObj.getMinutes();
        this.second = dateObj.getSeconds();
        this.nanosecond = dateObj.getMilliseconds()*1000000;
        this.timezone = timezone;
    }

    public getDateObject() : Date{
        return new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.nanosecond/1000000);
    }

    public buildFromDateString(dateString: string) : void{
        const dateObj = new Date(dateString);
        this.buildFromDate(dateObj, moment.tz.guess());
    }

}
