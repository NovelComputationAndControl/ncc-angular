import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {AuthenticationService} from '../../authentication/authentication.service';

@Injectable()
export class PapersService {
  private submittedPapersUrl: string;
  private papersWithEditorUrl: string;
  private papersWithoutEditorUrl: string;
  private paperDetailsUrl: string;

  private headers: HttpHeaders;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.submittedPapersUrl = 'http://127.0.0.1:8000/api/papers';
    this.papersWithEditorUrl = 'http://127.0.0.1:8000/api/papers/editor/';
    this.papersWithoutEditorUrl = 'http://127.0.0.1:8000/api/papers/no-editor/';
    this.paperDetailsUrl = 'http://127.0.0.1:8000/api/papers/detail/';

    this.headers = new HttpHeaders()
      .set('Authorization', 'JWT ' + auth.GetUser.token);
  }

  public getSubmittedPapers(): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.submittedPapersUrl, null, options);
    return this.http.request(req);
  }

  public getPapersWithEditor(): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.papersWithEditorUrl, null, options);
    return this.http.request(req);
  }

  public getPaperDetail(id: number): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', `${this.paperDetailsUrl}${id}/`, null, options);
    return this.http.request(req);
  }

  public getPapersWithoutEditor(): Observable<any> {
    const options = {
      headers: this.headers,
    };

    const req = new HttpRequest('GET', this.papersWithoutEditorUrl, null, options);
    return this.http.request(req);
  }
}
