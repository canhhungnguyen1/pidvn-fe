import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { QaComponent } from './qa/qa.component';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
@NgModule({
  declarations: [
    AdminComponent,
    WelcomeComponent,
    QaComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AdminRoutingModule,
    FormsModule,
    NzLayoutModule,
    NzIconModule,
    NzMenuModule,
    NzGridModule,
    NzAvatarModule,
    NzDropDownModule,
    NzDrawerModule,
    NzModalModule,
    NzBackTopModule,
    NzBadgeModule,
    NzButtonModule,
    NzSelectModule
  ]
})
export class AdminModule { }
