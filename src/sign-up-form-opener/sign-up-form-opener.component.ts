import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterService } from '../services/router.service';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-sign-up-form-opener',
  templateUrl: './sign-up-form-opener.component.html',
  styleUrls: ['./sign-up-form-opener.component.css']
})
export class SignUpFormOpenerComponent implements OnInit {

  constructor(private dialog: MatDialog, private routerService: RouterService) {
    this.dialog.open(SignUpFormComponent).afterClosed().subscribe(
      () => {
      this.routerService.routeToLogin();
    });
  }

  ngOnInit() {
  }

}
