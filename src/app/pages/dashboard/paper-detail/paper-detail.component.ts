import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Paper} from '../paper';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PapersService} from '../papers.service';
import {User} from '../../../authentication/user';

@Component({
  selector: 'app-paper-detail',
  templateUrl: './paper-detail.component.html',
  providers: [PapersService]
})
export class PaperDetailComponent implements OnInit {
  private id: number;
  public paper: Paper;
  public message: string;
  public messageType: string;

  constructor(private route: ActivatedRoute, private router: Router, private auth: AuthenticationService, private modalService: NgbModal,
              private papers: PapersService) {
    // We use + in order to convert it to a number.
    this.id = +this.route.snapshot.paramMap.get('id');

    if (!Number.isInteger(this.id)) {
      this.router.navigateByUrl('/404');
    }
  }

  public isStaff(): boolean {
    return this.auth.isStaff();
  }

  public showActionWindow(): boolean {
    // TODO: Incomplete;
    return this.isStaff();
  }

  public showReviewersWindow(): boolean {
    return this.paper.user.id === this.auth.GetUser.id;
  }

  public hasReviewers(): boolean {
    return this.paper.reviewers && this.paper.reviewers.length !== 0;
  }

  setEditor(paper: Paper, e: Event) {
    e.preventDefault();
    this.papers.setPaperEditor(paper.id, 'POST').subscribe(resp => {
      if (resp) {
        this.setMessage('success', 'Editor set successfully!');
        this.paper.editor = this.auth.GetUser;
      } else {
        this.setMessage('danger', 'Could not set editor!');
      }

    }, (error) => {
      this.setMessage('danger', 'Could not set editor!');
    });
  }

  deleteReviewer(rev: User, e: Event) {
    e.preventDefault();
    this.papers.setReviewer(rev.id, this.paper.id, 'DELETE').subscribe(resp => {
      if (resp) {
        this.setMessage('success', 'Reviewer removed!');
        // Delete the reviewer from current reviewers.
        const index = this.paper.reviewers.indexOf(rev);
        if (index > -1) {
          this.paper.reviewers.splice(index, 1);
        }
      } else {
        this.setMessage('danger', 'Could not remove reviewer!');
      }

    }, (error) => {
      this.setMessage('danger', 'Could perform selected operation!');
    });
  }

  addReviewer(elem: HTMLInputElement) {
    const id = +elem;
    if (!id) {
      return;
    }

    this.papers.setReviewer(id, this.paper.id, 'PUT').subscribe(resp => {
      if (resp) {
        this.setMessage('success', 'Reviewer added!');
        if (resp.ok) { /* Add reviewers to paper */
          this.paper.reviewers = [];
          this.paper.addReviewers(resp.body);
        }
      } else {
        this.setMessage('danger', 'Could not add reviewer!');
      }

    }, (error) => {
      this.setMessage('danger', 'Could perform selected operation!');
    });
  }

  deleteEditor(paper: Paper, e: Event) {
    e.preventDefault();
    this.papers.setPaperEditor(paper.id, 'DELETE').subscribe(resp => {
      if (resp) {
        this.setMessage('success', 'Editor deleted successfully!');
        this.paper.editor = null;
      } else {
        this.setMessage('danger', 'Could not set editor!');
      }

    }, (error) => {
      this.setMessage('danger', 'Could not set editor!');
    });
  }

  ngOnInit() {
    this.papers.getPaperDetail(this.id).subscribe(resp => {
      if (resp) {
        this.paper = new Paper().copyFrom(resp.body);
      } else {
        this.router.navigateByUrl('/404');
      }

    }, (error) => {
      this.router.navigateByUrl('/404');
    });
  }

  openFeedBackModal(content, event) {
    event.preventDefault();
    this.modalService.open(content).result.then((result) => {
    });
  }

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }


}
