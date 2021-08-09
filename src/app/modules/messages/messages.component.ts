import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { ChatService } from '../../../app/common/services/chat.service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  socket;
  newMessage;
  message
  messageList: string[] = [];
  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.setupSocketConnection()
   // this.chatService.setupSocketConnection(this.newMessage);
  }

  setupSocketConnection() {
    this.socket = io('http://localhost:3025');
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
       const element = document.createElement('p');
       element.innerHTML = data;
       element.style.background = 'white';
       element.style.padding =  '15px 30px';
       element.style.margin = '10px';
       document.getElementById('message-lists').appendChild(element);
       }
     });
 }

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    //this.newMessage = '';
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    const element = document.createElement('p');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-lists').appendChild(element);
    this.message = '';
 }




}
