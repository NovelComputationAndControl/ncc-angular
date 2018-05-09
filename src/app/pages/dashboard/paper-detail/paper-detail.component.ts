import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Paper} from '../paper';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PapersService} from '../papers.service';

@Component({
  selector: 'app-paper-detail',
  templateUrl: './paper-detail.component.html',
  providers: [PapersService]
})
export class PaperDetailComponent implements OnInit {
  private id: number;
  public paper: Paper;

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
}
