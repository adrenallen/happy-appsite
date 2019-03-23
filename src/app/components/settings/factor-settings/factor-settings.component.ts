import { Component, OnInit } from '@angular/core';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { FactorDTO } from 'src/app/dtos/factor-dto';
import { HappyIconService } from 'src/app/services/happy-icon.service';
import { state, trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { FactorsService } from '../../factors/factors.service';

@Component({
  selector: 'hpy-factor-settings',
  templateUrl: './factor-settings.component.html',
  styleUrls: ['./factor-settings.component.scss'],
  animations:[
    trigger('toggleRowButtons', [
      state('show', style({
        opacity: 1,
        right: '10px'
      })),
      state('hide', style({
        opacity:0,
        right: '-120px'
      })),
      transition('show => hide', [
        animate('0.15s')
      ]),
      transition('hide => show', [
        animate('0.15s')
      ])
    ])
  ]
})
export class FactorSettingsComponent implements OnInit {

  public factors: Array<FactorDTO> = [];

  public factorsUpdated: boolean = false;

  public clickedFactor : number = 0;

  constructor(private apiService: HappyApiService, private dialogService: HappyDialogService, private iconService: HappyIconService, private router: Router, private factorsService: FactorsService) {
    this.factorsService.getAllFactors().subscribe((result: any) => {
      this.factors = <Array<FactorDTO>>result.factors;
    });
  }

  ngOnInit() {
    
  }

  public editFactor(factor:FactorDTO, event){
    event.stopPropagation();
    this.dialogService.openEditFactorDialog(factor, this.factors).beforeClose().subscribe((result) =>{
      if(result != "" && result != null){
        this.factorsUpdated = !this.factorsUpdated;
        this.dialogService.openNewSuccessDialog("Factor renamed!", "");
      }
    });
  }

  public editFactorAspects(factor:FactorDTO, event){
    event.stopPropagation();
    this.router.navigate(['/main/settings/factoraspects', factor.id]);

  }

  public setFactorArchive(factor:FactorDTO, archive: boolean, event){
    event.stopPropagation();
    let saveFactor = {...factor};
    saveFactor.archived = archive;
    this.dialogService.showLoadingDialog();
    this.factorsService.setFactorArchive(saveFactor).subscribe((result) => {
        factor.archived = saveFactor.archived;
        this.factorsUpdated = !this.factorsUpdated;
      },
      (error) => {
        this.dialogService.openNewErrorDialog("Something happened!", "We failed to archive this factor! Please refresh and try again.");
      },
      () => {
        this.dialogService.hideLoadingDialog();
    });
  }

  public addNewFactor(){
    let factor = new FactorDTO("");
    this.dialogService.openEditFactorDialog(factor, this.factors).beforeClose().subscribe((result) =>{
      if(result != "" && result != null){
        this.factors.push(result);
        this.factorsUpdated = !this.factorsUpdated;
        this.dialogService.openNewSuccessDialog("Factor added!", "");
      }
    });
  }  

  public toggleActiveFactor(factorID : number){
    if(this.clickedFactor == factorID){
      this.clickedFactor = 0;
    }else{
      this.clickedFactor = factorID;
    }
  }


}
