import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { PihStopLineInputService } from '../services/pih-stop-line-input.service';

@Component({
  selector: 'app-psli-user-area',
  templateUrl: './psli-user-area.component.html',
  styleUrl: './psli-user-area.component.scss',
})
export class PsliUserAreaComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private jwtHelperSvc: JwtHelperService,
    private pihStopLineSvc: PihStopLineInputService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUsersArea();
  }

  users: any[] = []; // Danh sách người dùng

  getUsersArea() {
    this.pihStopLineSvc.getUsersArea().subscribe({
      next: (res) => {
        this.users = res.result;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Lỗi');
      },
    });

  }


  // Style header
  onCellPrepared(e: any) {
    if (e.rowType === 'header') {
      e.cellElement.style.backgroundColor = '#000080'; // Change background color
      e.cellElement.style.color = '#ffffff'; // Change text color for better visibility
      e.cellElement.style.fontWeight = 'bold';
    }
  }
}
