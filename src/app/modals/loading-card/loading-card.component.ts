import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hpy-loading-card',
  templateUrl: './loading-card.component.html',
  styleUrls: ['./loading-card.component.scss']
})
export class LoadingCardComponent implements OnInit {

  @Input('show') public showLoadingCard : boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
