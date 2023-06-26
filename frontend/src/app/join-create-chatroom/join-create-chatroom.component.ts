import { Component, Input } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-join-create-chatroom',
  templateUrl: './join-create-chatroom.component.html',
  styleUrls: ['./join-create-chatroom.component.css']
})
export class JoinCreateChatroomComponent {

  @Input() public joinChatroom: (name: string) => void = () => { }
  @Input() public user: string = ""
  @Input() public socket: Socket | null = null

  constructor(private snackbar: MatSnackBar) {

  }

  chatroomName: string = ""

  joinChatroomOnClick() {
    if (this.chatroomName.length <= 4 || this.chatroomName.indexOf(' ') > 0) {
      this.showSnackbar(true)
      return
    }
    const chatroom = {
      name: this.chatroomName,
      users: [this.user],
      totalMembers: 1
    }
    this.socket?.emit("chatroom-created", (chatroom))
    this.chatroomName = ''
    this.showSnackbar(false)
  }

  showSnackbar(isError: boolean) {
    const config: MatSnackBarConfig = {
      duration: 3000, // Duration of info window
      panelClass: ['error-snackbar'], // Using this winow style
      verticalPosition: 'top'
    };
    if (isError) {
      this.snackbar.open(`Error: Chatroom name must be atleast 5 characters long and must not contain whitespaces.`, '', config);
    } else {
      config.panelClass = ['ok-snackbar']
      this.snackbar.open(`Success. New chatroom has been added to My Chatrooms list.`, '', config);
    }
    this.chatroomName = ''
  }
}
