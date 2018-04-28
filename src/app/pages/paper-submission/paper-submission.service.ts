import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../../authentication/authentication.service';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

@Injectable()
export class PaperSubmissionService {
  private apiUrl: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.apiUrl = 'http://127.0.0.1:8000/api/papers/';

    this.headers = new HttpHeaders()
    // .set('Content-Type', 'multipart/form-data')
      .set('Authorization', 'JWT ' + auth.GetUser.token);
  }

  private static handleError(error: HttpErrorResponse) {
    console.log(error);
    if (error.error.type === HttpErrorResponse) {
      return new ErrorObservable('An error occurred:' + error.error.detail);
    }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return new ErrorObservable('An network error occurred:' + error.error.message);
    }

    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

  public submitPaper(receivedData: any, fileList: any): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('title', receivedData && receivedData.title || null);
    formData.append('description', receivedData && receivedData.description || null);
    formData.append('authors', receivedData && receivedData.authors || null);
    formData.append('manuscript', fileList && fileList['manuscript']);
    formData.append('cover_letter', fileList && fileList['cover_letter']);
    if (formData.get('supplementary_materials') != null) {
      formData.append('supplementary_materials', fileList && fileList['supplementary_materials']);
    }

    const options = {
      headers: this.headers,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', this.apiUrl, formData, options);
    return this.http.request(req);
  }

}
