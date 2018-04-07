import {Component, OnInit} from '@angular/core';
import {Profile} from './profile';
import {User} from '../../authentication/user';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ProfileService} from './profile.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  profile: Profile;
  user: User;

  profileForm: FormGroup;
  changePasswordForm: FormGroup;

  message: string;
  messageType: string;

  validTitles: any;
  validCountries: any;

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }

  constructor(private auth: AuthenticationService, private profileService: ProfileService, private fb: FormBuilder) {
    this.user = auth.GetUser;
    this.profile = new Profile();
  }

  ngOnInit() {

    // Get the current Profile.
    this.profileService.getProfile().subscribe(resp => {
      if (resp) {
        this.profile = resp;
      }
    }, (error) => {
      if (error && error.error) { // API error
        this.setMessage('danger', error.error.detail || error);
      } else {
        this.setMessage('danger', error);
      }
    });

    this.profileForm = new FormGroup({
      title: new FormControl(this.profile.title),
      phone: new FormControl(this.profile.phone),
      country: new FormControl(this.profile.country),
      affiliation: new FormControl(this.profile.affiliation)
    });

    this.changePasswordForm = new FormGroup({
      old_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      new_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    // Get the an array of valid titles and countries.
    this.validTitles = JSON.parse(localStorage.getItem('validTitles'));
    if (this.validTitles == null) {
      this.profileService.getValidTitles().subscribe(
        resp => {
          localStorage.setItem('validTitles', JSON.stringify(resp));
          this.validTitles = resp;
        });
    }

    this.validCountries = JSON.parse(localStorage.getItem('validCountries'));
    if (this.validCountries == null) {
      this.profileService.getValidCountries().subscribe(
        resp => {
          localStorage.setItem('validCountries', JSON.stringify(resp));
          this.validCountries = resp;
        });
    }
  }

  updateProfile(data: any): void {
    this.profileService.updateProfile(data).subscribe(resp => {
      this.setMessage('success', 'Profile updated!');
    }, (error) => {
      this.setMessage('danger', 'Profile update failed!');
    });
  }

  changePassword(data: any): void {
    if (this.changePasswordForm.controls['old_password'].invalid || this.changePasswordForm.controls['new_password'].invalid) {
      return;
    }

    this.profileService.changePassword(data).subscribe(resp => {
      this.setMessage('success', 'Password changed successfully!');
    }, (error) => {
      this.setMessage('danger', 'Password change failed!');
    });
  }

}
