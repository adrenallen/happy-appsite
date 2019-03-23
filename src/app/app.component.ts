import { Component } from '@angular/core';

import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
declare var require :any;
const { version: appVersion } = require('../../package.json');
@Component({
  selector: 'hpy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'happy-appsite';
  appVersion = appVersion;

  constructor(angulartics: Angulartics2GoogleGlobalSiteTag, router : Router){
    if(environment.production){
      angulartics.startTracking();
      router.events.subscribe( (event) => {
        if(event instanceof NavigationEnd){
          event = <NavigationEnd>event;
          angulartics.pageTrack(event.url);     
        }
      });
    }
  }
}
