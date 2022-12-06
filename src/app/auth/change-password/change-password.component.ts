import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  isLoading: boolean = false;

  curPassVisible = false;
  newPassVisible = false;
  conPassVisible = false;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {
    this.validateForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]],
    });
  }

  confirmValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit(): void {}

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls.confirmPassword.updateValueAndValidity()
    );
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.changePassword();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  changePassword() {
    this.isLoading = true;
    let passwordVo = this.validateForm.value;

    let username = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.authService.changePassword(username, passwordVo).subscribe(
      (response) => {
        this.isLoading = false;
        this.toastr.success('Đổi mật khẩu thành công', 'Success');
        setTimeout(() => {
          window.location.href = "http://10.92.176.57:4201/auth/login";
        }, 500);
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }
}
