import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupResponse } from './signup.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username!: string
  password!: string


  constructor(private http: HttpClient, private snackbar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    const url = 'http://localhost:8000/register';

    // Snackbar config
    const config: MatSnackBarConfig = {
      duration: 2000, // Duration of info window
      panelClass: ['error-snackbar'], // Using this winow style
      verticalPosition: 'top'
    };

    // Making post request to register user
    this.http.post<SignupResponse>(url, { username: this.username, password: this.password }).subscribe(
      response => {
        // Checking if response had any errors
        if (response.errorMessage) {
          this.snackbar.open(`Error ${response.statusCode} : ${response.errorMessage}`, '', config);
          this.username = ""
          this.password = ""
        } else {
          this.snackbar.open(`Successfuly registered new user! Redirecting to login page..`, '', {
            ...config, panelClass: ['ok-snackbar']
          });
          this.username = ""
          this.password = ""
          setTimeout(() => {
            // Call your method here
            this.redirectToLogin()
          }, 1500);
        }
      }
    );
  }

  redirectToLogin() {
    this.router.navigate(["/login"])
  }
}
