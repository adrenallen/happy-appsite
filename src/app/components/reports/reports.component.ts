import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { HappyReportHelperService } from './help/happy-report-helper.service';


@Component({
  selector: 'hpy-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportList = [];
  activeReport : string = "";
  constructor(private router : Router, 
    private route : ActivatedRoute, 
    private reportHelper: HappyReportHelperService) {
   }

  ngOnInit() {
    this.reportList = this.route.routeConfig.children;  
    
    if(this.route.firstChild != null){
      this.route.firstChild.data.subscribe((result) => {this.setReportName(result.title);});
    }
  }

  setReportName(name : string){
    this.activeReport = name;
  }

  getReportHelp(){
    this.reportHelper.showReportHelp(this.activeReport);
  }
}
