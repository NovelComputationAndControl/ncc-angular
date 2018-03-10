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
  private apiUrl: string;

  constructor(private http: HttpClient) {
    // TODO: Create an API for login in the Backend!
    this.apiUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBNtP_WfX4Nh3b7mtk2oK8pMd6CnO-8Pxw';

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.setUser(currentUser);
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

  // Authenticates an user, returns true if successful false otherwise.
  authenticateUser(email: string, password: string): Observable<boolean> {
    const data = {
      email: email,
      password: password
    };

    return this.http.post(this.apiUrl, data).map((response: Response) => {
      // noinspection TypeScriptUnresolvedVariable
      const token = response && response['idToken'];
      const rEmail = response && response['email'];

      if (rEmail && token) {
        this.storeUser(rEmail, token);
        return true;
      }

      return false;
    });
  }

}
