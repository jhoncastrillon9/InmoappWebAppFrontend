import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BankAccountModel } from 'src/app/models/Banks/bank-account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Banks/bankAccount/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(bankAccount: BankAccountModel): Observable<BankAccountModel>{
    let params = new HttpParams();
    if (bankAccount.bankAccountId != null) { params = params.append('bankAccountId', bankAccount.bankAccountId.toString()); }
    if (bankAccount.bankAccountName != null) { params = params.append('bankAccountName', bankAccount.bankAccountName.toString()); }
    if (bankAccount.compayId != null) { params = params.append('compayId', bankAccount.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Banks/bankAccount`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(bankAccount: BankAccountModel): Observable<BankAccountModel>{
    let params = new HttpParams();
    if (bankAccount.bankAccountId != null) { params = params.append('bankAccountId', bankAccount.bankAccountId.toString()); }
    if (bankAccount.bankAccountName != null) { params = params.append('bankAccountName', bankAccount.bankAccountName.toString()); }
    if (bankAccount.compayId != null) { params = params.append('compayId', bankAccount.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Banks/bankAccount/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(bankAccount: BankAccountModel) {
    const url = environment.URL_SER_NODE + `Banks/bankAccount`;
    const res = this.http.post(url, {
      bankAccountName: bankAccount.bankAccountName,
      total: bankAccount.total,
      compayId: bankAccount.compayId
     });
    return res;
  }

  update(bankAccount: BankAccountModel) {
    const url = environment.URL_SER_NODE + `Banks/bankAccount`;
    const res = this.http.put(url, {
      bankAccountId: bankAccount.bankAccountId,
      bankAccountName: bankAccount.bankAccountName,
      total: bankAccount.total,
      compayId: bankAccount.compayId
    });
    return res;
  }

  enable(bankAccountId: number) {
    const url = environment.URL_SER_NODE + `Banks/bankAccount/enable`;
    const res = this.http.put(url, {
      bankAccountId: bankAccountId
    });
    return res;
  }

  disable(bankAccountId: number) {
    const url = environment.URL_SER_NODE + `Banks/bankAccount/disable`;
    const res = this.http.put(url, {
      bankAccountId: bankAccountId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Banks/bankAccount/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

