import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ErrorDialogComponent, ErrorDialogDTO } from '../dialogs/error-dialog/error-dialog.component';
import { RatingWithFactorsDTO } from '../dtos/rating-with-factors-dto';
import { DialogType } from '../enums/dialog-type.enum';
import { PromptDialogDTO, PromptDialogComponent } from '../dialogs/prompt-dialog/prompt-dialog.component';
import { ButtonOptionDTO } from '../dtos/button-option-dto';
import { LoadingDialogComponent } from '../dialogs/loading-dialog/loading-dialog.component';
import { InputDialogComponent, InputDialogDTO } from '../dialogs/input-dialog/input-dialog.component';
import { ChangelogDialogComponent } from '../dialogs/changelog-dialog/changelog-dialog.component';
import { EditFactorDialogDTO, EditFactorDialogComponent } from '../dialogs/edit-factor-dialog/edit-factor-dialog.component';
import { FactorDTO } from '../dtos/factor-dto';
import { FactorAspectDTO } from '../dtos/factor-aspect-dto';
import { SelectFactorAspectDialogComponent, SelectFactorAspectDialogDTO } from '../dialogs/select-factor-aspect-dialog/select-factor-aspect-dialog.component';
import { EditFactorAspectDialogComponent, EditFactorAspectDialogDTO } from '../dialogs/edit-factor-aspect-dialog/edit-factor-aspect-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class HappyDialogService {

  private _loadingDialogRef : MatDialogRef<LoadingDialogComponent, any>;

  constructor(public dialog: MatDialog) { }

  public openNewSuccessDialog(title: string, message: string) : MatDialogRef<ErrorDialogComponent, any>{
    return this.openNewInfoDialog(title, message, DialogType.Success);
  }

  public openNewErrorDialog(title: string, message: string) : MatDialogRef<ErrorDialogComponent, any>{
    return this.openNewInfoDialog(title, message, DialogType.Error);
  }

  public openChangelogDialog(changelog: string) : MatDialogRef<ChangelogDialogComponent, any>{
    return this.dialog.open(ChangelogDialogComponent, {
      data: changelog,
      width:'90%'
    });
  }

  public openNewInfoDialog(title: string, message: string, type?: DialogType) : MatDialogRef<ErrorDialogComponent, any>{
    let dialogWidth = '30%';
    if(window.innerWidth < 640){
      dialogWidth = '80%';
    }

    if(type == null){
      type = DialogType.Error;
    }

    return this.dialog.open(ErrorDialogComponent, {
      width: dialogWidth,
      data: new ErrorDialogDTO(title, message, type)
    });  
  }

  public openPromptDialog(title: string, message: string, options?: Array<ButtonOptionDTO>){
    let dialogWidth = '30%';
    if(window.innerWidth < 640){
      dialogWidth = '80%';
    }

    return this.dialog.open(PromptDialogComponent, {
      width: dialogWidth,
      data: new PromptDialogDTO(title, message, options)
    });  
  }

  public showLoadingDialog() : MatDialogRef<LoadingDialogComponent, any>{
    let dialogWidth = '30%';
    if(window.innerWidth < 640){
      dialogWidth = '80%';
    }
    this._loadingDialogRef = this.dialog.open(LoadingDialogComponent, {
      width: dialogWidth,
      height: '30%'
    });

    this._loadingDialogRef.disableClose = true;

    return this._loadingDialogRef;
  }

  public hideLoadingDialog() : void{
    this._loadingDialogRef.close();
  }

  public openInputDialog(title: string, message: string, label:string, validators?:Array<any>, showTextArea?: boolean){
    let dialogWidth = '30%';
    if(window.innerWidth < 640){
      dialogWidth = '80%';
    }

    return this.dialog.open(InputDialogComponent, {
      width: dialogWidth,
      data: new InputDialogDTO(title, message, label, validators, showTextArea)
    });  
  }

  public openEditFactorDialog(factor: FactorDTO, existingFactors: Array<FactorDTO>){
    let dialogWidth = '40%';
    if(window.innerWidth < 640){
      dialogWidth = '80%';
    }

    return this.dialog.open(EditFactorDialogComponent, {
      width: dialogWidth,
      data: new EditFactorDialogDTO(existingFactors, factor, this)
    });  
  }

  public openEditFactorAspectDialog(factorAspect: FactorAspectDTO,
     existingFactorAspects: Array<FactorAspectDTO>){
    let dialogWidth = '40%';
    if(window.innerWidth < 640){
      dialogWidth = '80%';
    }

    return this.dialog.open(EditFactorAspectDialogComponent, {
      width: dialogWidth,
      data: new EditFactorAspectDialogDTO(existingFactorAspects, factorAspect, this)
    });  
  }


  public openSelectFactorAspectDialog(aspects: Array<FactorAspectDTO>, factor :FactorDTO, fullAspects: Array<FactorAspectDTO>, selectedAspectID: number, allowNoneOption: boolean){
    let dialogWidth = '40%';
    if(window.innerWidth < 640){
      dialogWidth = '80%';
    }

    return this.dialog.open(SelectFactorAspectDialogComponent, {
      width: dialogWidth,
      data: new SelectFactorAspectDialogDTO(aspects, factor, fullAspects, selectedAspectID, allowNoneOption, this)
    });  
  }

  


}
