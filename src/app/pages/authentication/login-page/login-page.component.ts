import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  FormBuilder, FormControl,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private http: HttpClient, fb: FormBuilder) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    console.log('Hello world!');
  }

  onSubmit(value: object): void {
    console.log(value);
  }

}
