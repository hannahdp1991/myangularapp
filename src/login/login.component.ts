import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = new FormControl();
  password = new FormControl();
  loginForm: FormGroup;
  submitMessage!: string;

  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private routeService: RouterService) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginSubmit() {
    var username = this.loginForm.value.username;
    var password = this.loginForm.value.password;
    if (username != null && username != '' && password != null && password != '') {
      localStorage.setItem('userid', this.loginForm.value.username);
      this.authService.authenticateUser(this.loginForm.value).subscribe(
        (res: { [x: string]: any; }) => {
          console.log(res);
          this.authService.setBearerToken(res['Token']);
          this.routeService.routeToDashboard();
        },
        (err: { error: Error | null; message: string; }) => {
          console.log(err);
          if (err.error != null) {
            this.submitMessage = err.error.message;
          } else {
            this.submitMessage = err.message;
          }
          this.loginForm.reset();
        }
      );
    } else {
      this.submitMessage = 'Unauthorized';
      this.loginForm.reset();
    }
  }

  openSignUpForm() {
    this.routeService.routeToSignUpForm();
  }

  register(username: { value: string | null; }, password: { value: string | null; }) {
    localStorage.setItem('userid', username?.value ?? "");
    if (username.value != null && username.value != '' && password.value != null && password.value != '') {
      this.authService.registerUser(username.value, password.value).subscribe(
        (res: any) => {
          console.log(res);
          this.loginForm.reset();
          this.routeService.routeToLogin();
        },
        (err: { error: string | null; message: string; }) => {
          console.log(err);
          if (err.error != null) {
            this.submitMessage = err.error;
          } else {
            this.submitMessage = err.message;
          }
          this.loginForm.reset();
        }
      );
    }
    else {
      this.submitMessage = "Username/Password cannot be empty";
      this.loginForm.reset();
    }
  }
}
