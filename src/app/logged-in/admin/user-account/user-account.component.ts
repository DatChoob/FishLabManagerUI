import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  id : string;
  constructor(private readonly route: ActivatedRoute) {
    this.id = route.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit() {
  }

}
