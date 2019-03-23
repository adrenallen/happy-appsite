import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HappyIconService } from 'src/app/services/happy-icon.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'hpy-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent implements OnInit {

  public title : string;
  public message : string;
  public label : string;
  public showTextArea : boolean = false;

  inputControl = new FormControl('', [Validators.required]);
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: InputDialogDTO, private dialogRef:MatDialogRef<InputDialogComponent>) {    
    this.title = this.data.title;
    this.message = this.data.message;
    this.label = this.data.label;
    if(this.data.validators != null){
      this.inputControl.setValidators(this.data.validators);
    }
    
    if(this.data.showTextArea != null){
      this.showTextArea = this.data.showTextArea;
    }
  }

  ngOnInit() {
    
  }

  submit(){
    if(this.inputControl.valid){
      this.dialogRef.close(this.inputControl.value);
    }
  }

  public getInputErrors() : string{
    let errorMessages = [];

    for(let key in this.inputControl.errors){
      let error = this.inputControl.errors[key];
      let errorMessage = "";
      switch(key){
        case 'required': {
          errorMessage = "Field is required!";
          break;
        }
        case 'minlength': {
          errorMessage = "Minimum length allowed is " + error.requiredLength + "!";
          break;
        }
        case 'maxlength': {
          errorMessage = "Maximum length allowed is " + error.requiredLength + "!";
          break;
        }
        case 'pattern': {
          errorMessage = "Must match pattern of " + error.requiredPattern + "!";
          break;
        }
        default: {
          errorMessage = error;
        }
      }

      errorMessages.push(errorMessage);
    }
    if(errorMessages.length > 0){
      return errorMessages.join(' and ');  
    }
    return "";
    
  }

}

export class InputDialogDTO{
  title : string;
  message : string;
  label: string;
  validators:Array<any>;
  showTextArea:boolean;

  constructor(title: string, message : string, label : string, validators? : Array<any>, showTextArea? : boolean){
    this.title = title;
    this.message = message;
    this.label = label;
    if(validators != null){
      this.validators = validators;
    }
    if(showTextArea != null){
      this.showTextArea = showTextArea;
    }
  }
}
