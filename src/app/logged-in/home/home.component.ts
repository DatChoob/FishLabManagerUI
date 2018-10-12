import { Component, OnInit, Output,  } from '@angular/core';
import { names } from '../../shared/models/names';

// to import things from service
import { HomepageService } from '../../shared/api-services/homepage.service';
import { FishFeed } from '../../shared/models/fish-feed';
import { AuthService } from '../../shared/auth.service';
import { NgForm } from '@angular/forms';
import { cloneDeep, update } from "lodash";
import { updateLocale } from 'moment';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { emit } from 'cluster';
import { OutputType } from '@angular/core/src/view';

import {MatSnackBar} from '@angular/material';
import { duration, isDuration } from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']


})

export class HomeComponent implements OnInit {

  constructor(private homepageService: HomepageService, public snackBar: MatSnackBar, public authService: AuthService) { }

  fishfeed: FishFeed;
  ngOnInit() {
    //ng onit where initlization is done
    this.homepageService.getLatestStatus()
      .subscribe(newFishFeed => {
        console.log(newFishFeed);
        this.fishfeed = cloneDeep(newFishFeed)
        //this.snackBar.open("Saved", "", {duration:1000});
      }
      );

  }

  onSubmit(form: NgForm) {
    //if form is vaild take the status from value and 
    // update my local fish feed wiht status
    
    console.log(form);
    //form.status.update;
    //form Status: {{ NgForm.status}}
    //update.form;
     if (form.valid) 
     {
       this.fishfeed.status=form.value.status
        this.homepageService.updateStatus(this.fishfeed)
        .subscribe(newFishFeed => {
        console.log(newFishFeed);
        this.fishfeed = cloneDeep(newFishFeed)
        this.snackBar.open("Saved", "", {duration:1000});
       //bindingUpdated
       //form.value.status.update;
       // this.fishfeed.value.updateStatus; 
       //FishFeed.arguments.update
      
      }
      );
        //status.replace
        //Output
      }
        


  }

  updateStatus(status: FishFeed ){
    this.homepageService.getLatestStatus
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
     });
  }
}
