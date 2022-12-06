import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        let accessToken = route.queryParams['accessToken'];
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
        }

        if (!this.authService.isAuthenticated()) {
            this.toastr.error(`Bạn cần đăng nhập hệ thống !`, 'Unauthorized');
            this.router.navigate(['auth/login'], {queryParams: {returnUrl: state.url}})
            return false;
        }
        return true;
    }
}