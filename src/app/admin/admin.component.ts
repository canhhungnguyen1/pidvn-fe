import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NzModalService } from 'ng-zorro-antd/modal';
import { environment } from 'src/environments/environment';
import { TranslateConfigService } from '../services/translate-config.service';
import { WelcomeService } from './welcome/welcome.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers:[WelcomeService]
})
export class AdminComponent implements OnInit {
  constructor(
    private router: Router,
    private modal: NzModalService,
    private jwtHelperService: JwtHelperService,
    private welcomeSvc: WelcomeService,
    private translate: TranslateConfigService
  ) { }
  
  baseUrl = environment.baseUrl;

  isCollapsed: boolean = false;
  employeeName!: string;
  visibleDrawerMenu: boolean = false;
  textAvatar!: string | undefined;
  colorAvatar!: string | undefined;

  eCommitLink!: string;
  eLeaveLink!:string;
  eApprovalLink!: string;
  eContractLink!: string;
  eConfirmCheckInLink!: string;
  qmsLink!: string;
  contractLink!: string;
  paymentLink!: string;
  
  listExpired!: string;
  listOpLine!: string;
  skillMapRelayLinks = [
    {
      line: 'TB1',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TB1`
    },
    {
      line: 'TB2',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TB2`
    },
    {
      line: 'TB3',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TB3`
    },
    {
      line: 'TB4',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TB4`
    },
    {
      line: 'TB5',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TB5`
    },
    {
      line: 'TB6',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TB6`
    },
    {
      line: 'TL1',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TL1`
    },
    {
      line: 'TL2',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TL2`
    },
    {
      line: 'TE1',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TE1_10`
    },
    {
      line: 'TE2',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TE2`
    },
    {
      line: 'TE3',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TE3`
    },
    {
      line: 'TC1',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=TC1`
    },
  ];

  skillMapVrEncLinks = [
    {
      line: '11G2-1',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=11G2-1`
    },
    {
      line: '11G2-2',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=11G2-2`
    },
    {
      line: '11G2-3',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=11G2-3`
    },
    {
      line: '11GS-1',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=11GS-1`
    },
    {
      line: '11GS-2',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=11GS-2`
    },
    {
      line: '11GS-3',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=11GS-3`
    },
    {
      line: '11GS-4',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=11GS-4`
    },
    {
      line: 'SWB G1-1',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=SWB G1-1`
    },
    {
      line: 'SWB G1-2',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=SWB G1-2`
    },
    {
      line: 'SWB G2-3',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=SWB G2-3`
    },
    {
      line: 'SWB G2-4',
      link: `http://10.92.176.57:6969/Manufacturing/Monitoring/skillmap/checkskill?line=SWB G2-4`
    },
  ]

  fgWarehouseLink!: string;
  surveyLink!: string;
  examTestRelayLink!: string;
  examTestVrEncLink!: string;
  checkExpiryDateRelayLink!: string;
  checkExpiryDateVrEncLink!: string;
  bangQuanLyKyNangPIHLink!: string;


  ngOnInit(): void {
    let accessToken = localStorage.getItem('accessToken');
    this.getEmployeeName();


    this.eCommitLink = `http://10.92.176.57:6969/camket/Handle/camket/menu?accessToken=${accessToken}`
    this.eLeaveLink = `http://10.92.176.57:6969/Leave/Handle/leave/menu?accessToken=${accessToken}`
    this.eApprovalLink = `http://10.92.176.57:6969/Manufacturing/Handle/approve/menu?accessToken=${accessToken}`
    this.eContractLink = `http://10.92.176.57:6969/Manufacturing/Handle/contract/menu?accessToken=${accessToken}`
    this.eConfirmCheckInLink = `http://10.92.176.57:6969/Leave/Handle/confirm_in/menu?accessToken=${accessToken}`
    this.qmsLink = `http://10.92.176.57:6969/QMS/Handle/QMS/menu?accessToken=${accessToken}`
    this.contractLink = `http://10.92.176.57:6969/Contract/Handle/contract/menu?accessToken=${accessToken}`
    this.paymentLink = `http://10.92.176.57:6969/Payment/Handle/payment/menu?accessToken=${accessToken}`

    
    //this.listExpired = `http://10.92.176.57:6969/Manufacturing/Monitoring/MA/exam/list_expired`;
    this.listOpLine = `http://10.92.176.57:6969/Manufacturing/Monitoring/MA/exam/list_op_inline`;
    this.fgWarehouseLink = `http://10.92.176.57:6969/Manufacturing/Monitoring/fg?accessToken=${accessToken}`
    this.surveyLink = `http://10.92.176.57:6969/survey/Handle/coi/menu?accessToken=${accessToken}`
    this.examTestRelayLink = `http://10.92.176.57:6969/Manufacturing/Monitoring/MA/exam?area=Relay`
    this.checkExpiryDateRelayLink = `http://10.92.176.57:6969/Manufacturing/Monitoring/MA/exam/list_expired?area=Relay`
    this.examTestVrEncLink = `http://10.92.176.57:6969/Manufacturing/Monitoring/MA/exam?area=EMC`
    this.checkExpiryDateVrEncLink = `http://10.92.176.57:6969/Manufacturing/Monitoring/MA/exam/list_expired?area=EMC`
    this.bangQuanLyKyNangPIHLink = `http://10.92.176.57:6969/PIH/Monitoring/exam/skill_control?accessToken=${accessToken}`
  }

  weatherInfo: any;

  getEmployeeName() {
    let name = this.jwtHelperService.decodeToken(
      localStorage.getItem('accessToken')?.toString()
    ).FullName;
    let arr = name.split(' ').reverse();
    this.textAvatar = this.getTextAvatar(name);
    this.employeeName = `${arr[1]} ${arr[0]}`
    this.colorAvatar = this.getColorAvatar();
  }

  /**
   * Đang test hàm này
   * Server - Sent event
   * Để chạy: đặt hàm này vào trong ngOnInit()
   */
  initNotify() {
    let urlEndPoint = `${this.baseUrl}/subscribe`
    let eventSource = new EventSource(urlEndPoint);

    eventSource.addEventListener('latestNews', (event: any)=> {
      console.log('Notify : ', event.data);
    })
  }

  info(): void {
    this.modal.info({
      nzTitle: 'Hỗ trợ phần mềm',
      nzContent: `
        Liên hệ phòng IT
        <ul>
          <li>Máy bàn: 3224 </li>
          <li>Ms. Hồng: 0985 186 819</li> 
          <li>Mr. Thắng: 076 620 2368</li>
          <li>Ms. Yên: 0989 554 217</li>
          <li>Mr. Hà: 0888 694 234</li>
          <li>Mr. Hưng: 0966 939 859</li>
        </ul>
      `,
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  onHideSidebar() {
    if (!this.isCollapsed) {
      this.isCollapsed = true;
    }
  }

  getTextAvatar(name: string): string | undefined {
    return name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')
  }

  getColorAvatar(): string {
    const colorList = [
      '#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#ef5350', '#ec407a', 
      '#ab47bc', '#7e57c2', '#5c6bc0', '#42a5f5', '#29b6f6', '#26c6da', 
      '#26a69a', '#66bb6a', '#9ccc65', '#ffca28', '#ff7043', '#8d6e63',
      '#78909c'];
    var idx = Math.floor(Math.random() * colorList.length);
    return colorList[idx];
  }


  changeDefaultLanguage(langType: string) {
    this.translate.changeLanguage(langType);
  }
}
