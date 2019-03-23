import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hpy-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss']
})
export class LoadingDialogComponent implements OnInit {

  private _tickerInterval;
  public loadingTicks : string = "";
  private _loadingTicksCount : number = 0;
  private _maxLoadingTicks : number = 4;
  constructor() { }

  ngOnInit() {
    this._tickerInterval = setInterval(() => {
      this.loadingTicks = this.loadingTicks + ".";
      this._loadingTicksCount++;
      if(this._loadingTicksCount > this._maxLoadingTicks){
        this.loadingTicks = "";
        this._loadingTicksCount = 0;
      }
     }, 1000);
  }

  ngOnDestroy(){
    clearInterval(this._tickerInterval);
  }



}
