import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoggerService } from './logger.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrl: './logger.component.scss'
})
export class LoggerComponent implements OnInit{

  constructor(
    private toastr: ToastrService,
    private loggerSvc: LoggerService,
    private jwtHelperSvc: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLogFiles()
  }

  logFiles: any;


  getLogFiles() {
    let path = "P:\\IS\\CanhHung\\FDCS\\LogServer";
    let searchParam = {
      path: path
    }
    this.loggerSvc.getLogFiles(searchParam).subscribe(
      response => {
        this.logFiles = response.result
      }
    )
  }

  viewLogFile(event: any) {
    console.log(event);
    let searchParam = {
      path: event.path,
      fileName: 'service-log.log'
    }

    this.loggerSvc.viewLogFile(searchParam).subscribe(
      
      content => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank'); // Mở trong tab mới
      },
      error => {
        console.error('Không thể mở file log:', error);
      }



    )

  }
}
