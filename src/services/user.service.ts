import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {
    user: User;
    userSubject: BehaviorSubject<User>;
    constructor(private http: HttpClient) {
        this.user = new User();
        this.userSubject = new BehaviorSubject<User>(new User());
    }

    fetchUserFromServer() {
        var id = localStorage.getItem("userid");
        this.http.get<User>(`http://localhost:49799/api/user/${id}`
        ).subscribe(Founduser => {
            if (Founduser != null) {
                this.user = Founduser;
            }
            this.userSubject.next(this.user);
        },
            error => {
                console.log(error);
                this.userSubject.next(new User());
            });
    }

    addUser(user:User): Observable<User> {
        return this.http.post<User>(`http://localhost:49799/api/user`, user
        ).pipe(tap(addUser => {
          this.user = addUser ;
          this.userSubject.next(this.user);
        }));
      }

    getUsers(): BehaviorSubject<User> {
        return this.userSubject;
    }

}
