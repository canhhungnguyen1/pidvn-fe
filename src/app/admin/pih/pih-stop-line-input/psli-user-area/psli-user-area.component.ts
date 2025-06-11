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
    this.getUsers();
    this.getUsersArea();
    this.getProductTypes();
  }

  users: any[] = [] // Danh sách users toàn công ty
  usersArea: any[] = []; // Danh sách người đã được phân quyền nhập dừng máy
  productTypes: any [] = [];


  getUsers() {
    this.pihStopLineSvc.getUsers().subscribe(
      response => {
        this.users = response.result
        console.log('getUsers: ', this.users);
        
      }
    )
  }

  getUsersArea() {
    this.pihStopLineSvc.getUsersArea().subscribe({
      next: (res) => {
        this.usersArea = res.result;
        this.cdr.detectChanges();
        console.log('getUsersArea: ', this.usersArea);
      },
      error: (err) => {
        this.toastr.error(err.error.message, 'Lỗi');
      },
    });

  }

  getProductTypes() {
    this.pihStopLineSvc.getProductTypes().subscribe(
      response => {
        this.productTypes = response.result
        console.log('getProductTypes: ', this.productTypes);
        
      }
    )
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
