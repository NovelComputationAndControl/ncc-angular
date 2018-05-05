import {Component, OnInit} from '@angular/core';
import {HttpEventType} from '@angular/common/http';
import {PapersService} from '../papers.service';

@Component({
  selector: 'app-papers-with-editor',
  templateUrl: './papers-with-editor.component.html',
  providers: [PapersService]
})
export class PapersWithEditorComponent implements OnInit {
  data: any[];

  message: string;
  messageType: string;

  constructor(private papers: PapersService) {
  }

  ngOnInit() {
    this.papers.getPapersWithEditor().subscribe(resp => {
      if (resp) {
        this.data = resp.body;
      } else {
        this.setMessage('danger', 'Could not retrieve the list of papers');
      }

    }, (error) => {
      this.setMessage('danger', 'Could not retrieve the list of papers');
    });
  }

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }
}
