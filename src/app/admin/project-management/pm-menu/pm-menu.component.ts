import { Component } from '@angular/core';

@Component({
  selector: 'app-pm-menu',
  templateUrl: './pm-menu.component.html',
  styleUrls: ['./pm-menu.component.scss']
})
export class PmMenuComponent {


  components: any = [
    {
      type: 'text-box',
      label: 'Label TextBox 1',
      placeholder: 'Place holder 1'
    },
    {
      type: 'text-box',
      label: 'Label TextBox 2',
      placeholder: 'Place holder 2'
    },
    {
      type: 'select-box',
      label: 'Label select box',
      items: ['rounded','dots', 'classy', 'classy-rounded', 'square', 'extra-rounded']
    }
  ]

  
}
