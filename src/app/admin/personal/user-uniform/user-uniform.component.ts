import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { UserUniformService } from '../services/user-uniform.service';

@Component({
  selector: 'app-user-uniform',
  templateUrl: './user-uniform.component.html',
  styleUrls: ['./user-uniform.component.scss'],
})
export class UserUniformComponent implements OnInit {
  constructor(
    private userUniformSvc: UserUniformService,
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserUniforms()
    this.getUserUniformSizes();
  }

  userUniforms: any;
  userUniformSizes: any;
  isLoading: boolean = false;

  textSizes = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: '2XL', label: '2XL' },
    { value: '3XL', label: '3XL' },
  ];

  numberSizes = [
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },
    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
    { value: '46', label: '46' },
    { value: '47', label: '47' },
    { value: '48', label: '48' },
    { value: '49', label: '49' },
    { value: '50', label: '50' },
  ]

  getUserUniformSizes() {
    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.userUniformSvc.getUserUniformSizes(username).subscribe((response) => {
      this.userUniformSizes = response
      console.log(response);
      
    });
  }

  getUserUniforms() {
    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    this.userUniformSvc.getUserUniforms(username).subscribe((response) => {
      this.userUniforms = response
      console.log(response);
      
    });
  }

  updateUserUniformSize(data : any) {
    // this.isLoading = true;
    let username = this.jwtHelperSvc.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).Username;

    let userSizes = new Array();

    console.log(this.userUniformSizes);

    for (const item of data) {
      let obj = {
        username: username,
        sizeType: item.sizeType,
        size: item.size
      }

      userSizes.push(obj);
    }
    
    this.userUniformSvc.saveUserUniformSize(userSizes).subscribe(
      response => {
        this.isLoading = false;
        this.getUserUniformSizes();
        this.toastr.success('Cập nhật thành công !','Success');
      }
    )
    
  }




}
