import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { userListService } from './user-list-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: userListService, private _router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/pages/authentication/login-v2']);
      return true;
    }
    return true;
  }

  
  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('token')) {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }
}
