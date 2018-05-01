import {Component, OnInit} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {PapersService} from '../papers.service';

@Component({
  selector: 'app-papers-submitted',
  templateUrl: './papers-submitted.component.html',
  providers: [PapersService]
})
export class PapersSubmittedComponent implements OnInit {
  data: any[];

  message: string;
  messageType: string;

  constructor(private papers: PapersService) {
  }

  ngOnInit() {
    this.papers.getSubmittedPapers().subscribe(resp => {
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
