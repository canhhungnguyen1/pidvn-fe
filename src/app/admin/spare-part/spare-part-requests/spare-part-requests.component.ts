import { Component } from '@angular/core';

@Component({
  selector: 'app-spare-part-requests',
  templateUrl: './spare-part-requests.component.html',
  styleUrls: ['./spare-part-requests.component.scss'],
})
export class SparePartRequestsComponent {
  sparePartRequests: any;
  isOpenRequestModal: boolean = false;

  openRequestModal() {
    this.isOpenRequestModal = true





  }
}
