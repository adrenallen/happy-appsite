import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HappyApiService } from 'src/app/services/happy-api.service';
import { Router } from '@angular/router';
import { MatBottomSheetRef } from '@angular/material';
import { HappyIconService } from 'src/app/services/happy-icon.service';

@Component({
  selector: 'hpy-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  @Output() onNavigate = new EventEmitter<string>();

  constructor(private happyAPIService: HappyApiService, private router: Router, private happyIconService : HappyIconService) { }

  ngOnInit() {
  }

  logout(){
    this.happyAPIService.logout().subscribe((result) => {
    }, (error) => {
      console.error("Failed to log out session... ", error);
    }, () => {
      this.onNavigate.emit('navigateOut');
      this.router.navigate(['/']);
    });    
  }

  navigateEvent(){
    this.onNavigate.emit('navigateOut');
  }

}
