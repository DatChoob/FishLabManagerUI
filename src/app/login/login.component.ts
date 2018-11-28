import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  
  incorrectLoginCredentials:boolean = false;
  
  ngOnInit() {
    if(this.authService.isLoggedIn){
      this.router.navigate(['']);
    }
  }

  onSubmit(form: NgForm) { 
    if (form.valid){
       this.authService.login(form.value.username,form.value.password)
      .subscribe(
        result => {
          this.router.navigate(['']);
        },
        err => {
          console.log(err);
          this.incorrectLoginCredentials = true;
        });
    }
  }

}
