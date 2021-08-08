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
  messageList: string[] = [];
  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  sendMessage() {
    //this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

}
