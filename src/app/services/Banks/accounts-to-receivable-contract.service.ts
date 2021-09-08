import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AccountsToReceivableContractModel } from 'src/app/models/Banks/accounts-to-receivable-contract.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsToReceivableContractService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Banks/accountsToReceivableContract/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(accountsToReceivableContract: AccountsToReceivableContractModel): Observable<AccountsToReceivableContractModel>{
    let params = new HttpParams();
    if (accountsToReceivableContract.accountsToReceivableContractId != null) { params = params.append('accountsToReceivableContractId', accountsToReceivableContract.accountsToReceivableContractId.toString()); }
    if (accountsToReceivableContract.accountsStatusId != null) { params = params.append('accountsStatusId', accountsToReceivableContract.accountsStatusId.toString()); }
    if (accountsToReceivableContract.contractId != null) { params = params.append('contractId', accountsToReceivableContract.contractId.toString()); }
    if (accountsToReceivableContract.compayId != null) { params = params.append('compayId', accountsToReceivableContract.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Banks/accountsToReceivableContract`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(accountsToReceivableContract: AccountsToReceivableContractModel): Observable<AccountsToReceivableContractModel>{
    let params = new HttpParams();
    if (accountsToReceivableContract.accountsToReceivableContractId != null) { params = params.append('accountsToReceivableContractId', accountsToReceivableContract.accountsToReceivableContractId.toString()); }
    if (accountsToReceivableContract.accountsStatusId != null) { params = params.append('accountsStatusId', accountsToReceivableContract.accountsStatusId.toString()); }
    if (accountsToReceivableContract.contractId != null) { params = params.append('contractId', accountsToReceivableContract.contractId.toString()); }
    if (accountsToReceivableContract.compayId != null) { params = params.append('compayId', accountsToReceivableContract.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Banks/accountsToReceivableContract/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(accountsToReceivableContract: AccountsToReceivableContractModel) {
    const url = environment.URL_SER_NODE + `Banks/accountsToReceivableContract`;
    const res = this.http.post(url, {
      quotaNumber: accountsToReceivableContract.quotaNumber,
      value: accountsToReceivableContract.value,
      expirationDate: accountsToReceivableContract.expirationDate,
      accountsStatusId: accountsToReceivableContract.accountsStatusId,
      contractId: accountsToReceivableContract.contractId,
      compayId: accountsToReceivableContract.compayId
     });
    return res;
  }

  update(accountsToReceivableContract: AccountsToReceivableContractModel) {
    const url = environment.URL_SER_NODE + `Banks/accountsToReceivableContract`;
    const res = this.http.put(url, {
      accountsToReceivableContractId: accountsToReceivableContract.accountsToReceivableContractId,
      quotaNumber: accountsToReceivableContract.quotaNumber,
      value: accountsToReceivableContract.value,
      expirationDate: accountsToReceivableContract.expirationDate,
      accountsStatusId: accountsToReceivableContract.accountsStatusId,
      contractId: accountsToReceivableContract.contractId,
      compayId: accountsToReceivableContract.compayId
    });
    return res;
  }

  enable(accountsToReceivableContractId: number) {
    const url = environment.URL_SER_NODE + `Banks/accountsToReceivableContract/enable`;
    const res = this.http.put(url, {
      accountsToReceivableContractId: accountsToReceivableContractId
    });
    return res;
  }

  disable(accountsToReceivableContractId: number) {
    const url = environment.URL_SER_NODE + `Banks/accountsToReceivableContract/disable`;
    const res = this.http.put(url, {
      accountsToReceivableContractId: accountsToReceivableContractId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Banks/accountsToReceivableContract/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

