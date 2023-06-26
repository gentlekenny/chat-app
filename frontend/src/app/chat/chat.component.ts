import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chatroom } from './chat.interface';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef;
  chatrooms: Chatroom[] = []
  message: string = "";
  visibleMessages: string[] = []
  user: string = sessionStorage.getItem("user") ?? ""
  selectedChatroom: Chatroom = {
    name: "",
    totalMembers: 0,
    _id: "",
    users: [],
  }
  displayJoinCreateChatroom: boolean = false

  constructor(private http: HttpClient, public socket: Socket) { }

  ngOnInit(): void {

    const url = 'http://localhost:8000/chatrooms';

    // Make the HTTP POST request

    // Retrieve access token from sessionStorage
    const accessToken = sessionStorage.getItem('token');

    // Include access token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

    this.http.get<Chatroom[]>(url, { headers }).subscribe(
      response => {
        this.chatrooms = response
      }
    );

    this.visibleMessages.push("You joined.")

    this.socketHandling()
  }

  // Method for handling chatroom selection
  selectChatroom(chatroom: Chatroom) {
    this.selectedChatroom = chatroom
    // Retrieve access token from sessionStorage
    const accessToken = sessionStorage.getItem('token');

    // Include access token in the request headers
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    this.http.get<string[]>(`http://localhost:8000/recent/${this.selectedChatroom._id}`, { headers }).subscribe(
      response => {
        this.visibleMessages = response
        this.scrollChatMessagesContainerToBottom()
      }
    )
  }

  sendMessage() {
    this.socket.emit("send-message", {
      sender: this.user,
      context: this.message,
      receiver: this.selectedChatroom._id
    })
    this.scrollChatMessagesContainerToBottom()
    this.visibleMessages.push(`${this.user}: ${this.message}`)
    this.message = ""
  }

  joinChatroom(name: string) {
    const chatroom = {
      name: name,
      users: [this.user]
    }
    this.socket.emit("chatroom-created", (chatroom))
  }

  leaveChatroom() {
    console.log("op")
  }

  socketHandling() {

    this.socket.on("chat-message", (message: string) => {
      this.visibleMessages.push(message)
    })

    // When a new user joins a certain channel, and someone is already chatting in that channel
    // we want to notify that someone else has joined.
    this.socket.on("user-connected", (data: any) => {
      if (data.chatroomName == this.selectedChatroom.name) {
        this.visibleMessages.push(data.user + " joined chatroom.")
      }
    })

    this.socket.on("refresh-chatrooms", (interactingUser: string) => {
      if (this.user == interactingUser) {
        const url = 'http://localhost:8000/chatrooms';
        // Retrieve access token from sessionStorage
        const accessToken = sessionStorage.getItem('token');

        // Include access token in the request headers
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

        this.http.get<Chatroom[]>(url, { headers }).subscribe(
          response => {
            this.chatrooms = response
          }
        );
      }
    })
  }

  showJoinCreateChatroom() {
    this.displayJoinCreateChatroom = true
  }

  // Method for automatic scrolling when new message is sent
  scrollChatMessagesContainerToBottom() {
    if (this.chatMessagesContainer && this.chatMessagesContainer.nativeElement) {
      const container = this.chatMessagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight + 50;
    }
  }
}
