import {Component, OnInit} from '@angular/core';
import {Profile} from './profile';
import {User} from '../../authentication/user';
import {AuthenticationService} from '../../authentication/authentication.service';
import {ProfileService} from './profile.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  profile: Profile;
  user: User;

  message: string;
  messageType: string;

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }

  constructor(private auth: AuthenticationService, private profileService: ProfileService) {
    this.user = auth.GetUser;
    this.profile = new Profile();

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
  }

  ngOnInit() {
  }

}
