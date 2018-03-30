import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface UserData {
  email: string;
  token: string;
  refreshToken: string;
}

@Injectable()
export class AuthenticationService implements UserData {
  email: string;
  token: string;
  refreshToken: string;
  private loginApiUrl: string;
  private registrationApiUrl: string;

  constructor(private http: HttpClient) {
    // TODO: Handle token expiration and refresh.
    this.loginApiUrl = 'http://localhost:8000/api/token-auth/';
    this.registrationApiUrl = 'http://localhost:8000/api/register/';

    // Retrieve the user from localStorage.
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {
      this.setUser(JSON.parse(currentUser));
    }
  }

  // Store the user in the class.
  private setUser(currentUser: any) {
    this.email = currentUser && currentUser.email;
    this.token = currentUser && currentUser.token;
  }

  // Store the user in the class and localStorage.
  private storeUser(email: string, token: string) {
    const currentUser = {
      email: email,
      token: token
    };
    this.setUser(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

  // Deletes the user information from localStorage.
  public logOut() {
    this.email = null;
    this.token = null;
    localStorage.setItem('currentUser', null);
  }

  public isAuthenticated(): boolean {
    return this.token != null;
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
      // noinspection TypeScriptUnresolvedVariable
      const token = response && response['token'];

      if (token) {
        this.storeUser('', token);
        return true;
      }

      return false;
    });
  }

}
