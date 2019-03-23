import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HappyApiService } from 'src/app/services/happy-api.service';

import * as moment from 'moment-timezone';
import { Observable, Subject } from 'rxjs';
import { UserReminderSetting } from 'src/app/dtos/user-reminder-setting';

@Injectable({
  providedIn: 'root'
})
export class RemindersService extends HappyApiService {

  private readonly MAX_DAY_INTERVAL: number = 47;
  private readonly MAX_DAY_INTERVAL_ADJUSTMENT: number = 48;  //how much to adjust when fitting today

  private timeOffsetInMinutes: number;

  constructor(http: HttpClient, cookieService: CookieService) {
    super(http, cookieService);

    //get the time offset in minutes for the timezone
    this.timeOffsetInMinutes = moment.tz(moment.tz.guess()).utcOffset();
  }

  private _timeOptionsCache: Array<SelectOptionDTO>;
  public getTimeOptions(): Array<SelectOptionDTO> {

    if (this._timeOptionsCache != null) return this._timeOptionsCache;

    let options = new Array<SelectOptionDTO>();

    let startOfDay = moment().startOf('day');
    options.push(new SelectOptionDTO(0, startOfDay.format('h:mm a')));
    for (let i = 1; i <= this.MAX_DAY_INTERVAL; i++) {
      options.push(new SelectOptionDTO(i, startOfDay.add(30, 'minutes').format('h:mm a')));
    }

    this._timeOptionsCache = options;//save this in cache so we only calc 1 time

    return options.reverse();
  }

  //Converts time of day to timezone from UTC
  public convertTimeOfDayFromUTC(tod: number): number {
    tod = tod + (this.timeOffsetInMinutes / 30);
    return this.fitTimeOfDayToInterval(tod);
  }

  //Converts time of day from timezone to UTC
  public convertTimeOfDayToUTC(tod: number): number {
    tod = tod - (this.timeOffsetInMinutes / 30);
    return this.fitTimeOfDayToInterval(tod);
  }

  //fits time of day to the intervals in a day
  //this is recursive so that it will always correct
  private fitTimeOfDayToInterval(tod: number): number {
    if (tod < 0) {
      return this.fitTimeOfDayToInterval(tod + this.MAX_DAY_INTERVAL_ADJUSTMENT);
    } else if (tod > this.MAX_DAY_INTERVAL) {
      return this.fitTimeOfDayToInterval(tod - this.MAX_DAY_INTERVAL_ADJUSTMENT);
    }
    return tod;
  }

  public getAllReminderSettings(): Observable<Object> {
    let stream = new Subject<Array<UserReminderSetting>>();

    this.getAllReminderSettingsAsUTC().subscribe(
      (results: Array<UserReminderSetting>) => {
        results.forEach(result => result.reminderTime = this.convertTimeOfDayFromUTC(result.reminderTime));
        stream.next(results);
      },
      (error) => { stream.error(error); }
    );

    return stream;
  }

  public updateReminderSettings(settings: Array<UserReminderSetting>) : Observable<Object>{
    let convertedSettings = this.convertSettingsToUTC(settings);
    return super.postAndInjectGUID('/notifications/updateall', {'settings': convertedSettings});
  }

  public deleteReminderSettings(settings: Array<UserReminderSetting>) : Observable<Object>{
    let convertedSettings = this.convertSettingsToUTC(settings);
    return super.postAndInjectGUID('/notifications/deleteall', {'settings': convertedSettings});
  }

  //Converts the provided settings to an expected UTC timezone
  private convertSettingsToUTC(settings: Array<UserReminderSetting>): Array<UserReminderSetting>{
    let newSettings = new Array<UserReminderSetting>();
    
    settings.forEach((setting) => {
      let newSetting = {...setting};
      newSetting.reminderTime = this.convertTimeOfDayToUTC(newSetting.reminderTime);
      newSettings.push(newSetting);
    });

    return newSettings;
  }

  private getAllReminderSettingsAsUTC(): Observable<Object> {
    return super.postAndInjectGUID('/notifications/getall', {});
  }

}

export class SelectOptionDTO {
  public value: any;
  public label: string;
  constructor(value: any, label: string) {
    this.value = value;
    this.label = label;
  }
}