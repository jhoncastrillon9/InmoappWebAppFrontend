import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountsToPayContractModel } from 'src/app/models/Banks/accounts-to-pay-contract.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsToPayContractService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Banks/accountsToPayContract/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(accountsToPayContract: AccountsToPayContractModel): Observable<AccountsToPayContractModel>{
    let params = new HttpParams();
    if (accountsToPayContract.accountsToPayContractId != null) { params = params.append('accountsToPayContractId', accountsToPayContract.accountsToPayContractId.toString()); }
    if (accountsToPayContract.accountsStatusId != null) { params = params.append('accountsStatusId', accountsToPayContract.accountsStatusId.toString()); }
    if (accountsToPayContract.contractId != null) { params = params.append('contractId', accountsToPayContract.contractId.toString()); }
    if (accountsToPayContract.compayId != null) { params = params.append('compayId', accountsToPayContract.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Banks/accountsToPayContract`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(accountsToPayContract: AccountsToPayContractModel): Observable<AccountsToPayContractModel>{
    let params = new HttpParams();
    if (accountsToPayContract.accountsToPayContractId != null) { params = params.append('accountsToPayContractId', accountsToPayContract.accountsToPayContractId.toString()); }
    if (accountsToPayContract.accountsStatusId != null) { params = params.append('accountsStatusId', accountsToPayContract.accountsStatusId.toString()); }
    if (accountsToPayContract.contractId != null) { params = params.append('contractId', accountsToPayContract.contractId.toString()); }
    if (accountsToPayContract.compayId != null) { params = params.append('compayId', accountsToPayContract.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Banks/accountsToPayContract/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(accountsToPayContract: AccountsToPayContractModel) {
    const url = environment.URL_SER_NODE + `Banks/accountsToPayContract`;
    const res = this.http.post(url, {
      quotaNumber: accountsToPayContract.quotaNumber,
      value: accountsToPayContract.value,
      expirationDate: accountsToPayContract.expirationDate,
      accountsStatusId: accountsToPayContract.accountsStatusId,
      contractId: accountsToPayContract.contractId,
      compayId: accountsToPayContract.compayId
     });
    return res;
  }

  update(accountsToPayContract: AccountsToPayContractModel) {
    const url = environment.URL_SER_NODE + `Banks/accountsToPayContract`;
    const res = this.http.put(url, {
      accountsToPayContractId: accountsToPayContract.accountsToPayContractId,
      quotaNumber: accountsToPayContract.quotaNumber,
      value: accountsToPayContract.value,
      expirationDate: accountsToPayContract.expirationDate,
      accountsStatusId: accountsToPayContract.accountsStatusId,
      contractId: accountsToPayContract.contractId,
      compayId: accountsToPayContract.compayId
    });
    return res;
  }

  enable(accountsToPayContractId: number) {
    const url = environment.URL_SER_NODE + `Banks/accountsToPayContract/enable`;
    const res = this.http.put(url, {
      accountsToPayContractId: accountsToPayContractId
    });
    return res;
  }

  disable(accountsToPayContractId: number) {
    const url = environment.URL_SER_NODE + `Banks/accountsToPayContract/disable`;
    const res = this.http.put(url, {
      accountsToPayContractId: accountsToPayContractId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Banks/accountsToPayContract/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

