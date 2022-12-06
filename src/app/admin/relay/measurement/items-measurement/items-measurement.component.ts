import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeasurementReportService } from '../services/measurement-report.service';
import { MeasurementService } from '../services/measurement.service';

@Component({
  selector: 'app-items-measurement',
  templateUrl: './items-measurement.component.html',
  styleUrls: ['./items-measurement.component.scss'],
})
export class ItemsMeasurementComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private measureService: MeasurementService,
    private measureReportSvc: MeasurementReportService
  ) { }

  isLoading: boolean = false;

  ngOnInit(): void {
    this.getItems();
  }

  items: any = [];
  isShowModal: boolean = false;
  modalTitle!: string;
  meaReportData: any;

  getItems() {
    this.isLoading = true;
    this.measureService.getItems().subscribe((response) => {
      this.items = response;
      this.isLoading = false;
    });
  }

  getMeasurementAmountByLineAndReason(searchParams: any) {
    this.measureReportSvc.AmountByLine(searchParams).subscribe(
      response => {
        this.meaReportData = response;
      }
    )
  }

  onClickRow(event: any) {
    let type = this.activatedRoute.snapshot.queryParams['type'];

    switch (type) {
      case 'execute':
        this.router.navigate(['admin/relay/measurement/item-execute'], {
          queryParams: {
            item: event.id,
            itemName: event.name,
            form: event.form,
          },
        });
        break;
      case 'management':
        this.router.navigate(['admin/relay/measurement/item-management'], {
          queryParams: {
            item: event.id,
            itemName: event.name,
            form: event.form,
          },
        });
        break;
      case 'export':
        this.router.navigate(['admin/relay/measurement/data-export'], {
          queryParams: {
            item: event.id,
            itemName: event.name,
            form: event.form,
          },
        });
        break;
    }
  }


  thongKeSoLuongDoDac(event: any) {
    this.isShowModal = true;
    this.modalTitle = event.name
    let obj = {
      item: event.id
    }
    this.getMeasurementAmountByLineAndReason(obj);
  }


}
