import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PapersService} from '../papers.service';
import {Review} from '../review';

@Component({
  selector: 'app-review-submission',
  templateUrl: './review-submission.component.html'
})
export class ReviewSubmissionComponent implements OnInit {
  private paperId: number;
  message: string;
  messageType: string;

  reviewForm: FormGroup;
  review: Review;

  constructor(private route: ActivatedRoute, private router: Router, private paperService: PapersService) {
    this.paperId = +this.route.snapshot.paramMap.get('id');

    /* Get the id of the paper */
    this.route.parent.params.subscribe(params => {
      this.paperId = +params['id'];

      if (!Number.isInteger(this.paperId)) {
        this.router.navigateByUrl('/404');
      }
    });
  }

  ngOnInit() {
    this.review = null;
    this.reviewForm = new FormGroup({
      appropriate: new FormControl('appropriate', [Validators.required]),
      recommendation: new FormControl('+2', [Validators.required]),
      comment: new FormControl('', [Validators.required])
    });

    this.getSubmittedReviewIfAny();
  }

  private getSubmittedReviewIfAny() {
    this.paperService.getSubmittedReview(this.paperId).subscribe(resp => {
      if (resp && resp.type !== 0) {
        this.review = new Review().copyFrom(resp.body);

        this.reviewForm.setValue({
          appropriate: this.review.appropriate,
          recommendation: this.review.recommendation,
          comment: this.review.comment
        });
      }
    }, (error => {
      this.review = null;
    }));
  }

  onSubmit(data: any) {
    console.log(data);
    this.setMessage('info', 'Submitting...');

    if (this.review) {
      this.paperService.updateReview(this.paperId, data).subscribe(resp => {
        if (resp) {
          this.setMessage('success', 'Your review has been updated!');
        } else {
          this.setMessage('danger', 'Your review has not been updated due to some server error!');
        }
      }, (error) => {
        if (error.status === 403) {
          this.setMessage('warning', error.error.detail);
        } else {
          this.setMessage('danger', 'Something went bad! Could not update review!');
        }
        console.log(error);
      });
    } else {
      this.paperService.submitReview(this.paperId, data).subscribe(resp => {
        if (resp) {
          this.setMessage('success', 'Your review has been submitted successfully!');
        } else {
          this.setMessage('danger', 'Your review has not been submitted due to some server error!');
        }
      }, (error) => {
        if (error.status === 403) {
          this.setMessage('warning', error.error.detail);
        } else {
          this.setMessage('danger', 'Something went bad! Could not submit review!');
        }
        console.log(error);
      });
    }
  }

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }
}
