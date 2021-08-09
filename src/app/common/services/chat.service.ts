import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket;
  constructor() {   }

  setupSocketConnection(message) {
    this.socket = io('http://localhost:3025', {
      auth: {
        token: "abc"
      }
    });
    // this.socket.emit('my message', message);

    // this.socket.on('my broadcast', (data: string) => {
    //   console.log(data);
    // });
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }


  sendMessage(message){
    this.socket.emit('message', message);
  }
}

