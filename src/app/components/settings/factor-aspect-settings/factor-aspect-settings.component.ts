import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { FactorAspectDTO } from 'src/app/dtos/factor-aspect-dto';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FactorDTO } from 'src/app/dtos/factor-dto';
import { FactorsService } from '../../factors/factors.service';

@Component({
  selector: 'hpy-factor-aspect-settings',
  templateUrl: './factor-aspect-settings.component.html',
  styleUrls: ['./factor-aspect-settings.component.scss'],
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
export class FactorAspectSettingsComponent implements OnInit {

  public isLoaded = false;
  public factorAspects : FactorAspectDTO[];
  private factorID : number;


  public factorAspectsUpdated: boolean = false;

  public clickedFactorAspect : number = 0;

  constructor(private route: ActivatedRoute, private apiService: HappyApiService, private dialogService: HappyDialogService, private factorsService: FactorsService) { 

  }

  ngOnInit() {
    this.factorID = +this.route.snapshot.params['id'];
    this.factorsService.getAllFactorAspects().subscribe(
      (result: Array<FactorAspectDTO>) => { 
        this.factorAspects = result.filter(fa => fa.factorID == this.factorID);

      },
      (error: any) => { console.log("Error: ", error); },
      () => {
        this.isLoaded = true;
      }
    );
  }



  public editFactorAspect(factorAspect:FactorAspectDTO, event){
    event.stopPropagation();
    this.dialogService.openEditFactorAspectDialog(factorAspect, this.factorAspects)
      .beforeClose().subscribe((result) =>{
        if(result != "" && result != null){
          this.factorAspectsUpdated = !this.factorAspectsUpdated;
          this.dialogService.openNewSuccessDialog("Factor aspect renamed!", "");
        }
    });
  }

  public setFactorAspectArchive(factorAspect:FactorAspectDTO, archive: boolean, event){
    event.stopPropagation();
    let saveFactorAspect = {...factorAspect};
    saveFactorAspect.archived = archive;
    this.dialogService.showLoadingDialog();
    this.factorsService.setFactorAspectArchive(saveFactorAspect).subscribe((result) => {
        factorAspect.archived = saveFactorAspect.archived;
        this.factorAspectsUpdated = !this.factorAspectsUpdated;
      },
      (error) => {
        this.dialogService.openNewErrorDialog("Something happened!", "We failed to archive this factor aspect! Please refresh and try again.");
      },
      () => {
        this.dialogService.hideLoadingDialog();
    });
  }

  public addNewFactorAspect(){
    let factorAspect = new FactorAspectDTO();
    factorAspect.factorID = +this.factorID;  //set to the current active factor
    this.dialogService.openEditFactorAspectDialog(factorAspect, this.factorAspects).beforeClose().subscribe((result) =>{
      if(result != "" && result != null){
        this.factorAspects.push(result);
        this.factorAspectsUpdated = !this.factorAspectsUpdated;
        this.dialogService.openNewSuccessDialog("Factor Aspect added!", "");
      }
    });
  }  

  public toggleActiveFactorAspect(factorAspectID : number){
    if(this.clickedFactorAspect == factorAspectID){
      this.clickedFactorAspect = 0;
    }else{
      this.clickedFactorAspect = factorAspectID;
    }
  }

}
