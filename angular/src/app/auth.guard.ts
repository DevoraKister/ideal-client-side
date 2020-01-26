import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../app/shared/services'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public userSrv: UserService, public router: Router) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      // var user=await this.userSrv.getLoggedUser().toPromise();
    // if (user['isManager'])
    if (localStorage.getItem("manager"))

      return true;
    this.router.navigate(['/home']);
    return false;
  }
}
