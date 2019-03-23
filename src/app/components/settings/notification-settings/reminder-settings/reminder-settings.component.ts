import { Component, OnInit } from '@angular/core';
import { HappyIconService } from 'src/app/services/happy-icon.service';
import { RemindersService, SelectOptionDTO } from './reminders.service';
import { UserReminderSetting } from 'src/app/dtos/user-reminder-setting';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'hpy-reminder-settings',
  templateUrl: './reminder-settings.component.html',
  styleUrls: ['./reminder-settings.component.scss']
})
export class ReminderSettingsComponent implements OnInit {
  private ogReminderSettings : Array<UserReminderSetting>;
  public reminderSettings : Array<UserReminderSetting>;
  private deletedSettings : Array<UserReminderSetting> = new Array<UserReminderSetting>();
  constructor(private reminderService: RemindersService, private dialogSerivce: HappyDialogService) { }

  ngOnInit() {
    this.refreshSettings();
  }

  private refreshSettings(){
    this.reminderService.getAllReminderSettings().subscribe((result: Array<UserReminderSetting>) => {
      this.reminderSettings = result;
      this.ogReminderSettings = new Array<UserReminderSetting>();
      this.reminderSettings.forEach((setting) => {
        this.ogReminderSettings.push({...setting});
      });// deep copy
    }, (error: any) => {
      this.dialogSerivce.openNewErrorDialog("Something happened!", "We weren't able to retrieve your reminder settings!");
    });
  }

  private areSettingsValid() : boolean{
    if(this.reminderSettings.length > 0){
      //return if it has some setting that is not valid
      return !this.reminderSettings.some((setting) => {
        return !this.isSettingValid(setting);
      });
    }
    return true;
  }

  private isSettingValid(setting: UserReminderSetting) : boolean{
    return setting.reminderTime != null &&
      (setting.monday || setting.tuesday || setting.wednesday || setting.thursday || setting.friday || setting.saturday || setting.sunday)
      && (setting.email || setting.push);
  }

  public save(){
    if(!this.areSettingsValid()){
      this.dialogSerivce.openNewErrorDialog("Invalid setting!", "Make sure all of your notifications have a selected day and method!");
      return;
    }

    forkJoin(
      this.reminderService.updateReminderSettings(this.reminderSettings),
      this.reminderService.deleteReminderSettings(this.deletedSettings)
    ).subscribe(
      (result) => {
        this.dialogSerivce.openNewSuccessDialog("Updated!", "Your reminder settings have been saved!");
        this.refreshSettings();
      },
      (error) => {
        this.dialogSerivce.openNewErrorDialog("Uh oh!", "We weren't able to save your settings, please try again!");
      }
    );    

  }

  public deleteListener(setting: UserReminderSetting){
    this.deletedSettings.push({...setting});
    const idx = this.reminderSettings.findIndex(f => f == setting);
    this.reminderSettings.splice(idx,1);
  }

  public resetSettings(){
    this.deletedSettings = new Array<UserReminderSetting>();
    this.reminderSettings = new Array<UserReminderSetting>();
    this.ogReminderSettings.forEach((setting) => {
      this.reminderSettings.push({...setting});
    });
  }

  public addNewReminder(){
    this.reminderSettings.push(new UserReminderSetting());
  }

}
