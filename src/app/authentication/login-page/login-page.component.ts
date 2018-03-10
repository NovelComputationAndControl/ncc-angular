///<reference path="../../../../node_modules/@angular/router/src/router.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {
  FormBuilder, FormControl,
  FormGroup
} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  message: string;
  messageType: string;


  constructor(private router: Router, private fb: FormBuilder, private auth: AuthenticationService) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });

    this.setMessage(null, null);
  }

  ngOnInit() {
  }

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }

  onSubmit(value: any): void {
    const email: string = value && value.email || null;
    const password: string = value && value.password || null;

    this.setMessage('info', 'Authenticating...');
    this.auth.authenticateUser(email, password).subscribe(resp => {
      if (resp) {
        this.setMessage('success', 'Authentication successful!');
        this.router.navigate(['']);
      } else {
        this.setMessage('danger', 'Authentication failed!');
      }

    }, (error) => {
      this.setMessage('danger', 'Authentication failed!');
    });
  }

}
