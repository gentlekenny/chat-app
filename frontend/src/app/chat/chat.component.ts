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
    this.socket.emit('message', "Poruka");
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
}
