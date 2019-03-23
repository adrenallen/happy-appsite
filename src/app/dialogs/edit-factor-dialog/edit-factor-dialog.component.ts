import { Component, OnInit, Inject } from '@angular/core';
import { FactorDTO } from 'src/app/dtos/factor-dto';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { FactorsService } from 'src/app/components/factors/factors.service';

@Component({
  selector: 'hpy-edit-factor-dialog',
  templateUrl: './edit-factor-dialog.component.html',
  styleUrls: ['./edit-factor-dialog.component.scss']
})
export class EditFactorDialogComponent implements OnInit {

  public maxFactorLength = 150;

  private existingFactors : Array<FactorDTO>;

  public editFactor : FactorDTO;

  private _dialogService : HappyDialogService;
  
  constructor(public dialogRef: MatDialogRef<EditFactorDialogComponent>,
    private happyAPI : HappyApiService,
    private factorsService: FactorsService,
    @Inject(MAT_DIALOG_DATA) public data: EditFactorDialogDTO) { 

      this.existingFactors = data.factors;
      this.editFactor = {...data.factor}; //grab a copy
      this._dialogService = data.dialogService;
      
  }

  ngOnInit() {
  }

  public checkAndCreateFactor(){
    if(this.factorExistsAlready(this.editFactor.factor)){
      this._dialogService.openNewErrorDialog("Oops...", "This factor already exists as an option!");
    }else if(this.editFactor.factor.length < 3){
      this._dialogService.openNewErrorDialog("Almost enough...", "Minimum factor length is 3 characters!");
    }else if (this.editFactor.factor.length > this.maxFactorLength){
      this._dialogService.openNewErrorDialog("Woah there!", "Factors must be under " + this.maxFactorLength + " characters.");
    }else{
      //save to web api
      if(this.editFactor.id > 0){
        this.saveEditExistingFactor();
      }else{
        this.saveNewFactor();
      }
    }
  }

  private saveEditExistingFactor(){
    this._dialogService.showLoadingDialog();
    this.factorsService.renameFactor(this.editFactor).subscribe(
      (result) => {
        this._dialogService.hideLoadingDialog();
        this.existingFactors.find(f => f.id == this.editFactor.id).factor = this.editFactor.factor;
        this.dialogRef.close(this.editFactor);
      },
      (error) =>{
        this._dialogService.hideLoadingDialog();
        this._dialogService.openNewErrorDialog("We had a problem!", "There was a problem on the server with renaming this factor!  Please contact support@hapr.io!");
        console.error("Failed to rename factor ", error);
      }
    );
  }

  private saveNewFactor(){
    //save to web api
    this._dialogService.showLoadingDialog();
    this.factorsService.saveNewFactor(this.editFactor).subscribe(
      (result: FactorDTO) => { 
        this.dialogRef.close(result); 
      },
      (error) => { 
        this._dialogService.openNewErrorDialog("We had a problem!", "There was a problem on the server with adding this factor!  Please contact support@hapr.io!");
        console.error("problem adding factor - ", error);
      },
      () => {
        this._dialogService.hideLoadingDialog();
      }
    );
  }

  private factorExistsAlready(factor:string){
    let shortFactor = this.getStringCompareValue(factor); //the pure word
    return this.existingFactors.some(f => shortFactor == this.getStringCompareValue(f.factor));
  }

  private getStringCompareValue(original:string):string{
    return original.replace(/[^\w]/g,'').toLowerCase();
  }

  
}

export class EditFactorDialogDTO {
  factors: Array<FactorDTO>;
  dialogService: HappyDialogService;
  factor: FactorDTO;
  constructor(factors: Array<FactorDTO>, factor: FactorDTO, dialogService: HappyDialogService){
    this.factors = factors;
    this.dialogService = dialogService;
    this.factor = factor;
  }
}

