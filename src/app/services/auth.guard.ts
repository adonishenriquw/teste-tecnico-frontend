import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { StorageService } from './storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    let isAuthenticated = Boolean(this.storage.getIsValid());
    if (!isAuthenticated) {
      this.router.navigate(['/authentication']);
    }
    return isAuthenticated;
  }
}
