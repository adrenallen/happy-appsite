import { Component, OnInit, Inject } from '@angular/core';
import { HappyIconService } from '../../services/happy-icon.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ButtonOptionDTO } from '../../dtos/button-option-dto';

@Component({
  selector: 'hpy-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.scss']
})
export class PromptDialogComponent implements OnInit {

  public buttonOptions : Array<ButtonOptionDTO> = [new ButtonOptionDTO("Yes", true, "primary"), new ButtonOptionDTO("No", false, "warn")];
  public title : string;
  public message : string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PromptDialogDTO, private happyIconService: HappyIconService, private dialogRef:MatDialogRef<PromptDialogComponent>) {
    if(data.options != null){
      this.buttonOptions = data.options;
    }    
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {

  }

  public selectButton(buttonData : ButtonOptionDTO){
    this.dialogRef.close(buttonData);
  }

}

export class PromptDialogDTO{
  title : string;
  message : string;
  options : Array<ButtonOptionDTO>

  constructor(title, message, options){
    this.title = title;
    this.message = message;
    this.options = options;
  }
}
