import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';

@Component({
  selector: 'hpy-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passwordLengths : [number,number] = [6,64];
  password = new FormControl('', [Validators.required, Validators.minLength(this.passwordLengths[0]), Validators.maxLength(this.passwordLengths[1])]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(this.passwordLengths[0]), Validators.maxLength(this.passwordLengths[1])]);
  private _token : string;
  public passwordsMatch :boolean = true;
  constructor(private route: ActivatedRoute,private router: Router, private happyAPIService : HappyApiService, private dialogService : HappyDialogService) { 
    
    route.queryParams.subscribe(
      (queryParam : any) => {
        this._token = queryParam['token'];
        console.log(this._token);
      }
    );

  }

  ngOnInit() {
  }

  getPasswordErrorMessage() {
    return this.password.hasError('taken') ? 'Email is registered to another user' :
      this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('minlength') ? 'Must be more than '+this.passwordLengths[0]+' characters' :
      this.password.hasError('maxlength') ? 'Must be less than '+this.passwordLengths[1]+' characters' :
        '';
  }

  directToLogin(){
    this.router.navigate(['/login']);
  }

  checkIfPasswordsMatch() : void{
    if(this.password.valid && this.confirmPassword.value.length > 0 && this.password.value != this.confirmPassword.value){
      this.passwordsMatch = false;
    }else{
      this.passwordsMatch = true;
    }
  }

  changePassword(){
    this.dialogService.showLoadingDialog();
    this.happyAPIService.resetPassword(this._token, this.password.value).subscribe((result) => {
      this.dialogService.hideLoadingDialog();
      this.dialogService.openNewSuccessDialog("Password reset!", "Your password has been changed, you will now be redirected to login").afterClosed().subscribe(() => this.directToLogin());
    }, (error) => {
      this.dialogService.hideLoadingDialog();
      this.dialogService.openNewErrorDialog("Uh oh!", "Something happened, your password was not changed.");
    });
  }

}
