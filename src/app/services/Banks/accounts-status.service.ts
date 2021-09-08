import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountsStatusModel } from 'src/app/models/Banks/accounts-status.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsStatusService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Banks/accountsStatus/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(accountsStatus: AccountsStatusModel): Observable<AccountsStatusModel>{
    let params = new HttpParams();
    if (accountsStatus.accountsStatusId != null) { params = params.append('accountsStatusId', accountsStatus.accountsStatusId.toString()); }
    if (accountsStatus.accountsStatusName != null) { params = params.append('accountsStatusName', accountsStatus.accountsStatusName.toString()); }

    const url = environment.URL_SER_NODE + `Banks/accountsStatus`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(accountsStatus: AccountsStatusModel): Observable<AccountsStatusModel>{
    let params = new HttpParams();
    if (accountsStatus.accountsStatusId != null) { params = params.append('accountsStatusId', accountsStatus.accountsStatusId.toString()); }
    if (accountsStatus.accountsStatusName != null) { params = params.append('accountsStatusName', accountsStatus.accountsStatusName.toString()); }

    const url = environment.URL_SER_NODE + `Banks/accountsStatus/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(accountsStatus: AccountsStatusModel) {
    const url = environment.URL_SER_NODE + `Banks/accountsStatus`;
    const res = this.http.post(url, {
      accountsStatusName: accountsStatus.accountsStatusName
     });
    return res;
  }

  update(accountsStatus: AccountsStatusModel) {
    const url = environment.URL_SER_NODE + `Banks/accountsStatus`;
    const res = this.http.put(url, {
      accountsStatusId: accountsStatus.accountsStatusId,
      accountsStatusName: accountsStatus.accountsStatusName
    });
    return res;
  }

  enable(accountsStatusId: number) {
    const url = environment.URL_SER_NODE + `Banks/accountsStatus/enable`;
    const res = this.http.put(url, {
      accountsStatusId: accountsStatusId
    });
    return res;
  }

  disable(accountsStatusId: number) {
    const url = environment.URL_SER_NODE + `Banks/accountsStatus/disable`;
    const res = this.http.put(url, {
      accountsStatusId: accountsStatusId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Banks/accountsStatus/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

