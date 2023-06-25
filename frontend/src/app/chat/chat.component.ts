import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chatroom } from './chat.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatrooms: Chatroom[] = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    const url = 'http://localhost:8000/chatrooms';


    // Make the HTTP POST request
    this.http.get<Chatroom[]>(url).subscribe(
      response => {
        this.chatrooms = response
      }
    );
  }
}
