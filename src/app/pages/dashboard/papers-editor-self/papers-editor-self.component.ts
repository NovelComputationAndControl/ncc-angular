import {Component, OnInit} from '@angular/core';
import {PapersService} from '../papers.service';

@Component({
  selector: 'app-papers-editor-self',
  templateUrl: './papers-editor-self.component.html',
  providers: [PapersService]
})
export class PapersEditorSelfComponent implements OnInit {
  data: any[];

  message: string;
  messageType: string;

  constructor(private papers: PapersService) {
  }

  ngOnInit() {
    this.papers.getPapersWithEditorSelf().subscribe(resp => {
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
