import { Component, OnInit } from '@angular/core';
import {HappyApiService} from '../../services/happy-api.service';
import { MatSnackBar } from '@angular/material';
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HappyDialogService } from '../../services/happy-dialog.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'hpy-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  public hide = true;
  public user="";
  public pass="";
  public badLogin = false;
  
  public showLoadingLogin = true;

  constructor(private happyAPIService: HappyApiService,
     private router: Router,
     private happyDialogs: HappyDialogService) { }

  login(){
    this.showLoadingLogin = true;
    this.happyAPIService.tryLogin(this.user,this.pass).subscribe(
      (value) => { this.loginSuccess(value); },
      (error) => { 
        let errorMessage = error.error.errorMessage;
        let title = "";
        if(errorMessage == null || errorMessage.length < 1){
          errorMessage = "Trouble communicating with the server, please try again.";
          title = null;
        }
        this.setErrorMessage(errorMessage, title); 
      }
    )
  }

  loginSuccess(response: any){
    if(response.guid){
      //Save guid cookie
      this.happyAPIService.saveGUIDToCookies(response.guid);
      //redirect to dashboard
      this.directToDashboard();
    }else{
      this.setErrorMessage("Server error occurred, no valid session token was received. Please try again.", null);
    }
  }

  setErrorMessage(error: string, title: string){
    this.happyDialogs.openNewErrorDialog(title, error);
    this.showLoadingLogin = false;
    this.badLogin = true;
  }

  ngOnInit() {
    const existingGUID = this.happyAPIService.getGUIDFromCookies();
    if(existingGUID){
      this.happyAPIService.checkGUIDIsValid().subscribe(
        () => { this.directToDashboard(); },
        () => { this.setErrorMessage("Please try again, your session may have expired", "Invalid credentials"); }
      );

    }else{
      this.showLoadingLogin = false;
    }
  }

  directToDashboard(){
    this.router.navigate(['/main']);
  }

  public directToSignup(){
    this.router.navigate(['/signup']);
  }

  forgotPassword(){
    this.happyDialogs.openInputDialog("Forgot password", 
        "Enter your email below to receive a password reset link", 
        "Email address", [Validators.email, Validators.required])
      .beforeClose()
      .subscribe((result) => {
        if(result != null && result != ""){
          this.happyDialogs.showLoadingDialog();
          //send forgot password api call with email*
          this.happyAPIService.forgotPassword(result).subscribe((result) => {
            this.happyDialogs.hideLoadingDialog();
            //success
            this.happyDialogs.openNewSuccessDialog("Request submitted", "Please check your email for a password reset link");
          }, (error) => {
            this.happyDialogs.hideLoadingDialog()
            this.happyDialogs.openNewErrorDialog("Whoops...", "Something bad happened, your password reset request failed.");
          });
        }
      });
  }

}