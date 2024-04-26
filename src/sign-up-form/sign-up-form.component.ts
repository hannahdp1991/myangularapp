import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../user';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RouterService } from '../services/router.service';
import { ToastrService } from 'ngx-toastr'
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  submitMessage!: string;
  signUpForm: FormGroup;
  UserName = new FormControl();
  Password = new FormControl();
  FullName = new FormControl();
  Contact = new FormControl();

  constructor(private dialogRef: MatDialogRef<SignUpFormComponent>,
    private userService: UserService, private routeService: RouterService, private formBuilder: FormBuilder, private toastr: ToastrService, private authService: AuthenticationService) {
    this.signUpForm = formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      FullName: ['', Validators.required],
      Contact: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  OnSubmit() {
    console.log(this.signUpForm);
    var user = new User();
    if (this.signUpForm.valid) {
      user.UserId = this.signUpForm.value.UserName;
      user.Password = this.signUpForm.value.Password;
      user.Name = this.signUpForm.value.FullName;
      user.Contact = this.signUpForm.value.Contact;

      this.userService.addUser(user)
        .subscribe(
          (data: any) => {
            console.log(data);
            this.authService.registerUser(user.UserId, user.Password).subscribe(
              (res) => {
                this.signUpForm.reset();
                this.toastr.success('User registration successful');
                this.dialogRef.close();
              },
              err => {
                console.log(err);
                if (err.error != null) {
                  this.toastr.error(err.error);
                } else {
                  this.toastr.error(err.message);
                }
                this.signUpForm.reset();
              }
            )

          },
          (err: { error: null; message: any; }) => {
            console.log(err);
            if (err.error != null) {
              this.toastr.error(err.error);
            } else {
              this.toastr.error(err.message);
            }
            this.signUpForm.reset();
          });
    }
    else {
      this.toastr.error("Details missing!!!");
    }
  }
}
