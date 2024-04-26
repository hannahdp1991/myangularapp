import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {
  constructor(private router: Router) {

  }
  routeToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['/login']);
  }

  routeToSignUpForm() {
    this.router.navigate(['/login', {
      outlets: { signUpOutlet: ['signup'] }
    }]);
  }
}
