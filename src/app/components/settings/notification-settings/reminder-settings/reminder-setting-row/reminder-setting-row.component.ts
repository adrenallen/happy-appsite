import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectOptionDTO, RemindersService } from '../reminders.service';
import { HappyIconService } from 'src/app/services/happy-icon.service';
import { UserReminderSetting } from 'src/app/dtos/user-reminder-setting';

@Component({
  selector: 'hpy-reminder-setting-row',
  templateUrl: './reminder-setting-row.component.html',
  styleUrls: ['./reminder-setting-row.component.scss']
})
export class ReminderSettingRowComponent implements OnInit {

  @Output("deleted") deleted = new EventEmitter<UserReminderSetting>();
  @Input() public setting: UserReminderSetting;
  public timeOptions: Array<SelectOptionDTO>;
  constructor(private iconService: HappyIconService, private service: RemindersService) { 
    this.timeOptions = this.service.getTimeOptions();
  }

  ngOnInit() {
  }

  public toggleSetting(setting){
    setting = !setting;
  }

  public delete(){
    this.deleted.emit(this.setting);
  }

}
