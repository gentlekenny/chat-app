import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chatroom } from './chat.interface';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatrooms: Chatroom[] = []
  message: string = "";
  visibleMessages: string[] = []
  user: string = localStorage.getItem("user") ?? ""

  constructor(private http: HttpClient, private socket: Socket) { }

  ngOnInit(): void {

    const url = 'http://localhost:8000/chatrooms';

    // Make the HTTP POST request

    // Retrieve access token from localStorage
    const accessToken = localStorage.getItem('token');

    // Include access token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    this.http.get<Chatroom[]>(url, { headers }).subscribe(
      response => {
        this.chatrooms = response
      }
    );

    this.visibleMessages.push("You joined.")
    this.socket.emit("new-user", this.user)

    this.socket.on("chat-message", (message: string) => {
      this.visibleMessages.push(message)
    })

    this.socket.on("user-connected", (user: string) => {
      this.visibleMessages.push(user + " joined chatroom.")
    })
  }

  sendMessage() {
    this.socket.emit("send-message", {
      user: this.user,
      message: this.message
    })
    this.visibleMessages.push("You: " + this.message)
    this.message = ""
  }

}
