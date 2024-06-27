import { Component } from '@angular/core';

@Component({
  selector: 'app-pm-menu',
  templateUrl: './pm-menu.component.html',
  styleUrls: ['./pm-menu.component.scss']
})
export class PmMenuComponent {


  components: any = [
    {
      id: 1,
      type: 'text-box',
      label: 'Label TextBox 1',
      placeholder: 'Place holder 1'
    },
    {
      id: 2,
      type: 'text-box',
      label: 'Label TextBox 2',
      placeholder: 'Place holder 2'
    },
    {
      id: 3,
      type: 'select-box',
      label: 'Label select box 1',
      items: ['option1','option2', 'option3']
    },
    {
      id: 4,
      type: 'select-box',
      label: 'Label select box 2',
      items: ['option1','option2', 'option3', 'option4'],
    }
  ]

  onValueChanged(event: any) {
    console.log('onValueChanged: ', event);
    
  }
}
