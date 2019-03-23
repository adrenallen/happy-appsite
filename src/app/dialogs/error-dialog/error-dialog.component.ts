import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA } from '@angular/material';
import { DialogType } from '../../enums/dialog-type.enum';
import { HappyIconService } from '../../services/happy-icon.service';

@Component({
  selector: 'hpy-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})

export class ErrorDialogComponent implements OnInit {

  public title: string;
  public message: string;
  public dialogTypes = DialogType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ErrorDialogDTO, private happyIconService: HappyIconService) {

      this.title = this.resolveDialogTitle(data);

      if(data.message != null){
        if(typeof data.message == "object"){
          this.message = JSON.stringify(data.message);
        }else{
          this.message = data.message;
        }        
      }
  }

  ngOnInit() {

  }

  public getButtonColor(dialogType: DialogType) : string{
    switch(dialogType){
      case DialogType.Error:
        return "warn";
      case DialogType.Success:
      default:
        return "primary";
    }
  }

  private resolveDialogTitle(data : ErrorDialogDTO) : string{
    if(data.title != null) return data.title;
    
    switch(data.type){
      case DialogType.Success:
        return "Success";
      case DialogType.Error:
      default:
        return "A problem was encountered";
    }
  }
}

export class ErrorDialogDTO{
  title: string;
  message: string;
  type: DialogType;
  constructor(title: string, message: string, type? : DialogType){
    this.title = title;
    this.message = message;
    if(type != null){
      this.type = type;
    }else{
      this.type = DialogType.Error;
    }
  }
}
