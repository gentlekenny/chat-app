import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  login() {
    const url = 'http://localhost:8000/login';

    // Assuming you have the username and password values from the input fields
    const username = 'your_username';
    const password = 'your_password';

    // Make the HTTP POST request
    this.http.post(url, { username, password }).subscribe(
      response => {
        console.log('Response:', response);
        // Handle the response as needed
      },
      error => {
        console.error('Error:', error);
        // Handle the error as needed
      }
    );
  }


}
