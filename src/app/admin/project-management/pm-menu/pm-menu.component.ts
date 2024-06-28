import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DxSelectBoxComponent, DxTextBoxComponent } from 'devextreme-angular';

@Component({
  selector: 'app-pm-menu',
  templateUrl: './pm-menu.component.html',
  styleUrls: ['./pm-menu.component.scss'],
})
export class PmMenuComponent {
  @ViewChildren('textBox')
  textBoxes!: QueryList<DxTextBoxComponent>;
  @ViewChildren('selectBox')
  selectBoxes!: QueryList<DxSelectBoxComponent>;
  @ViewChildren('dateBox')
  dateBoxes!: QueryList<DxSelectBoxComponent>;

  components = [
    { id: 1, type: 'text-box', label: 'Name', placeholder: 'Enter your name', tooltip: 'aaa'},
    { id: 2, type: 'select-box', label: 'Country', items: ['Việt Nam','USA', 'UK', 'Canada'],tooltip: 'bbb' },
    { id: 3, type: 'select-box', label: 'City', items: ['Hồ Chí Minh','Hà Nội', 'Hải Phòng'],tooltip: '' },
    { id: 4, type: 'text-box', label: 'Address', placeholder: 'Enter your address',tooltip: '' },
    { id: 5, type: 'date-box', label: 'Start Date', placeholder: 'Start Date',tooltip: '' },
    { id: 6, type: 'date-box', label: 'End Date', placeholder: 'End Date',tooltip: '' }
  ];

  onValueChanged(event: any) {
    console.log('Value changed:', event);
  }

  formData: { [key: number]: any } = {};
  getFormData() {
    const data = this.components.map(comp => ({
      id: comp.id,
      value: this.formData[comp.id]
    }));
    console.log(data);
  }
}
