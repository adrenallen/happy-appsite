import { Component, OnInit } from '@angular/core';
import { RemindersService } from './reminder-settings/reminders.service';

import * as moment from 'moment-timezone';
@Component({
  selector: 'hpy-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss']
})
export class NotificationSettingsComponent implements OnInit {

  constructor(private reminderService: RemindersService) { 

  }

  ngOnInit() {
    
  }

}
