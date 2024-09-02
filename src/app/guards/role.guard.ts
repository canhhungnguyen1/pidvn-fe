import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AuthService } from "../auth/services/auth.service";


@Injectable({
    providedIn: 'root'
})
export class RoleGuard  {

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private jwtHelperService: JwtHelperService
    ) { }

    canActivate (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        
        const accessRoles = route.data.roles;

        let userRoles = this.jwtHelperService.decodeToken(
            localStorage.getItem('accessToken')?.toString()
          ).Roles;

        for(let role of userRoles) {
            if (accessRoles.includes(role)) {
                return true;
            }
        }

        this.toastr.error(`Bạn không có quyền truy cập nhé`, 'Ôi bạn ơi !');
        this.router.navigate(['auth/forbidden']);
        return false;
    }
    
}