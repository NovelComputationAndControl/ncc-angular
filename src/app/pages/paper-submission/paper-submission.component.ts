import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PaperSubmissionService} from './paper-submission.service';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-paper-submission',
  templateUrl: './paper-submission.component.html',
  providers: [PaperSubmissionService]
})
export class PaperSubmissionComponent implements OnInit {
  successfulSubmission: boolean;
  paperSubmitForm: FormGroup;
  fileList: {};

  message: string;
  messageType: string;

  constructor(private paperSubmit: PaperSubmissionService) {
    this.paperSubmitForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(4096)]),
      authors: new FormControl('', [Validators.required, Validators.maxLength(4096)]),
      manuscript: new FormControl(null, [Validators.required]),
      cover_letter: new FormControl(null, [Validators.required]),
      supplementary_materials: new FormControl(null)
    });

    this.fileList = {};
    this.successfulSubmission = false;
  }

  ngOnInit() {
  }

  public selectManuscript(event) {
    this.fileList['manuscript'] = event.target.files[0];
  }

  public selectCoverLettter(event) {
    this.fileList['cover_letter'] = event.target.files[0];
  }

  public selectSupplementaryMaterials(event) {
    this.fileList['supplementary_materials'] = event.target.files[0];
  }

  onSubmit(data: any): void {
    if (this.paperSubmitForm.invalid) {
      return;
    }

    const fileList = this.fileList;
    const self = this;

    this.setMessage('info', 'Submitting...');
    this.paperSubmit.submitPaper(data, fileList).subscribe(resp => {
      if (resp.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * resp.loaded / resp.total);
        this.setMessage('success', 'Your paper is uploading... ' + percentDone);
      } else if (resp) {
        self.successfulSubmission = true;
        this.setMessage('success', 'Your paper has been submitted successfully!');
      } else {
        this.setMessage('danger', 'Your paper has not been submitted!');
      }

    }, (error) => {
      this.setMessage('danger', error);
    });
  }

  private setMessage(type: string, mess: string) {
    this.message = mess;
    this.messageType = type;
  }
}
