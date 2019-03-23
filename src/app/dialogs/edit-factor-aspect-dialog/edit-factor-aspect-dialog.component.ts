import { Component, OnInit, Inject } from '@angular/core';
import { FactorAspectDTO } from 'src/app/dtos/factor-aspect-dto';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { FactorDTO } from 'src/app/dtos/factor-dto';
import { FactorsService } from 'src/app/components/factors/factors.service';

@Component({
  selector: 'hpy-edit-factor-aspect-dialog',
  templateUrl: './edit-factor-aspect-dialog.component.html',
  styleUrls: ['./edit-factor-aspect-dialog.component.scss']
})
export class EditFactorAspectDialogComponent implements OnInit {

  public maxFactorAspectLength = 150;

  private existingFactorAspects : Array<FactorAspectDTO>;

  public editFactorAspect : FactorAspectDTO;

  private _dialogService : HappyDialogService;
  
  constructor(public dialogRef: MatDialogRef<EditFactorAspectDialogComponent>,
    private happyAPI : HappyApiService,
    private factorsService: FactorsService,
    @Inject(MAT_DIALOG_DATA) public data: EditFactorAspectDialogDTO) { 

      this.existingFactorAspects = data.factorAspects;
      this.editFactorAspect = {...data.factorAspect}; //grab a copy
      this._dialogService = data.dialogService;
      
  }

  ngOnInit() {
  }

  public checkAndCreateFactorAspect(){
    if(this.factorAspectExistsAlready(this.editFactorAspect.factorAspect)){
      this._dialogService.openNewErrorDialog("Oops...", "This factor aspect already exists as an option!");
    }else if(this.editFactorAspect.factorAspect.length < 3){
      this._dialogService.openNewErrorDialog("Almost enough...", "Minimum factor aspect length is 3 characters!");
    }else if (this.editFactorAspect.factorAspect.length > this.maxFactorAspectLength){
      this._dialogService.openNewErrorDialog("Woah there!", "Factor aspects must be under " + this.maxFactorAspectLength + " characters.");
    }else{
      //save to web api
      if(this.editFactorAspect.id > 0){
        this.saveEditExistingFactorAspect();
      }else{
        this.saveNewFactorAspect();
      }
    }
  }

  private saveEditExistingFactorAspect(){
    this._dialogService.showLoadingDialog();
    this.factorsService.renameFactorAspect(this.editFactorAspect).subscribe(
      (result) => {
        this._dialogService.hideLoadingDialog();
        this.existingFactorAspects
          .find(f => f.id == this.editFactorAspect.id)
          .factorAspect = this.editFactorAspect.factorAspect;
        this.dialogRef.close(this.editFactorAspect);
      },
      (error) =>{
        this._dialogService.hideLoadingDialog();
        this._dialogService.openNewErrorDialog("We had a problem!", "There was a problem on the server with renaming this factor aspect!  Please contact support@hapr.io!");
        console.error("Failed to rename factor aspect ", error);
      }
    );
  }

  private saveNewFactorAspect(){
    //save to web api
    this._dialogService.showLoadingDialog();
    this.factorsService.saveNewFactorAspect(this.editFactorAspect).subscribe(
      (result: FactorAspectDTO) => { 
        this.dialogRef.close(result); 
      },
      (error) => { 
        this._dialogService.openNewErrorDialog("We had a problem!", "There was a problem on the server with adding this factor aspect!  Please contact support@hapr.io!");
        console.error("problem adding factor aspect - ", error);
      },
      () => {
        this._dialogService.hideLoadingDialog();
      }
    );
  }

  private factorAspectExistsAlready(factorAspect:string){
    let shortFactorAspect = this.getStringCompareValue(factorAspect); //the pure word
    return this.existingFactorAspects.some(f => shortFactorAspect == this.getStringCompareValue(f.factorAspect));
  }

  private getStringCompareValue(original:string):string{
    return original.replace(/[^\w]/g,'').toLowerCase();
  }

  
}

export class EditFactorAspectDialogDTO {
  factorAspects: Array<FactorAspectDTO>;
  dialogService: HappyDialogService;
  factorAspect: FactorAspectDTO;
  constructor(factorAspects: Array<FactorAspectDTO>,
     factorAspect: FactorAspectDTO, dialogService: HappyDialogService){
    this.factorAspects = factorAspects;
    this.dialogService = dialogService;
    this.factorAspect = factorAspect;
  }
}
