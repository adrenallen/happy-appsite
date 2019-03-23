import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class HappyIconService {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.registerIcons();
  }

  public getRatingFaceIconNameFromRating(rating: number){
    switch(rating){
      case 1:
        return 'rating_face_1';
      case 2:
        return 'rating_face_2';
      case 3:
        return 'rating_face_3';
      case 4:
        return 'rating_face_4';
      case 5:
        return 'rating_face_5';
      default:
        return 'rating_face_3';
    }
  }

  private registerIcons(){
    this.iconRegistry.addSvgIcon('delete_icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-delete-24px.svg'));
    this.iconRegistry.addSvgIcon('arrow_up_icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-arrow_upward-24px.svg'));
    this.iconRegistry.addSvgIcon('arrow_down_icon',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-arrow_downward-24px.svg'));
    this.iconRegistry.addSvgIcon('edit',
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-edit-24px.svg'));


    this.iconRegistry.addSvgIcon('rating_face_1', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/rating_faces/1.svg'));
    this.iconRegistry.addSvgIcon('rating_face_2', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/rating_faces/2.svg'));
    this.iconRegistry.addSvgIcon('rating_face_3', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/rating_faces/3.svg'));
    this.iconRegistry.addSvgIcon('rating_face_4', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/rating_faces/4.svg'));
    this.iconRegistry.addSvgIcon('rating_face_5', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/rating_faces/5.svg'));

    this.iconRegistry.addSvgIcon('error_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-error_outline-24px.svg'));

    this.iconRegistry.addSvgIcon('check_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/outline-check-24px.svg'));

    this.iconRegistry.addSvgIcon('arrow_forward', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-arrow_forward-24px.svg'));

    this.iconRegistry.addSvgIcon('info_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/outline-info-24px.svg'));

    this.iconRegistry.addSvgIcon('hamburger_menu_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-menu-24px.svg'));

     this.iconRegistry.addSvgIcon('add_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-add-24px.svg'));

    this.iconRegistry.addSvgIcon('more_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-more_horiz-24px.svg'));

    this.iconRegistry.addSvgIcon('message_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-message-24px.svg'));

    this.iconRegistry.addSvgIcon('drag_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-drag_indicator-24px.svg'));

    this.iconRegistry.addSvgIcon('dashboard_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-home-24px.svg'));
    this.iconRegistry.addSvgIcon('reports_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-insert_chart-24px.svg'));
    this.iconRegistry.addSvgIcon('logout_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-power_settings_new-24px.svg'));
    this.iconRegistry.addSvgIcon('settings_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-settings-20px.svg'));

    this.iconRegistry.addSvgIcon('profile_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-account_circle-24px.svg'));

    this.iconRegistry.addSvgIcon('factors_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-extension-24px.svg'));

    this.iconRegistry.addSvgIcon('assistant_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-face-24px.svg'));

    this.iconRegistry.addSvgIcon('archive_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-archive-24px.svg'));

    this.iconRegistry.addSvgIcon('unarchive_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-unarchive-24px.svg'));

    this.iconRegistry.addSvgIcon('left_arrow_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-keyboard_arrow_left-24px.svg'));

    this.iconRegistry.addSvgIcon('factor_aspect_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/target.svg'));

    this.iconRegistry.addSvgIcon('close_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-close-24px.svg'));

    this.iconRegistry.addSvgIcon('notification_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-notifications-24px.svg'));

    this.iconRegistry.addSvgIcon('email_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-email-24px.svg'));

    this.iconRegistry.addSvgIcon('sms_icon', 
      this.sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/baseline-sms-24px.svg'));
      
  }
}
