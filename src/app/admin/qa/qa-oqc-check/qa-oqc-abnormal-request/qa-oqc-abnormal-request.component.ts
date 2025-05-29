import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { RelayDateCodeService } from 'src/app/admin/relay/relay-datecode/relay-datecode.service';
import { QaOqcService } from '../services/qa-oqc.service';

@Component({
  selector: 'app-qa-oqc-abnormal-request',
  templateUrl: './qa-oqc-abnormal-request.component.html',
  styleUrl: './qa-oqc-abnormal-request.component.scss',
})
export class QaOqcAbnormalRequestComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private qaOqcSvc: QaOqcService,
    private relayDateCodeSvc: RelayDateCodeService,
    private jwtHelperSvc: JwtHelperService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAbnormalRequests();
  }

  oqcAbnormalRequests: any;

  getAbnormalRequests() {
    let searchVo = {
      isAbnormal: true,
    };

    this.qaOqcSvc.getOqcRequests(searchVo).subscribe((response) => {
      this.oqcAbnormalRequests = response;
    });
  }

  redirectAbnormalDetail(data: any) {
    console.log('data: ', data);
    this.router.navigate([
      '/admin/qa/qa-oqc-check/oqc-abnormal-request',
      data.reqNo,
    ]);
  }
}
