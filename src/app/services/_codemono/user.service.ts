import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserModel } from 'src/app/models/_codemono/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(id: number): any {
    const url = environment.URL_SER_NODE + `user/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(user: UserModel): Observable<UserModel> {
    let params = new HttpParams();
    if (user.userId != null) { params = params.append('userId', user.userId.toString()); }
    if (user.firstName != null) { params = params.append('firstName', user.firstName); }
    if (user.lastName != null) { params = params.append('lastName', user.lastName); }
    if (user.userTypeId != null) { params = params.append('userTypeId', user.userTypeId.toString()); }
    if (user.username != null) { params = params.append('username', user.username); }
    if (user.password != null) { params = params.append('password', user.password); }
    if (user.avatar != null) { params = params.append('avatar', user.avatar); }
    if (user.active != null) { params = params.append('active', user.active.toString()); }

    const url = environment.URL_SER_NODE + `user`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(user: UserModel): any {
    const url = environment.URL_SER_NODE + `user`;
    const res = this.http.post(url, {
      firstName: user.firstName,
      lastName: user.lastName,
      userTypeId: user.userTypeId,
      username: user.username,
      password: user.password,
      avatar: user.avatar,
      active: user.active
    });
    return res;
  }

  update(user: UserModel): any {
    const url = environment.URL_SER_NODE + `user`;
    const res = this.http.put(url, {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      userTypeId: user.userTypeId,
      username: user.username,
      password: user.password,
      avatar: user.avatar,
      active: user.active
    });
    return res;
  }

  enable(id: number): any {
    const url = environment.URL_SER_NODE + `user/enable`;
    const res = this.http.put(url, { userId: id });
    return res;
  }

  disable(id: number): any {
    const url = environment.URL_SER_NODE + `user/disable`;
    const res = this.http.put(url, { userId: id });
    return res;
  }

  delete(id: string): any {
    const url = environment.URL_SER_NODE + `user/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}
