import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/_codemono/user.model';
import { environment } from 'src/environments/environment';
import { LocalService } from 'src/app/services/_codemono/local.service';
import { SessionService } from 'src/app/services/_codemono/session.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private http: HttpClient,
              private localService: LocalService,
              private sessionService: SessionService,
              private router: Router,
              ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(this.localService.getJsonValue(environment.APP_ID));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  public get currentUserValueAcceso(): UserModel {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): any {
    const url = environment.URL_SER_NODE + `authentication`;

    // console.log(url);
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(url, { username, password })
        .subscribe((res: any) => {

            // console.log(res);
            const dataResult = res.data;
            if (dataResult.authenticated === 1) {
              let user = new UserModel();
              user = dataResult;
              user.token = res.token;
              user.avatar = user.avatar;
              this.localService.setJsonValue(environment.APP_ID, user);
              this.currentUserSubject.next(user);
              resolve(user);
              return;
            }
            reject(res.data);
            return;
        },
          (err) => {
            reject(err);
          },
          () => {}
        );
    });
  }

  logout(): void {
    // localStorage.clear();
    localStorage.removeItem('df4dafc979b8afb15494b946dfb024ebceb0405f12205cf3c0d6188c78854f06');
    sessionStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/login');
  }

  block(): void {
    sessionStorage.clear();
  }

  refresh(): void {
    const url = environment.URL_SER_NODE + `authenticate`;
    this.http.get(url).subscribe((res: any) => {

      const dataResult = res.data[0];
      if (dataResult.authenticated === 1) {
        const token = this.currentUserValue.token;

        let user = new UserModel();
        user = dataResult;
        user.token = token;
        user.avatar = user.avatar;
        this.localService.setJsonValue(environment.APP_ID, user);
        this.currentUserSubject.next(user);
        return user;
      }

    });
  }

}
