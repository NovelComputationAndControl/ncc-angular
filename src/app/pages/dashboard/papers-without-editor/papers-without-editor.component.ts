import {Component, OnInit} from '@angular/core';
import {PapersService} from '../papers.service';
import {Paper} from '../paper';
import {Router} from '@angular/router';

@Component({
  selector: 'app-papers-without-editor',
  templateUrl: './papers-without-editor.component.html',
  providers: [PapersService]
})
export class PapersWithoutEditorComponent implements OnInit {
  data: any[];

  message: string;
  messageType: string;

  constructor(private papers: PapersService, private router: Router) {
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

  public assignEditor(paper: Paper) {
    this.papers.setPaperEditor(paper.id, 'POST').subscribe(resp => {
      if (resp) {
        this.setMessage('success', 'Editor set successfully!');
        this.router.navigateByUrl(`/paper/${paper.id}`);
      } else {
        this.setMessage('danger', 'Could not set editor!');
      }

    }, (error) => {
      this.setMessage('danger', 'Could not set editor!');
    });
  }

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }
}
