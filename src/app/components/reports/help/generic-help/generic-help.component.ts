import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'hpy-generic-help',
  templateUrl: './generic-help.component.html',
  styleUrls: ['./generic-help.component.scss']
})
export class GenericHelpComponent implements OnInit {

  public title: string;
  public message: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: GenericHelpComponentDTO) { 
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

}

export class GenericHelpComponentDTO{
  title: string;
  message: string;

  constructor(title: string, message: string){
    this.title = title;
    this.message = message;

  }
}
