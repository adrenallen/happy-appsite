export class UserReminderSetting {
    id: number;
    userID: number;
    reminderTime: number;
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    email: boolean;
    push: boolean;
    sms: boolean;

    constructor(){
        this.sunday = false;
        this.monday = true;
        this.tuesday = true;
        this.wednesday = true;
        this.thursday = true;
        this.friday = true;
        this.saturday = false;
        this.email = false;
        this.push = true;
        this.sms = false;
        this.reminderTime = 24;
    }
}