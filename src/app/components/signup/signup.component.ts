import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HappyApiService } from '../../services/happy-api.service';
import { HappyDialogService } from '../../services/happy-dialog.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'hpy-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  usernameLengths : [number,number] = [5,32];

  passwordLengths : [number,number] = [6,64];

  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required,
      Validators.minLength(this.usernameLengths[0]),
      Validators.maxLength(this.usernameLengths[1]),
      Validators.pattern('[a-zA-Z0-9]*')]);
  password = new FormControl('', [Validators.required, Validators.minLength(this.passwordLengths[0]), Validators.maxLength(this.passwordLengths[1])]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(this.passwordLengths[0]), Validators.maxLength(this.passwordLengths[1])]);
  code = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);

  public passwordsMatch :boolean = true;

  constructor(private router: Router, private happyAPIService : HappyApiService, private dialogService : HappyDialogService) { }

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('taken') ? 'Email is already registered' :
      this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getUsernameErrorMessage() {
    return this.username.hasError('taken') ? 'Username is taken' :
      this.username.hasError('required') ? 'You must enter a value' :
      this.username.hasError('pattern') ? 'Invalid characters' :
      this.username.hasError('minlength') ? 'Must be more than '+this.usernameLengths[0]+' characters' :
      this.username.hasError('maxlength') ? 'Must be less than '+this.usernameLengths[1]+' characters' :
        '';
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

  signUp() : void{
    this.dialogService.showLoadingDialog();

    //TODO - do this all at once....
    this.happyAPIService.doesUsernameExist(this.username.value).subscribe((result) => {
      //user does not exist, we can save this!
      this.happyAPIService.doesEmailExist(this.email.value).subscribe((result) => {
        
        this.happyAPIService.createNewUser(this.username.value, this.email.value, this.password.value).subscribe(
          (result) => {
            this.dialogService.hideLoadingDialog();
            this.dialogService.openNewSuccessDialog("Account created", "Your account has been created, you will now be redirected to the login")
              .beforeClose()
              .subscribe(() => this.directToLogin());
          },
          (error) => {
            this.dialogService.hideLoadingDialog();
            this.dialogService.openNewErrorDialog("Something happened", "Account creation failed, please refresh and try again!");           
          }
        )

      }, (error: HttpErrorResponse) => {
        this.dialogService.hideLoadingDialog();
        this.email.setErrors({'taken': true});
      });
    },
    (error) => {
      //user exists, show error
      this.dialogService.hideLoadingDialog();
      // this.dialogService.openNewErrorDialog("Uh oh!", "This username is already taken!");
      this.username.setErrors({'taken':'Its taken'});
    });
  }

}
