import { Component, OnInit } from '@angular/core';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { ButtonOptionDTO } from 'src/app/dtos/button-option-dto';
import { Button } from 'protractor';
import { ReportsService } from '../../reports/reports.service';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'hpy-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  public username: string = "";
  public email: string = "";
  public phone: string = "";
  public mobileDisabled: boolean = true;
  private oldPhone: string = "";
  
  constructor(private apiService: HappyApiService, private dialog: HappyDialogService, private reportService: ReportsService, private fileSaver: FileSaverService) { 
    this.apiService.getUserForGUID().subscribe((result: any) => {
      this.username = result.username;
      this.email = result.email;
      this.phone = result.mobileNumber;
    }, (error) => { 
      this.dialog.openNewErrorDialog("We can't find you!", "Your session may be invalid, please try logging out and back in.<br><br>If you are still having problems then please contact <a href='mailto:support@hapr.io'>support@hapr.io</a>.");
    });
  }

  ngOnInit() {
  }

  public resetPassword(){
    let options = [new ButtonOptionDTO("Yes", true, "primary"), new ButtonOptionDTO("Nevermind", false, "warn")];
    this.dialog.openPromptDialog("Reset Password?", "Do you want us to send you an email to change your password?", options)
      .beforeClose().subscribe((result: ButtonOptionDTO) => {
        if(result.value){
          this.apiService.forgotPassword(this.email).subscribe();
          this.dialog.openNewSuccessDialog("Email sent!", "Check your email for instructions to change your password!");
        }
      });
  }

  public exportData(){
    this.dialog.showLoadingDialog();
    this.reportService.getFullDataExport().subscribe(
      (result) => {
        this.fileSaver.save(new Blob([JSON.stringify(result)], {type: 'application/json'}), "export.json");
      },
      (err) => {
        this.dialog.openNewErrorDialog("Uh oh!", "We failed to retrieve your full data export.  If this issue persists, please contact support!");
      },
      () => {
        this.dialog.hideLoadingDialog();
      }
    )
  }

  public editPhoneNumber(){
    this.oldPhone = this.phone;
    this.mobileDisabled = false;
  }

  public savePhoneNumber(){
    this.mobileDisabled = true;
    if(this.oldPhone !== this.phone){
      this.dialog.showLoadingDialog();
      this.apiService.setUserPhone(this.phone).subscribe((result) => {
        this.dialog.openNewSuccessDialog("Updated!", "Your phone number has been updated!");
      },
      (err) => {
        this.dialog.openNewErrorDialog("Uh oh!", "We encountered an error, please try again!");
      },
      () => {
        this.dialog.hideLoadingDialog();
      })
    }
  }

  public isMobileDisabled(){
    return this.mobileDisabled;
  }

}
