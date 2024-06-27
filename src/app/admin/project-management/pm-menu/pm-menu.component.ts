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
    { id: 1, type: 'text-box', label: 'Address', placeholder: 'Enter your address' },
  ];

  onValueChanged(event: any) {
    console.log('Value changed:', event);
  }

  getFormData() {
    // const formData: { [key: string]: any } = {};
    let formData = new Array();

    // Lấy dữ liệu từ các text box
    this.textBoxes.forEach((textBox, index) => {
      const component = this.components.find(comp => comp.type === 'text-box' && comp.id === (index + 1));
      if (component) {
        let obj: any = {}
        obj.id = component.id;
        obj.value = textBox.instance.option('value');
        formData.push(obj)
      }
    });

    // Lấy dữ liệu từ các select box
    this.selectBoxes.forEach((selectBox, index) => {
      // formData[`selectBox${index}`] = selectBox.instance.option('value');

      const component = this.components.find(comp => comp.type === 'select-box' && comp.id === (index + 1));
      console.log(component);
      

      if (component) {
        let obj: any = {}
        obj.id = component.id;
        obj.value = selectBox.instance.option('value');
        formData.push(obj)
      }
    });

    console.log('Form Data:', formData);
    return formData;
  }
}
