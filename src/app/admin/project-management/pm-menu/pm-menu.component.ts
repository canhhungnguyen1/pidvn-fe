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

  components = [
    { id: 1, type: 'text-box', label: 'Name', placeholder: 'Enter your name' },
    { id: 2, type: 'select-box', label: 'Country', items: ['USA', 'UK', 'Canada'] },
    { id: 3, type: 'select-box', label: 'City', items: ['Hanoi', 'Hai Phong', 'Ho Chi Minh'] },
    { id: 4, type: 'text-box', label: 'Address', placeholder: 'Enter your address' },
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
