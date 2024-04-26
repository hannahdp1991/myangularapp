import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthObject } from '../authobject';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(data: any) {
    var user = new AuthObject ();
    user.username=data.username;
    user.password=data.password;
    return this.httpClient.post('https://nodebackendserver.azurewebsites.net/auth/login/',user);
  }

  registerUser(username: string, password: string) {
    var user = new AuthObject ();
    user.username=username;
    user.password=password;
    console.log(user);
    return this.httpClient.post('https://nodebackendserver.azurewebsites.net/auth/register/',user);
  }
  
  setBearerToken(token: string) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token: any): Promise<boolean | undefined> {
    return this.httpClient.post<boolean>('https://nodebackendserver.azurewebsites.net/auth/isAuthenticated', {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    }).toPromise();
  }
}
