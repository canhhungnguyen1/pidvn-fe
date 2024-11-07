import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { RePrService } from '../services/re-pr.service';
import { RequestDto } from '../models/RequestDto';

@Component({
  selector: 'app-re-pr-request',
  templateUrl: './re-pr-request.component.html',
  styleUrl: './re-pr-request.component.scss',
})
export class RePrRequestComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private rePrSvc: RePrService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRequests();
  }

  requests: RequestDto[] = [];

  getRequests() {
    this.rePrSvc.getRequests().subscribe((response) => {
      this.requests = response.result;
    });
  }

  onRowClick(event: any) {
    console.log('onRowClick: ', event);
    

    this.router.navigate(['/admin/relay/relay-process-recording/request'], {
      queryParams: { requestNo: event.data.requestNo }
    });
  }




  // Khởi tạo giá trị mặc định cho startDate và endDate
  dateRange: any = [new Date('2023-01-01'), new Date('2023-12-31')];
  startDate: Date = new Date('2023-01-01');
  endDate: Date = new Date('2023-12-31');

  // Hàm để xử lý sự kiện thay đổi giá trị
  onDateRangeChanged(event: any) {
    console.log('Selected Date Range:', event.value);
  }
}
