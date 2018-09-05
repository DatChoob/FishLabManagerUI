import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // To test the authService This will need to be removed
    // TODO: implement real login scenario
    this.authService.login("josh", "test")
      .subscribe(
        result => console.log(result),
        err => console.log(err));
  }

  onSubmit(form: NgForm) { 
    if (form.valid){
      console.log(form);
    }
  }

}
