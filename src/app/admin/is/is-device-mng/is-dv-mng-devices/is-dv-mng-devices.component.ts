import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-is-dv-mng-devices',
  templateUrl: './is-dv-mng-devices.component.html',
  styleUrl: './is-dv-mng-devices.component.scss',
})
export class IsDvMngDevicesComponent implements OnInit {
  devices: any[] = [
    {
      id: 1,
      name: '27535-GMVF9C3',
      model: 'Latitude 7310',
      type: 'Laptop',
      faCode:'F-2023040011-M-1',
      status: 'Active',
      remark: 'None',
    },
    {
      id: 2,
      name: '12345-XYZ',
      model: 'Surface Pro 7',
      type: 'Tablet',
      faCode:'F-2023040011-M-2',
      status: 'Inactive',
      remark: 'Needs repair',
    },
  ];

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
