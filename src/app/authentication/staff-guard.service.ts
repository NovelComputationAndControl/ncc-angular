import {Injectable} from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class StaffGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Hopefully is staff will return the actual boolean value true/false not return
    // true indicating that isStaff is not null/empty. <3 js.
    return this.authService.isStaff();
  }
}
