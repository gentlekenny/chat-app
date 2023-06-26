import { Component, Input } from '@angular/core';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-join-create-chatroom',
  templateUrl: './join-create-chatroom.component.html',
  styleUrls: ['./join-create-chatroom.component.css']
})
export class JoinCreateChatroomComponent {

  @Input() public joinChatroom: (name: string) => void = () => { }
  @Input() public user: string = ""
  @Input() public socket: Socket | null = null

  chatroomName: string = ""

  joinChatroomOnClick() {
    const chatroom = {
      name: this.chatroomName,
      users: [this.user],
      totalMembers: 1
    }
    this.socket?.emit("chatroom-created", (chatroom))
  }

}
