import { Component, OnInit } from '@angular/core';
import { names } from '../../shared/models/names';
 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  names = [
    new names(1, 'Junaid'),
    new names(13, 'Sason'),
    new names(15, 'Chris'),
    new names(20, 'Keevan Chansoriano'),
    new names(13, 'Fed'),
    new names(15, 'Not Fed'),
  ];

  myName = this.names[2];
  fedBy = this.names[3];
  Fstatus = this.names[4];


 
}
