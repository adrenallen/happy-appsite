import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HappyApiService } from '../../../services/happy-api.service';
import { FactorDTO } from '../../../dtos/factor-dto';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { FactorsService } from '../factors.service';
@Component({
  selector: 'hpy-factor-form',
  templateUrl: './factor-form.component.html',
  styleUrls: ['./factor-form.component.scss']
})
export class FactorFormComponent implements OnInit {
  private existingFactors : Array<any>;

  public newFactor : string = "";

  public maxFactorLength = 150;
  private _dialogService : HappyDialogService;

  constructor(public dialogRef: MatDialogRef<FactorFormComponent>,
    private happyAPI : HappyApiService,
    private factorsService: FactorsService,
    @Inject(MAT_DIALOG_DATA) public data: FactorFormDTO) { 
      this.existingFactors = data.factors;    
      this._dialogService = data.dialogService;
  }

  ngOnInit() {
  }

  public checkAndCreateFactor(){
    if(this.factorExistsAlready(this.newFactor)){
      this._dialogService.openNewErrorDialog("Oops...", "This factor already exists as an option!");
    }else if(this.newFactor.length < 3){
      this._dialogService.openNewErrorDialog("Almost enough...", "Minimum factor length is 3 characters!");
    }else if (this.newFactor.length > this.maxFactorLength){
      this._dialogService.openNewErrorDialog("Woah there!", "Factors must be under " + this.maxFactorLength + " characters.");
    }else{
      //save to web api
      this.factorsService.saveNewFactor(new FactorDTO(this.newFactor)).subscribe(
        (result: FactorDTO) => { this.dialogRef.close(result); },
        //TODO - better error
        (error) => { 
          this._dialogService.openNewErrorDialog("We had a problem!", "There was a problem on the server with adding this factor!  Please contact support@hapr.io!");
          console.error("problem adding factor - ", error);
        }
      )
    }
  }

  private factorExistsAlready(factor:string){
    let shortFactor = this.getStringCompareValue(factor); //the pure word
    return this.existingFactors.some(f => shortFactor == this.getStringCompareValue(f.factor));
  }

  private getStringCompareValue(original:string):string{
    return original.replace(/[^\w]/g,'').toLowerCase();
  }

}

export class FactorFormDTO {
  factors: any
  dialogService: HappyDialogService
  constructor(factors: any, dialogService: HappyDialogService){
    this.factors = factors;
    this.dialogService = dialogService;
  }
}
