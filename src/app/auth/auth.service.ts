import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './model/user.model';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {

    }

    login(email: string, password: string): Observable<User> {
        // const user: User = { email, id: '1' };
        // return of(user);
        return this.http.post<User>('http://localhost:9000/api/login', { email, password });
    }

}
