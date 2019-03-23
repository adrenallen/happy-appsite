import { Component, OnInit } from '@angular/core';
import { HappyIconService } from 'src/app/services/happy-icon.service';

@Component({
  selector: 'hpy-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private iconService: HappyIconService) { }

  ngOnInit() {
  }

}
