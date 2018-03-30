import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  registrationForm: FormGroup;
  message: string;
  messageType: string;

  ngOnInit() {
  }

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthenticationService) {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required])
    });

    this.setMessage(null, null);
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get firstName() {
    return this.registrationForm.get('first_name');
  }

  get lastName() {
    return this.registrationForm.get('last_name');
  }

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }

  public onSubmit(value: any) {
    if (this.email.invalid || this.password.invalid) {
      return;
    }

    this.setMessage('info', 'Registering...');
    this.auth.registerUser(value).subscribe(resp => {
      if (resp) {
        this.setMessage('success', 'Registration successful! Please login!');
      } else {
        this.setMessage('danger', 'Registration failed!');
      }

    }, (error) => {
      this.setMessage('danger', 'Registration failed!');
    });
  }
}
