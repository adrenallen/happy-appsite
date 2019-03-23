import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HappyDialogService } from 'src/app/services/happy-dialog.service';
import { GenericHelpComponent, GenericHelpComponentDTO } from './generic-help/generic-help.component';

@Injectable({
  providedIn: 'root'
})
export class HappyReportHelperService {

  constructor(private dialog: MatDialog, private dialogService: HappyDialogService) {

  }

  public showReportHelp(reportName: string) {
    switch (reportName) {
      case 'Daily Rating Graph':
        this.showGenericHelp('Report Help',
          `This report shows how your average daily ratings over the selected period in a line chart format.
          <br><br>
          If you had multiple ratings in a single day, the <strong>ratings are averaged to get that day's rating.</strong>
          <br><br>
          <strong>Days without a rating are completely excluded from the chart.</strong>`);
        break;
      case 'Rating Factor Occurrences':
        this.showGenericHelp('Report Help',
          `This report shows what factors have occurred by rating, on both positive and negative sides.
          <br>
          <br>
          At the top you can select the rating you would like to explore (1-5).  <strong>Selecting a rating will display all factors that have ever been included for that rating.</strong>
          <br><br>
          You can see both positive and negative separately, to see how those factors affected the rating.  
          <br>
          <br>
          Additionally <strong>you can toggle the legend</strong>, in the top right corner of each graph, to see what color corresponds to what factor.`);
        break;
      case 'Factor Impacts':
        this.showGenericHelp('Report Help',
        `Factor impacts shown here are the calculated effect a factor has on a rating.
        <br>
        <br>
        In other words, when that factor is included in a rating, it makes that rating vary from the average rating by the amount of the impact.
        <br>
        <br>
        The more positive the number is, the more positively it effects your ratings!`)
        break;
      default:
        this.dialogService.openNewErrorDialog("Whoops...", "We couldn't find any help for this report.  We strive to make each report as readable as possible, please contact <a href='mailto:support@hapr.io'>support@hapr.io</a> to get help!");
        break;
    }

  }

  private showGenericHelp(title: string, message: string) {
    this.dialog.open(GenericHelpComponent, {
      data: new GenericHelpComponentDTO(title, message)
    });
  }
}
