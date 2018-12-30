import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged = false;
  loginForm: FormGroup;
  password: string;
  wrongPassword = false;
  title = 'app';

  constructor(private authservice: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.isLogged = this.authservice.isAuthenticated();
    this.loginForm = new FormGroup({
      password: new FormControl(null, Validators.required)
    });
  }
  onSubmitLogin() {
    this.password = this.loginForm.value.password;
    this.authservice.signIn(this.password).then((response) => {
      const token = (<any>response).token;
      localStorage.setItem('tmr', token);
      this.isLogged = true;
      this.wrongPassword = false;
    }). catch((reason) => {
      this.wrongPassword = true;
    });
  }
}