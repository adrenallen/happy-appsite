import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'hpy-nav-menu-sheet',
  templateUrl: './nav-menu-sheet.component.html',
  styleUrls: ['./nav-menu-sheet.component.scss']
})
export class NavMenuSheetComponent implements OnInit {

  constructor(private sheetRef: MatBottomSheetRef) { }

  ngOnInit() {
  }

  closeSheet(){
    this.sheetRef.dismiss();
  }

}
