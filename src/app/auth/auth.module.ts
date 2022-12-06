import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ForbiddenComponent } from './commons/pages/forbidden/forbidden.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    ForbiddenComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzSpinModule, 
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCollapseModule,
    NzGridModule,
    NzAlertModule,
    NzSpaceModule
  ]
})
export class AuthModule { }
