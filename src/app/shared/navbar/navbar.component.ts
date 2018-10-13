import {Component} from '@angular/core';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private _isAuthenticated: boolean;
  public isCollapsed = true;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.checkIfAuthenticated();
  }

  public checkIfAuthenticated(): boolean {
    this._isAuthenticated = this.auth.isAuthenticated();
    return this._isAuthenticated;
  }

  public isStaff(): boolean {
    return this.auth.isStaff();
  }

  public logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/');
  }
}
