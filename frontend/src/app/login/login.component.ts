import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginResponse } from './login.interface';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string
  password!: string
  constructor(private http: HttpClient, private snackbar: SnackbarService, private router: Router) {
  }

  ngOnInit(): void {
  }
  login() {
    const url = 'http://localhost:8000/login';

    // Snackbar config
    const config: MatSnackBarConfig = {
      duration: 2000, // Adjust the duration in milliseconds (e.g., 5000 = 5 seconds)
      panelClass: ['error-snackbar'],
      verticalPosition: 'top' // Apply custom CSS class for styling
    };

    // Make the HTTP POST request
    this.http.post<LoginResponse>(url, { username: this.username, password: this.password }).subscribe(
      response => {
        // Handle the response as needed
        if (response.errorMessage) {
          this.snackbar.showSnackbar(`Error ${response.statusCode} : ${response.errorMessage}`, true)
          this.username = ""
          this.password = ""
        } else {
          this.snackbar.showSnackbar(`Successfuly logged in! Redirecting...`, false)
          sessionStorage.setItem('token', response.accessToken);
          sessionStorage.setItem('user', response.username)
          setTimeout(() => {
            this.redirectToChat()
          }, 2000)
        }
      }
    );
  }

  onChangePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value;
  }

  redirectToSignup() {
    this.router.navigate(["/signup"])
  }

  redirectToChat() {
    this.router.navigate(["/chat"])
  }


}
