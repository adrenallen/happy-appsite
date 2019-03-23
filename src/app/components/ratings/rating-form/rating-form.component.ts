import { Component, OnInit, Input } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { RatingDTO } from '../../../dtos/rating-dto';

@Component({
  selector: 'hpy-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.scss']
})
export class RatingFormComponent implements OnInit {

  @Input() public rating : RatingDTO;
  @Input() public disableRatingDate : boolean = true;
  
  public ratingDescription : string;
  public ratingValue : number;
  public ratingDate : string;
  public datePickerSettings = {
    timePicker: true,
    format: 'short',
    bigBanner: true,
    closeOnSelect: false
  };

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('rating_face_1', 
      sanitizer.bypassSecurityTrustResourceUrl('/assets/rating_faces/1.svg'));
    iconRegistry.addSvgIcon('rating_face_2', 
      sanitizer.bypassSecurityTrustResourceUrl('/assets/rating_faces/2.svg'));
    iconRegistry.addSvgIcon('rating_face_3', 
      sanitizer.bypassSecurityTrustResourceUrl('/assets/rating_faces/3.svg'));
    iconRegistry.addSvgIcon('rating_face_4', 
      sanitizer.bypassSecurityTrustResourceUrl('/assets/rating_faces/4.svg'));
    iconRegistry.addSvgIcon('rating_face_5', 
      sanitizer.bypassSecurityTrustResourceUrl('/assets/rating_faces/5.svg'));
   }

  ngOnInit() {
    if(this.rating == null){
      this.rating = new RatingDTO();
      this.rating.rating = 3;
      this.rating.createdDatetime = "";
      this.rating.journalEntry = "";
    }
    this.ratingValue = this.rating.rating;
    this.updateRatingDescription(this.ratingValue);
  }

  public updateRatingDescription(rating : number){
    this.ratingDescription = this.getRatingDescription(rating);
    this.rating.rating = rating;
  }

  private getRatingDescription(rating: number) : string{
    switch(rating){
      case 1:
      return "Terrible";
      case 2:
        return "Bad";
      case 3:
        return "Okay";
      case 4:
        return "Good";
      case 5:
        return "Awesome";
      default:
        return "Pick a rating";
    }
  }
}
