import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FactorAspectDTO } from 'src/app/dtos/factor-aspect-dto';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { FactorDTO } from 'src/app/dtos/factor-dto';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { FactorsService } from 'src/app/components/factors/factors.service';

@Component({
  selector: 'hpy-select-factor-aspect-dialog',
  templateUrl: './select-factor-aspect-dialog.component.html',
  styleUrls: ['./select-factor-aspect-dialog.component.scss']
})
export class SelectFactorAspectDialogComponent implements OnInit {

  public aspects : Array<FactorAspectDTO>;
  private _dialogService : HappyDialogService;
  public parentFactor : FactorDTO;
  private fullAspectList : Array<FactorAspectDTO>;
  public selectedAspect: FactorAspectDTO;
  public showNoneOption : boolean;

  constructor(@Inject(MAT_DIALOG_DATA) dialogData: SelectFactorAspectDialogDTO, private dialogRef: MatDialogRef<SelectFactorAspectDialogComponent>, private apiService: HappyApiService, private factorsService : FactorsService){ 
    this.aspects = dialogData.availableFactorAspects;
    this._dialogService = dialogData.dialogService;
    this.parentFactor = dialogData.parentFactor;
    this.fullAspectList = dialogData.fullAspectList;
    this.selectedAspect = this.aspects.find(f => f.id == dialogData.selectedAspectID);
    this.showNoneOption = dialogData.allowNoneOption;
  }

  ngOnInit() {
  }

  public addFactorAspectDialog(){
    this._dialogService.openInputDialog("Add a new factor aspect",
      "",
      "Factor Aspect", [this.newFactorAspectNameValidator(this.fullAspectList), Validators.maxLength(150), Validators.required], true)
      .afterClosed().subscribe((result) => {
        if(result != null && result != ""){
          let newAspect = new FactorAspectDTO();
          newAspect.factorAspect = result;
          newAspect.factorID = this.parentFactor.id;
          this.factorsService.saveNewFactorAspect(newAspect).subscribe((result: FactorAspectDTO) => {
            this._dialogService.openNewSuccessDialog("Success!", "New factor aspect created!");
            newAspect = result;
            //save aspect and return it
            this.dialogRef.close(newAspect);
          },
          (error) => {
            this._dialogService.openNewErrorDialog("Something happened!", "There was a problem saving your new aspect!  Please refresh and try again!")
              .afterClosed()
              .subscribe((result) => {
                this.dialogRef.close();
              });
          });          
        }
      });
  }

  public selectNoneAspect(){
    this.dialogRef.close(new FactorAspectDTO());
  }

  public selectAspect(aspect : FactorAspectDTO){
    this.dialogRef.close(aspect);
  }

  private newFactorAspectNameValidator(existingAspects : FactorAspectDTO[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if(existingAspects.some(e => e.factorAspect.toLowerCase() == control.value.toLowerCase())){
        return {'factorAspectExist': 'This factor aspect already exists!'};
      }
      return null;
    };
  }

}

export class SelectFactorAspectDialogDTO{
  availableFactorAspects: Array<FactorAspectDTO>;  //these are only the available ones for the select
  dialogService: HappyDialogService;
  parentFactor: FactorDTO;
  selectedAspectID: number;
  fullAspectList: Array<FactorAspectDTO>;
  allowNoneOption : boolean;
  constructor(availableFactorAspects: Array<FactorAspectDTO>, factor: FactorDTO, fullAspects: Array<FactorAspectDTO>, selectedAspectID: number, allowNoneOption: boolean, service: HappyDialogService){
    this.availableFactorAspects = availableFactorAspects;
    this.dialogService = service;
    this.parentFactor = factor;
    this.selectedAspectID = selectedAspectID;
    this.fullAspectList = fullAspects;
    this.allowNoneOption = allowNoneOption;
  }
}