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
  users: string[] = []
  message: string = "";
  visibleMessages: string[] = []
  user: string = localStorage.getItem("user") ?? ""
  selectedChatroom: Chatroom = {
    name: "",
    totalMembers: 0,
    _id: "",
    users: [],
  }

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
  }

  // Method for handling chatroom selection
  selectChatroom(chatroom: Chatroom) {
    this.selectedChatroom = chatroom
    // Retrieve access token from localStorage
    const accessToken = localStorage.getItem('token');

    // Include access token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    this.http.get<string[]>(`http://localhost:8000/recent/${this.selectedChatroom._id}`, { headers }).subscribe(
      response => {
        this.visibleMessages = response
        console.log(response)
      }
    )
  }

  sendMessage() {
    this.socket.emit("send-message", {
      sender: this.user,
      context: this.message,
      receiver: this.selectedChatroom._id
    })
    this.visibleMessages.push("You: " + this.message)
    this.message = ""
  }

  socketHandling() {
    this.socket.emit("new-user", this.user)

    this.socket.on("chat-message", (message: string) => {
      this.visibleMessages.push(message)
    })

    this.socket.on("user-connected", (user: string) => {
      this.visibleMessages.push(user + " joined chatroom.")
    })
  }
}
