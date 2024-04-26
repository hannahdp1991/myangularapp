import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private routeService:RouterService, private authService:AuthenticationService) {
  }

  ngOnInit() {
    // this.noteService.fetchNotesFromServer();
  }

  logout()
  {
    this.authService.setBearerToken("");
    localStorage.setItem("userid", "");
    this.routeService.routeToLogin();
  }
}
