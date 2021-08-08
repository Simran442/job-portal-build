import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket;
  constructor() {   }

  setupSocketConnection() {
    this.socket = io('http://localhost:3000', {
      auth: {
        token: "abc"
      }
    });

    this.socket.emit('my message', 'Hello there from Angular.');

    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

