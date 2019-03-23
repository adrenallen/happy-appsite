import { Component, OnInit } from '@angular/core';
import { HappyIconService } from 'src/app/services/happy-icon.service';
import { MatBottomSheet } from '@angular/material';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { NavMenuSheetComponent } from './nav-menu-sheet/nav-menu-sheet.component';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { HappySupportService } from 'src/app/services/happy-support.service';

@Component({
  selector: 'hpy-main-frame',
  templateUrl: './main-frame.component.html',
  styleUrls: ['./main-frame.component.scss']
})
export class MainFrameComponent implements OnInit {

  public hideAddRatingButton : boolean = false;
  public frameTitle : string = "Hapr.io";

  constructor(private iconService: HappyIconService, 
    private bottomSheet: MatBottomSheet, 
    private router : Router, 
    private route : ActivatedRoute,
    private happyDialogs: HappyDialogService,
    private happySupport: HappySupportService) { 

    }

  ngOnInit() {

    this.updateFrameTitle();

    this.route.firstChild.url.subscribe((url) => {
      this.hideAddRatingButton = url[0].path == 'rate';
    });

    this.router.events.subscribe( (event) => {
      if(event instanceof NavigationEnd){
        event = <NavigationEnd>event;
        if(event.url == '/main/rate'){
          this.hideAddRatingButton = true;
        }else{
          this.hideAddRatingButton = false;
        }
        this.updateFrameTitle();
      }
    });

    this.checkAndShowChangelog();

  }

  private checkAndShowChangelog(){
    this.happySupport.shouldShowUserLatestChanges().subscribe((show) => {
      if(show){
        this.happySupport.getLatestChangelog().subscribe((result) => {
          this.happyDialogs.openChangelogDialog(result).beforeClosed().subscribe(() => {
            this.happySupport.setShownUserLatestChanges();
          });          
        });
      }
    });
  }

  promptForFeedback(){
    const dialogVar = this.happyDialogs
      .openInputDialog("Do you have feedback?", 
        "We'd love to hear from you! Details provided here are sent directly to the development team.", 
        "Your feedback",
        null,
        true);
    
     dialogVar.afterClosed().subscribe((result) => {
        if(result && result.length > 5){
          this.happyDialogs.openNewSuccessDialog("Thank you for providing feedback!", "Without you we couldn't build a better product.");
          this.happySupport.sendFeedback(result).subscribe((result) => {
          },
          (error) => {
            this.happyDialogs.openNewErrorDialog("Uh oh...", "We encountered an error trying to submit your feedback.  We're sorry about that.  Please email your feedback to us at support@hapr.io");
          });
        }        
      });
  }

  openBottomNavSheet(){
    this.bottomSheet.open(NavMenuSheetComponent);
  }

  private updateFrameTitle(){
    this.route.firstChild.data.subscribe((result) => {
      this.frameTitle = result.title;
    });
  }


}
