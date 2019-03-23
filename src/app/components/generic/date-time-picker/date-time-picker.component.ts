import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hpy-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit {

  @Input() dateValue : Date;
  @Output() dateValueChange = new EventEmitter<Date>();

  @Output() onDateChange = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
    if(this.dateValue == null){
      this.dateValue = new Date();
    }
  }

  dateChanged(){
    this.dateValueChange.emit(this.dateValue);
    this.onDateChange.emit(this.dateValue);
  }

}
