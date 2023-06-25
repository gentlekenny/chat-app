import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginResponse } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string
  password!: string
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
  }
  login() {
    const url = 'http://localhost:8000/login';

    // Make the HTTP POST request
    this.http.post<LoginResponse>(url, { username: this.username, password: this.password }).subscribe(
      response => {
        // Handle the response as needed
        if (response.errorMessage) {
          const config: MatSnackBarConfig = {
            duration: 3000, // Adjust the duration in milliseconds (e.g., 5000 = 5 seconds)
            panelClass: ['error-snackbar'] // Apply custom CSS class for styling
          };
          this.snackbar.open(`Error ${response.statusCode} : ${response.errorMessage}`, 'Close', config);
        }
      }
    );
  }

  onChangePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }


}
