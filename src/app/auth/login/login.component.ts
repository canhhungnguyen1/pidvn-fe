import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Account } from '../models/Account';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PreviousRouteService } from '../services/previous.route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('usernameIpt') usernameIpt!: ElementRef;
  @ViewChild('passwordIpt') passwordIpt!: ElementRef;

  constructor(
    private modal: NzModalService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private activatedRoute: ActivatedRoute,
    private previousRouteSvc: PreviousRouteService
  ) {}

  isLoading: boolean = false;
  toggleForm = 'wrapper';
  accountLogin: Account = new Account();
  returnUrl!: string;
  isShowPassword: boolean = false;

  ngOnInit(): void {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    setTimeout(() => {
      this.usernameIpt.nativeElement.focus();
    }, 0);

    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.previousRouteSvc.getPreviousUrl()]);
    }
  }

  info(): void {
    this.modal.info({
      nzTitle: 'Ôi bạn ơi !',
      nzContent: `
        Liên hệ: phòng IT để được hỗ trợ
      `,
    });
  }

  isNeedToChangePassword(password: any): boolean {
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&`])[A-Za-z\d@$!%*#?&`]{8,}$/;
    if (!pwRegex.test(password)) {
      return true;
    }
    return false;
  }

  login() {
    if (!this.accountLogin.username || !this.accountLogin.password) {
      this.toastr.warning('Bạn cần nhập Username & Password');
      return;
    }

    this.isLoading = true;

    this.authService.login(this.accountLogin).subscribe(
      (response) => {

        let name = this.jwtHelperService.decodeToken(
          response.accessToken
        ).FullName;
        localStorage.setItem('accessToken', response.accessToken);

        if (this.isNeedToChangePassword(this.accountLogin.password)) {
          this.toastr.warning('You need to change the password', 'Warning');
          this.router.navigate(['auth/change-password']);
          return;
        }

        this.authService
          .getRoleAndPermission(this.accountLogin.username)
          .subscribe((response) => {
            this.isLoading = false;


            // Tạo token2 cho hệ thống của Hà
            this.authService
              .generateJWT(this.accountLogin.username)
              .subscribe((response) => {
                localStorage.setItem('token2', response.token);




                if (this.returnUrl == '/') {
                  this.router.navigate(['admin/welcome']);
                } else {
                  this.router.navigateByUrl(this.returnUrl);
                }
    
                this.toastr.success(`${name}`, `Xin chào`);

              });

            
          });
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  

  togglePassword() {
    this.isShowPassword = !this.isShowPassword;
  }


}
