import {Component, OnInit} from '@angular/core';
import {PapersService} from '../papers.service';

@Component({
  selector: 'app-papers-without-editor',
  templateUrl: './papers-without-editor.component.html',
  providers: [PapersService]
})
export class PapersWithoutEditorComponent implements OnInit {
  data: any[];

  message: string;
  messageType: string;

  constructor(private papers: PapersService) {
  }

  ngOnInit() {
    this.papers.getPapersWithoutEditor().subscribe(resp => {
      if (resp) {
        this.data = resp.body;
      } else {
        this.setMessage('danger', 'Could not retrieve the list of papers');
      }

    }, (error) => {
      this.setMessage('danger', 'Could not retrieve the list of papers');
    });
  }

  public assignEditor() {
    console.log('assignEditor not implemented');
    // assign editor
    // redirect to details.
  }

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }
}
