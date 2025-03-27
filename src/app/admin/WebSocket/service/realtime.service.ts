import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
// import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient!: Client;
  private serverUrl = 'http://localhost:8889/ws';

  // constructor() {
  //   this.initializeWebSocketConnection();
  // }

  // private initializeWebSocketConnection() {
  //   this.stompClient = new Client({
  //     webSocketFactory: () => new SockJS(this.serverUrl),
  //     debug: (msg) => console.log(msg),
  //     reconnectDelay: 5000,
  //   });

  //   this.stompClient.onConnect = () => {
  //     console.log('Connected to WebSocket');
  //     this.stompClient.subscribe('/topic/updates', (message) => {
  //       console.log('Received:', message.body);
  //     });
  //   };

  //   this.stompClient.activate();
  // }

  // sendMessage(message: string) {
  //   if (this.stompClient.connected) {
  //     this.stompClient.publish({ destination: '/app/send', body: message });
  //   }
  // }
}
