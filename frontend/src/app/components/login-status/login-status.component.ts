import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css'],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string;

  constructor(private oktaAuthService: OktaAuthService) {}

  ngOnInit(): void {
    this.oktaAuthService.$authenticationState.subscribe((result) => {
      this.isAuthenticated = result;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // fetch the logged in user details(user's claims)

      // user full name is exposed as a property name
      this.oktaAuthService
        .getUser()
        .then((res) => (this.userFullName = res.name));
    }
  }

  logout() {
    // terminates the session with Okta and removes current tokens
    this.oktaAuthService.signOut();
  }
}
