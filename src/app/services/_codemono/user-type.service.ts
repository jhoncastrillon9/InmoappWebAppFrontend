import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserTypeModel } from 'src/app/models/_codemono/user-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  constructor(private http: HttpClient) { }

  get(id: number): any{
    const url = environment.URL_SER_NODE + `userType/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(userType: UserTypeModel): Observable<UserTypeModel>{
    let params = new HttpParams();
    if (userType.userTypeId != null) { params = params.append('userTypeId', userType.userTypeId.toString()); }
    if (userType.userType != null) { params = params.append('userType', userType.userType.toString()); }
    if (userType.active != null) { params = params.append('active', userType.active.toString()); }

    const url = environment.URL_SER_NODE + `userType`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(userType: UserTypeModel): Observable<UserTypeModel>{
    let params = new HttpParams();
    if (userType.userTypeId != null) { params = params.append('userTypeId', userType.userTypeId.toString()); }
    if (userType.userType != null) { params = params.append('userType', userType.userType.toString()); }
    if (userType.active != null) { params = params.append('active', userType.active.toString()); }

    const url = environment.URL_SER_NODE + `userType/List`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(userType: UserTypeModel): any {
    const url = environment.URL_SER_NODE + `userType`;
    const res = this.http.post(url, {
      userTypeId: userType.userTypeId,
      userType: userType.userType
     });
    return res;
  }

  update(userType: UserTypeModel): any {
    const url = environment.URL_SER_NODE + `userType`;
    const res = this.http.put(url, {
      userTypeId: userType.userTypeId,
      userType: userType.userType
    });
    return res;
  }

  enable(userTypeId: number): any {
    const url = environment.URL_SER_NODE + `userType/enable`;
    const res = this.http.put(url, {
      userTypeId
    });
    return res;
  }

  disable(userTypeId: number): any {
    const url = environment.URL_SER_NODE + `userType/disable`;
    const res = this.http.put(url, {
      userTypeId
    });
    return res;
  }

  delete(id: string): any {
    const url = environment.URL_SER_NODE + `userType/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

