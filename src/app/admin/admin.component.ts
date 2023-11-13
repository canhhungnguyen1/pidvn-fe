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
  baseUrlJava = environment.baseUrlJava;
  baseUrlJavaHttps = environment.baseUrlJavaHttps;


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
  priceLink!:string;
  eDummyLink!: string;
  relayDashboardLink!: string;
  listExpired!: string;
  listOpLineRelay!: string;
  listOpLineVR!: string;
  skillMapRelayLinks = [
    {
      line: 'TB1',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB1`
    },
    {
      line: 'TB1 (Auto)',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB.1`
    },
    
    {
      line: 'TB2 (Manual)',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB2`
    },
    {
      line: 'TB3 (Manual)',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB3`
    },
    {
      line: 'TB4',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB4`
    },
    {
      line: 'TB4 (Auto)',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB.4`
    },
    {
      line: 'TB5 (Manual)',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB5`
    },

    {
      line: 'TB2 (Auto)',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB.2`
    },
    {
      line: 'TB5 (Auto)',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB.5`
    },
    {
      line: 'TB3 (Auto)',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB.3`
    },


    {
      line: 'TB6',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB6`
    },
    {
      line: 'TB7',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TB7`
    },
    {
      line: 'TL1',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TL1`
    },
    {
      line: 'TL2',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TL2`
    },
    {
      line: 'TE1',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TE1_10`
    },
    {
      line: 'TE2',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TE2`
    },
    {
      line: 'TE3',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TE3`
    },
    {
      line: 'TC1',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TC1`
    },
    {
      line: 'TT',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TT`
    },
    {
      line: 'TCL',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=TCL`
    },
  ];

  skillMapVrEncLinks = [
    {
      line: '11G2-1',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=11G2-1`
    },
    {
      line: '11G2-2',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=11G2-2`
    },
    {
      line: '11G2-3',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=11G2-3`
    },
    {
      line: '11GS-1',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=11GS-1`
    },
    {
      line: '11GS-2',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=11GS-2`
    },
    {
      line: '11GS-3',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=11GS-3`
    },
    {
      line: '11GS-4',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=11GS-4`
    },
    {
      line: 'SWB G1-1',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=SWB G1-1`
    },
    {
      line: 'SWB G1-2',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=SWB G1-2`
    },
    {
      line: 'SWB G2-3',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=SWB G2-3`
    },
    {
      line: 'SWB G2-4',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=SWB G2-4`
    },
    {
      line: 'GMT-1',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=GMT-1`
    },
    {
      line: 'GMT-2',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=GMT-2`
    },
    {
      line: 'GMT-3',
      link: `${this.baseUrlJava}/pidvn/ma/skillmap/checkskill?line=GMT-3`
    },
  ]

  fgWarehouseLink!: string;
  checkTemWHLink!: string
  reportTemWHLink!: string;
  surveyLink!: string;
  examTestRelayLink!: string;
  examTestVrEncLink!: string;
  checkExpiryDateRelayLink!: string;
  checkExpiryDateVrEncLink!: string;
  bangQuanLyKyNangPIHLink!: string;
  pihProcessScannerLink!: string;
  pihPSMasterLink!: string


  itRequestLink!: string;

  labelRequestLink!: string;

  // IQC Link
  iqcLink = {
    examOnlineLink: '',
    skillmap: {
      relay: '',
      vr: '',
      xrf: ''
    }
  }

  // PIH Link SkillMap
  pihLink = {
    skillmap: {
      coilRelay: '',
      pressRelay: '',
      moldRelay: ''
    }
  }


  // Exam History Link
  examHistoryIQCLink!: string;
  examHistoryRelayLink!: string;
  examHistoryEMCLink!: string;

  relayECOPLink!: string;
  pihProcessReport!: string;

  materialWarehouseLink! :string; 
  dotLink!: string;
  quanLyBaiKiemTraLink!: string;
  dangKyLamBaiKiemTraLink!: string;
  traceDataLink!: string;
  traceDataDetailLink!: string
  traceDataPcLink!:string


   ngOnInit(): void {
    let accessToken = localStorage.getItem('accessToken');
    let token2 = localStorage.getItem('token2');
    this.getEmployeeName();

    this.relayDashboardLink = `${this.baseUrlJava}/pidvn/ma/production`
    this.eCommitLink = `${this.baseUrlJava}/pidvn/hr/camket/menu?accessToken=${token2}`
    this.eLeaveLink = `${this.baseUrlJava}/pidvn/hr/leave/menu?accessToken=${token2}`
    this.eApprovalLink = `${this.baseUrlJava}/Manufacturing/Handle/approve/menu?accessToken=${token2}`
    this.eContractLink = `${this.baseUrlJava}/pidvn/acc/contract/menu?accessToken=${token2}`
    this.eConfirmCheckInLink = `${this.baseUrlJava}/pidvn/hr/confirm/menu?accessToken=${token2}`
    this.qmsLink = `${this.baseUrlJava}/pidvn/qc/qms/menu?accessToken=${token2}`
    this.contractLink = `${this.baseUrlJava}/pidvn/acc/contract/menu?accessToken=${token2}`
    this.paymentLink = `${this.baseUrlJava}/pidvn/acc/payment/menu?accessToken=${token2}`
    this.priceLink = `${this.baseUrlJava}/pidvn/acc/price/menu?accessToken=${token2}`
    this.eDummyLink = `${this.baseUrlJava}/pidvn/pe/dummy/menu?accessToken=${token2}`
    this.listOpLineRelay = `${this.baseUrlJava}/pidvn/ma/skillmap/list_op_inline?area=Relay`;
    this.listOpLineVR = `${this.baseUrlJava}/pidvn/ma/skillmap/list_op_inline?area=EMC`;
    this.fgWarehouseLink = `${this.baseUrlJava}/pidvn/sales/fg?accessToken=${token2}`
    this.checkTemWHLink = `${this.baseUrlJava}/pidvn/sales/fg/checktemWH?accessToken=${token2}`
    this.reportTemWHLink = `${this.baseUrlJava}/pidvn/sales/fg/reportchecktemwh?accessToken=${token2}`
    this.surveyLink = `${this.baseUrlJava}/pidvn/acc/coi/menu?accessToken=${token2}`
    this.examTestRelayLink = `${this.baseUrlJava}/pidvn/ma/exam?area=Relay`
    this.checkExpiryDateRelayLink = `${this.baseUrlJava}/pidvn/ma/exam/list_expired?area=Relay`
    this.examTestVrEncLink = `${this.baseUrlJava}/pidvn/ma/exam?area=EMC`
    this.checkExpiryDateVrEncLink = `${this.baseUrlJava}/pidvn/ma/exam/list_expired?area=EMC`
    this.bangQuanLyKyNangPIHLink = `${this.baseUrlJava}/pidvn/pih/exam/menu?accessToken=${token2}`
    this.pihProcessScannerLink = `https://10.92.176.57:8888/pidvn/pih/pih_process/pih_process_scaner`
    this.pihPSMasterLink = `${this.baseUrlJava}/pidvn/pih/ps_master/ps_master_index?accessToken=${accessToken}`
    this.itRequestLink = `${this.baseUrlJava}/pidvn/is/request/menu?accessToken=${token2}`
    this.labelRequestLink = `${this.baseUrlJava}/pidvn/is/label/menu?accessToken=${token2}`
    this.iqcLink.examOnlineLink = `${this.baseUrlJava}/pidvn/qc/exam?area=IQC`;
    this.iqcLink.skillmap.relay = `${this.baseUrlJavaHttps}/pidvn/ma/skillmap/checkskillmap?line=SKILL_RELAY`;
    this.iqcLink.skillmap.vr = `${this.baseUrlJavaHttps}/pidvn/ma/skillmap/checkskillmap?line=SKILL_VR`;
    this.iqcLink.skillmap.xrf = `${this.baseUrlJavaHttps}/pidvn/ma/skillmap/checkskillmap?line=SKILL_XRF`;
    this.pihLink.skillmap.coilRelay = `${this.baseUrlJavaHttps}/pidvn/ma/skillmap/checkskillmap?line=COIL_RELAY`
    this.pihLink.skillmap.pressRelay = `${this.baseUrlJavaHttps}/pidvn/ma/skillmap/checkskillmap?line=PRESS_RELAY`
    this.pihLink.skillmap.moldRelay = `${this.baseUrlJavaHttps}/pidvn/ma/skillmap/checkskillmap?line=MOLD_RELAY`
    this.examHistoryIQCLink = `${this.baseUrlJava}/pidvn/ma/exam/listexam?area=IQC`;
    this.examHistoryRelayLink = `${this.baseUrlJava}/pidvn/ma/exam/listexam?area=Relay`;
    this.examHistoryEMCLink = `${this.baseUrlJava}/pidvn/ma/exam/listexam?area=EMC`;
    this.relayECOPLink = `${this.baseUrlJava}/pidvn/ma/ecop/menu?accessToken=${token2}`;
    this.pihProcessReport = `${this.baseUrlJava}/pidvn/pih/pih_process/pih_process_report?accessToken=${accessToken}`
    this.materialWarehouseLink = `${this.baseUrlJavaHttps}/pidvn/pur/wh?accessToken=${token2}`
    this.dotLink = `${this.baseUrlJavaHttps}/pidvn/sales/isp/dot?accessToken=${token2}`
    this.quanLyBaiKiemTraLink = `${this.baseUrlJavaHttps}/pidvn/ma/exam/action?accessToken=${token2}`
    this.dangKyLamBaiKiemTraLink = `${this.baseUrlJavaHttps}/pidvn/ma/exam/register?accessToken=${token2}`
    this.traceDataLink = `${this.baseUrlJava}/pidvn/ma/trace/trace_data?accessToken=${token2}`
    this.traceDataDetailLink = `${this.baseUrlJava}/pidvn/ma/trace/trace_data_detail?accessToken=${token2}`
    this.traceDataPcLink = `${this.baseUrlJava}/pidvn/ma/trace/trace_datapc?accessToken=${token2}`
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
          <li>Ms. Yên: 0989 554 217</li>
          <li>Mr. Hà: 0888 694 234</li>
          <li>Mr. Khoa: 0966 333 594</li>
          <li><a href='#' target="_blank">Mr. Hưng: 0966 939 859</a></li>
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


  isOpenNotification: boolean = false
  isOpenNotificationModal() {
    this.isOpenNotification = true
  }

  handleCancel() {
    this.isOpenNotification = false
  }

  handleOk() {
    this.isOpenNotification = false
  }
}
