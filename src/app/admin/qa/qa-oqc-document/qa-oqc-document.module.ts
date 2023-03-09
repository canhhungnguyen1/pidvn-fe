import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  DxBulletModule, DxButtonModule, DxDataGridModule, DxTemplateModule
} from 'devextreme-angular';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { QaOqcDocumentDetailComponent } from './qa-oqc-document-detail/qa-oqc-document-detail.component';
import { QaOqcDocumentModelsComponent } from './qa-oqc-document-models/qa-oqc-document-models.component';
import { QaOqcDocumentComponent } from './qa-oqc-document.component';
import { QaOqcDocumentRoutingModule } from './qa-oqc-document.routing.module';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [
    QaOqcDocumentComponent,
    QaOqcDocumentModelsComponent,
    QaOqcDocumentDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QaOqcDocumentRoutingModule,
    DxBulletModule,
    DxDataGridModule,
    DxTemplateModule,
    DxButtonModule,
    NzModalModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzTableModule,
    NzSelectModule,
    NzUploadModule,
    NzIconModule
  ],
  providers: [{provide: NzMessageService}]
})
export class QaOqcDocumentModule { }
