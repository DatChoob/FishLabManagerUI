import { Component, OnInit } from '@angular/core';

// to import things from service
import { HomepageService } from '../../shared/api-services/homepage.service';
import { FishFeed } from '../../shared/models/fish-feed';
import { AuthService } from '../../shared/auth.service';
import { NgForm } from '@angular/forms';
import { cloneDeep } from "lodash";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']


})

export class HomeComponent implements OnInit {

  constructor(private homepageService: HomepageService, public authService: AuthService) { }

  fishfeed: FishFeed;
  ngOnInit() {
    //ng onit where initlization is done
    this.homepageService.getLatestStatus()
      .subscribe(newFishFeed => {
        console.log(newFishFeed);
        this.fishfeed = cloneDeep(newFishFeed)

      }
      );

  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.fishfeed.status = form.value.status
      this.homepageService.updateStatus(this.fishfeed).subscribe(newFishFeed => {
        console.log(newFishFeed);
        this.fishfeed = cloneDeep(newFishFeed)
      });
    }
  }

}
