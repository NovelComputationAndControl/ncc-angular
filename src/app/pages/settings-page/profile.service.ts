import {Injectable} from '@angular/core';
import {Profile} from './profile';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ProfileService {
  private profile: Profile;
  private apiProfileUrl: string;
  private headers: HttpHeaders;

  constructor(private auth: AuthenticationService, private http: HttpClient) {
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'JWT ' + auth.GetUser.token);

    this.apiProfileUrl = 'http://127.0.0.1:8000/api/profile/' + auth.GetUser.profile_pk + '/';
    this.profile = new Profile();
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      return new ErrorObservable('An error occurred:' + error.error.message);
    }

    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

  // Get the profile from server.
  public getProfile(): Observable<any> {
    return this.http.get(this.apiProfileUrl, {headers: this.headers}).map((response: Response) => {
      this.profile.copyInto(response);
      return this.profile;
    }).pipe(catchError(ProfileService.handleError));
  }

  public updateProfile(data: Response): Observable<any> {
    return new ErrorObservable('Not Implemennted!');
  }
}
