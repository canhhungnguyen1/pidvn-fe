import { Component } from '@angular/core';
// import { WebsocketService } from '../service/realtime.service';


@Component({
  selector: 'app-realtime-component',
  templateUrl: './realtime-component.component.html',
  styleUrl: './realtime-component.component.scss'
})
export class RealtimeComponentComponent {
  message: string = '';

  // constructor(private websocketService: WebsocketService) {
    
  // }

  // sendMessage() {
  //   this.websocketService.sendMessage(this.message);
  //   this.message = '';
  // }
}
