import { Component } from '@angular/core';

import { names } from '../models/names';

@Component({
  selector: 'app-root',
  template: `
  <h1>{{title}}</h1>
  <h2>Welcome {{myHero.name}}</h2>
  
`
})
export class HomeComponent {
  
  names = [
    new names(1, 'Junaid'),
    new names(13, 'Sason'),
    new names(15, 'Chris'),
    new names(20, 'Keevan Chansoriano'),
    new names(19, 'hamlet'),
    new names(132, 'Gus'),
  ];
  // Fstatus = [
  //   new Fishstatus('Fed'),
  //   new Fishstatus('Not Fed'),

  // ];
  myName = this.names[2];
  fedBy = this.names[3];
  // Status= this.Fstatus[0];
  
 

}