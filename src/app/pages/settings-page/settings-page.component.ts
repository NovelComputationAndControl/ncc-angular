import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  title: string;
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  email: string;
  affiliation: string;

  constructor() {
    this.title = 'Mr. ';
    this.firstName = 'Denis';
    this.lastName = 'Nucu';
    this.phone = '777-7777-7777';
    this.email = 'denis@cosmin.com';
    this.affiliation = 'UPT';
    this.country = "Romania";
  }

  ngOnInit() {
  }

}
