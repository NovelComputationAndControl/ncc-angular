import {Component, OnInit} from '@angular/core';

export const Authors = [
  {
    name: 'Mihai Udrescu',
    role: 'Editor-in-Chief',
    description: 'Universitatea Politehnica Timisoara',
    website: 'https://peerj.com/MUdrescu/',
    twitter: 'https://twitter.com/MihaiUdrescu'
  },
  {
    name: 'Radu Marculescu',
    role: 'Associate Editor-in-Chief',
    description: 'Universitatea Politehnica Timisoara',
    website: 'https://peerj.com/rmarculescu/',
    twitter: 'https://twitter.com/rmarculescu'
  },
  {
    name: 'Paul Bogdan',
    role: 'Editor-in-Chief',
    description: 'Universitatea Politehnica Timisoara',
    website: 'https://viterbi.usc.edu/directory/faculty/Bogdan/Paul',
    twitter: null
  },
  {
    name: 'Lucian Prodan',
    role: 'Editor-in-Chief',
    description: 'Universitatea Politehnica Timisoara',
    website: 'http://www.acsa.upt.ro/about_us/lucian_prodan.htm',
    twitter: null
  },
  {
    name: 'Hitoshi Oi',
    role: 'Editor',
    description: 'University of Aizu Japan',
    website: null,
    twitter: null
  },
  {
    name: 'Jean Luca Tempesi',
    role: 'Editor',
    description: 'University of York UK',
    website: null,
    twitter: null
  },
  {
    name: 'Ioan Dumitrache',
    role: 'Editor',
    description: 'Universitatea Politehnica Bucuresti',
    website: null,
    twitter: null
  },
  {
    name: 'Liviu Miclea',
    role: 'Editor',
    description: 'Universitatea Tehnica din Cluj Napoca',
    website: null,
    twitter: null
  },
  {
    name: 'Lucian Vintan',
    role: 'Editor',
    description: 'Universitatea "Lucian Blaga" din Sibiu',
    website: null,
    twitter: null
  },
  {
    name: 'Radu-Emil Precup',
    role: 'Editor',
    description: 'Universitatea Politehnica Timisoara',
    website: null,
    twitter: null
  },
];

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  indexPageAuthors;

  constructor() {
    this.indexPageAuthors = Authors;
  }

  ngOnInit() {
  }
}
