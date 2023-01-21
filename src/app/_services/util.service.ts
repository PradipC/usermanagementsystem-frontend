import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  date : Date = new Date();
  

  constructor() { }

  public getGreetingMessage() : string {

    const currentHour = this.date.getHours();
    
    if (currentHour >= 6 && currentHour < 12) {
        return 'Good morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
        return  'Good afternoon!';
    } else {
        return 'Good evening!';
    }

  }
  


}
