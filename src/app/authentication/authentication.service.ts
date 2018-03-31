import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user';
import 'rxjs/add/operator/map';

// TODO: Find a way to return more meaningful errors. I.e create a class
@Injectable()
export class AuthenticationService {
  private user: User;

  private loginApiUrl: string;
  private registrationApiUrl: string;

  constructor(private http: HttpClient) {
    this.loginApiUrl = 'http://localhost:8000/api/token-auth/';
    this.registrationApiUrl = 'http://localhost:8000/api/register/';

    // Retrieve the user from localStorage.
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null) {
      // Check if the token is expired.
      if (new Date() < new Date(currentUser.expiration_date * 1000)) {
        this.setUser(currentUser);
      }
      /* else sessions has expired */
    }
  }

  // Deletes the user information from localStorage.
  public logOut() {
    this.user = null;
    localStorage.setItem('currentUser', null);
  }

  public isAuthenticated(): boolean {
    return this.user && this.user.Token != null && new Date() < new Date(this.user.ExpirationDate * 1000);
  }

  // Registers the user
  public registerUser(value: any): Observable<boolean> {
    const data = {
      email: value && value.email || null,
      password: value && value.password || null,
      first_name: value && value.first_name || null,
      last_name: value && value.last_name || null
    };

    return this.http.post(this.registrationApiUrl, data).map((response: Response) => {
      const email = response && response['email'];
      return !!email;
    });
  }

  // Authenticates an user, returns true if successful false otherwise.
  public authenticateUser(email: string, password: string): Observable<boolean> {
    const data = {
      username: email,
      password: password
    };

    return this.http.post(this.loginApiUrl, data).map((response: Response) => {
      const token: Response | any = response && response['token'];
      if (token) {
        this.setUser(response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        return true;
      }
      return false;
    });
  }

  private setUser(response: Response) {
    this.user = new User();
    this.user.copyInto(response);
  }
}
