import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HappyStringService {

  constructor() { }

  public decodeHTMLEntities(value: string) : string{
    return decodeURIComponent(value);
  }
}
