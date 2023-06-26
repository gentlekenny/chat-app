import { Component, Input } from '@angular/core';
import { Chatroom } from '../chat/chat.interface';

@Component({
  selector: 'app-join-create-chatroom',
  templateUrl: './join-create-chatroom.component.html',
  styleUrls: ['./join-create-chatroom.component.css']
})
export class JoinCreateChatroomComponent {
  @Input() availableChatrooms: Chatroom[] = []

  joinChatroom(): void {

  }
}
