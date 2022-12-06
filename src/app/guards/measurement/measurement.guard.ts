import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeasurementGuard implements CanActivate {
  constructor(
    private jwtHelperService: JwtHelperService,
    private toastr: ToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let roles = atob(localStorage.getItem('roles')!);

    if (roles?.includes('super_admin') || roles?.includes('measurement_member')) {
      return true;
    }
    this.toastr.error(`Bạn không có quyền truy cập`, 'Access Denied');
    return false;
  }
}
