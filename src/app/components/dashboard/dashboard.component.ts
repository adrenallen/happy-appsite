import { Component, OnInit, AfterViewInit } from '@angular/core';

import {HappySecurityService} from '../../services/happy-security.service';
import { Router } from '@angular/router';
import { HappyApiService } from '../../services/happy-api.service';
import { HappyDialogService } from '../../services/happy-dialog.service';

@Component({
  selector: 'hpy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private securityService: HappySecurityService, 
    private router : Router,  
    private happyDialogs: HappyDialogService) { }

  ngOnInit() {
    this.securityService.verifyGUIDIsValid();
  }

  goToRating(){
    this.router.navigate(['/rate']);
  }

}
