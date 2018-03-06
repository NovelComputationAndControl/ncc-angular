import {Component, OnInit} from '@angular/core';
import {Authors} from '../about-page/about-page.component';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})

export class IndexPageComponent implements OnInit {
  /* The author list is available in the about-page component */
  indexPageAuthors;


  constructor() {
    this.indexPageAuthors = Authors.slice(0, 4);
  }

  ngOnInit() {
  }

}
