import { Component, Input, OnInit } from '@angular/core';
import { MeasurementService } from '../../../services/measurement.service';

@Component({
  selector: 'app-mea-export-type2',
  templateUrl: './mea-export-type2.component.html',
  styleUrls: ['./mea-export-type2.component.scss'],
})
export class MeaExportType2Component implements OnInit {
  @Input() item!: any;
  @Input() detailsData!: any;
  @Input() standard!: any;
  @Input() searchParams!: any;

  constructor(private measureService: MeasurementService) {}

  valueNames!: any;

  ngOnInit(): void {
    console.log(this.item);
    this.valueNames = this.standard.valueName.split(';');
  }

  onExportBtn() {
    this.searchParams.itemType = this.standard.type;
    this.searchParams.valueName = this.standard.valueName;

    this.measureService
      .exportMeasureData(this.searchParams)
      .subscribe((response) => {
        const blob = new Blob([response], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //   window.navigator.msSaveOrOpenBlob(blob);
        //   return;
        // }

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = `${this.item.name}.xlsx`;
        link.dispatchEvent(
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        setTimeout(() => {
          window.URL.revokeObjectURL(data);
          link.remove();
        }, 100);
      });
  }
}
