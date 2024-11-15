import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { RePrService } from '../services/re-pr.service';
import { RequestDto } from '../models/RequestDto';
import { DxDataGridComponent } from 'devextreme-angular';
import { SearchDto } from '../models/SearchDto';

@Component({
  selector: 'app-re-pr-request',
  templateUrl: './re-pr-request.component.html',
  styleUrl: './re-pr-request.component.scss',
})
export class RePrRequestComponent implements OnInit, AfterViewInit {

  @ViewChild(DxDataGridComponent, { static: false })
  requestGrid!: DxDataGridComponent;


  constructor(
    private toastr: ToastrService,
    private rePrSvc: RePrService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router
  ) {}

  requests: RequestDto[] = [];

  searchParam: SearchDto = new SearchDto();

  ngOnInit(): void {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - 120);
    this.searchParam.dateRange = [pastDate, today]
  }

  ngAfterViewInit(): void {
    this.getRequests();
  }
 

  onSearch() {
    this.getRequests()
  }

  getRequests() {

    this.requestGrid?.instance.beginCustomLoading(
      `Đang load dữ liệu ...`
    );
    this.rePrSvc.getRequests(this.searchParam).subscribe((response) => {
      this.requests = response.result;
      this.requestGrid.instance.endCustomLoading();
    });
  }

  onRowClick(event: any) {
    console.log('onRowClick: ', event);
    

    this.router.navigate(['/admin/relay/relay-process-recording/request'], {
      queryParams: { requestNo: event.data.requestNo }
    });
  }




  

  // Hàm để xử lý sự kiện thay đổi giá trị
  onDateRangeChanged(event: any) {
    console.log('Selected Date Range:', event.value);
  }
}
