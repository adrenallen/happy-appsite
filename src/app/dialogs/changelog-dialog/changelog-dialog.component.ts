import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HappyIconService } from 'src/app/services/happy-icon.service';

@Component({
  selector: 'hpy-changelog-dialog',
  templateUrl: './changelog-dialog.component.html',
  styleUrls: ['./changelog-dialog.component.scss']
})
export class ChangelogDialogComponent implements OnInit {

  public changelogData : string;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private happyIconService: HappyIconService) { 
    this.changelogData = data;
  }

  ngOnInit() {
  }

}
