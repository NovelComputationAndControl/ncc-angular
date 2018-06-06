import {Component, OnInit} from '@angular/core';
import {PapersService} from '../papers.service';
import {Paper} from '../paper';

@Component({
  selector: 'app-papers-to-review',
  templateUrl: './papers-to-review.component.html',
})
export class PapersToReviewComponent implements OnInit {
  data: any[];

  message: string;
  messageType: string;

  constructor(private papers: PapersService) {
  }

  ngOnInit() {
    this.papers.getToReviewPapers().subscribe(resp => {
      if (resp) {
        this.data = resp.body;
      } else {
        this.setMessage('danger', 'Could not retrieve the list of submitted papers');
      }

    }, (error) => {
      this.setMessage('danger', 'Could not retrieve the list of submitted papers');
    });
  }

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }

}
