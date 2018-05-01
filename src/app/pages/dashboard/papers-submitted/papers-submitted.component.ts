import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-papers-submitted',
  templateUrl: './papers-submitted.component.html',
})
export class PapersSubmittedComponent implements OnInit {
  data: any;

  constructor() {
    this.data = [
      {
        'user': 2,
        'editor': null,
        'title': 'asd',
        'description': 'asd',
        'authors': 'asd',
        'status': 'processing',
        'manuscript': 'http://127.0.0.1:8000/media/papers/2_denis%40denis.com/asd/Project-1-Automatic-control-of-a-greenhouse_zWW9Jzi.pdf',
        'cover_letter': 'http://127.0.0.1:8000/media/papers/2_denis%40denis.com/asd/Project-1-Automatic-control-of-a-greenhouse_XuKWSFu.pdf',
        'supplementary_materials': null,
        'reviewers': []
      },
      {
        'user': 2,
        'editor': null,
        'title': 'asd',
        'description': 'asd',
        'authors': 'asd',
        'status': 'processing',
        'manuscript': 'http://127.0.0.1:8000/media/papers/2_denis%40denis.com/asd/Project-1-Automatic-control-of-a-greenhouse_vgxvx6Z.pdf',
        'cover_letter': 'http://127.0.0.1:8000/media/papers/2_denis%40denis.com/asd/Project-1-Automatic-control-of-a-greenhouse_9xY8ejk.pdf',
        'supplementary_materials': null,
        'reviewers': []
      },
    ];
  }

  ngOnInit() {
  }

}
