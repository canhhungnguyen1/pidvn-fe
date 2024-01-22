import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActualDppDataService } from './services/actual-dpp-data.service';

@Component({
  selector: 'app-actual-dpp-data',
  templateUrl: './actual-dpp-data.component.html',
  styleUrls: ['./actual-dpp-data.component.scss'],
})
export class ActualDppDataComponent {
  constructor(
    private toastr: ToastrService,
    private actualDppDataSvc: ActualDppDataService
  ) {}

  dppData: any;

  isLoading: boolean = false;

  getAndWriteExcelActualDppData() {
    this.isLoading = true;
    this.actualDppDataSvc.getAndWriteActualDpp().subscribe((response) => {
      this.isLoading = false;
      this.dppData = response;
    });
  }
}
