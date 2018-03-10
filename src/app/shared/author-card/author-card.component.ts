import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.css']
})

export class AuthorCardComponent implements OnInit {
  @Input() authorName: String;
  @Input() authorRole: String;
  @Input() authorDescription: String;
  @Input() authorTwitter: String;
  @Input() authorWebsite: String;

  constructor() {
  }

  ngOnInit() {
  }

}
