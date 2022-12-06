import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService: AuthService,) { }

  email!: string | null;
  type: number = 0 ;
  msg!: string | null;

  ngOnInit(): void {

  }

  getPassword() {
    let account = {
      email: this.email
    }

    this.authService.forgotPassword(account).subscribe(
      response => {
        
        if (response.status == 'Error') {
          this.type = 1;
          this.msg = response.response
        }else if(response.status == 'Success'){
          this.type = 2;
          this.msg = response.response
        }

        console.log("RES: ", response);
      }
    )
  }

}
