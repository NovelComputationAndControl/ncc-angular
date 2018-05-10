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
  private setPaperEditorUrl: string;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.submittedPapersUrl = 'http://127.0.0.1:8000/api/papers';
    this.papersWithEditorUrl = 'http://127.0.0.1:8000/api/papers/editor/';
    this.papersWithoutEditorUrl = 'http://127.0.0.1:8000/api/papers/no-editor/';
    this.paperDetailsUrl = 'http://127.0.0.1:8000/api/papers/detail/';
    this.setPaperEditorUrl = 'http://127.0.0.1:8000/api/papers/editor/';

    this.headers = new HttpHeaders()
      .set('Authorization', 'JWT ' + auth.GetUser.token);
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
}
