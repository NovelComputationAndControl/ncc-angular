import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../../authentication/authentication.service';

@Injectable()
export class PapersService {
  private headers: HttpHeaders;

  private submittedPapersUrl = 'http://127.0.0.1:8000/api/papers';
  private papersWithEditorUrl = 'http://127.0.0.1:8000/api/papers/editor/';
  private papersWithSelfEditorUrl = 'http://127.0.0.1:8000/api/papers/editor/self';
  private papersWithoutEditorUrl = 'http://127.0.0.1:8000/api/papers/no-editor/';
  private papersToReviewUrl = 'http://127.0.0.1:8000/api/papers/reviewer/';
  private paperDetailsUrl = 'http://127.0.0.1:8000/api/papers/detail/';
  private setPaperEditorUrl = 'http://127.0.0.1:8000/api/papers/editor/';
  private setReviewerUrl = 'http://127.0.0.1:8000/api/papers/reviewer/';
  private getEditorReviewUrl = 'http://127.0.0.1:8000/api/papers/paper_id/reviews/editor';
  private getAllReviewsUrl = 'http://127.0.0.1:8000/api/papers/paper_id/reviews/';
  private submitReviewUrl = 'http://127.0.0.1:8000/api/review/';
  private getUpdateReviewUrl = 'http://127.0.0.1:8000/api/papers/review/paper_id/';
  private listUsersUrl = 'http://127.0.0.1:8000/api/account/users/';

  constructor(private http: HttpClient, private auth: AuthenticationService) {

    this.headers = new HttpHeaders()
      .set('Authorization', 'JWT ' + auth.GetUser.token);
  }

  // deleteReviewer deletes a reviewer from a paper.
  public setReviewer(revId: number, paperId: number, method: string): Observable<any> {
    const options = {
      headers: this.headers,
    };
    const data = new FormData();
    data.append('user_pk', revId.toString());

    const req = new HttpRequest(method, `${this.setReviewerUrl}${paperId}/`, data, options);
    return this.http.request(req);
  }

  // getEditorReview returns the editor review for the paper with the supplied id.
  public getEditorReview(id: number): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.getEditorReviewUrl.replace('paper_id', id.toString()), null, options);
    return this.http.request(req);
  }

  // getListOfReviews returns all reviews for the specified paper.
  public getAllReviews(paperId: number): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.getAllReviewsUrl.replace('paper_id', paperId.toString()), null, options);
    return this.http.request(req);
  }

  // getSubmittedPapers returns a JSON object containing a list of user submitted papers.
  public getSubmittedPapers(): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.submittedPapersUrl, null, options);
    return this.http.request(req);
  }

  // getPapersWithEditor returns a JSON object containing all the papers that have an editor.
  public getPapersWithEditor(): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.papersWithEditorUrl, null, options);
    return this.http.request(req);
  }

  // getPapersWithEditorSelf returns a JSON object containing all the papers on which the user is an editor.
  public getPapersWithEditorSelf(): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.papersWithSelfEditorUrl, null, options);
    return this.http.request(req);
  }

  // getToReviewPapers returns a JSON object containing all the papers that have the requesting user assigned as a reviewer..
  public getToReviewPapers(): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.papersToReviewUrl, null, options);
    return this.http.request(req);
  }

  // getPaperDetail returns a JSON object containing the paper detail.
  public getPaperDetail(id: number): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', `${this.paperDetailsUrl}${id}/`, null, options);
    return this.http.request(req);
  }

  // setPaperEditor sets the calling user as the editor. The calling user is determined via authorization header.
  // param id: The id of the paper.
  // param method: POST will set the editor; DELETE will delete the editor.
  public setPaperEditor(id: number, method: string): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest(method, `${this.setPaperEditorUrl}${id}/`, null, options);
    return this.http.request(req);
  }

  // getPapersWithoutEditor returns a JSON object containing papers that don't have an assigned editor.
  public getPapersWithoutEditor(): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.papersWithoutEditorUrl, null, options);
    return this.http.request(req);
  }

  // submitReview submits a review for paper provided by paperId
  public submitReview(paperId: number, reviewData: any): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('appropriate', reviewData && reviewData.appropriate || null);
    formData.append('recommendation', reviewData && reviewData.recommendation || null);
    formData.append('comment', reviewData && reviewData.comment || null);
    formData.append('paper', paperId.toString());

    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('POST', this.submitReviewUrl, formData, options);
    return this.http.request(req);
  }

  // updateReview updates the already submitted review.
  public updateReview(paperId: number, reviewData: any): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('appropriate', reviewData && reviewData.appropriate || null);
    formData.append('recommendation', reviewData && reviewData.recommendation || null);
    formData.append('comment', reviewData && reviewData.comment || null);

    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('PUT', this.getUpdateReviewUrl.replace('paper_id', paperId.toString()), formData, options);
    return this.http.request(req);
  }

  // getSubmittedReview returns the self submitted review.
  public getSubmittedReview(paperId: number): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.getUpdateReviewUrl.replace('paper_id', paperId.toString()), null, options);
    return this.http.request(req);
  }

  // searchUser returns a list of users that match the email address.
  public searchUser(value: string): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', `${this.listUsersUrl}?email=${value}`, null, options);
    return this.http.request(req);
  }
}
