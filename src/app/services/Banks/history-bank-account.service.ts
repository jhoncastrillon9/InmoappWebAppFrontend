import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HistoryBankAccountModel } from 'src/app/models/Banks/history-bank-account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryBankAccountService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Banks/historyBankAccount/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(historyBankAccount: HistoryBankAccountModel): Observable<HistoryBankAccountModel>{
    let params = new HttpParams();
    if (historyBankAccount.historyBankAccountId != null) { params = params.append('historyBankAccountId', historyBankAccount.historyBankAccountId.toString()); }
    if (historyBankAccount.paymentTypeId != null) { params = params.append('paymentTypeId', historyBankAccount.paymentTypeId.toString()); }
    if (historyBankAccount.bankAccountId != null) { params = params.append('bankAccountId', historyBankAccount.bankAccountId.toString()); }
    if (historyBankAccount.accountsToPayContractsId != null) { params = params.append('accountsToPayContractsId', historyBankAccount.accountsToPayContractsId.toString()); }
    if (historyBankAccount.accountsToReceivableContractsId != null) { params = params.append('accountsToReceivableContractsId', historyBankAccount.accountsToReceivableContractsId.toString()); }
    if (historyBankAccount.obervation != null) { params = params.append('obervation', historyBankAccount.obervation.toString()); }
    if (historyBankAccount.compayId != null) { params = params.append('compayId', historyBankAccount.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Banks/historyBankAccount`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(historyBankAccount: HistoryBankAccountModel): Observable<HistoryBankAccountModel>{
    let params = new HttpParams();
    if (historyBankAccount.historyBankAccountId != null) { params = params.append('historyBankAccountId', historyBankAccount.historyBankAccountId.toString()); }
    if (historyBankAccount.paymentTypeId != null) { params = params.append('paymentTypeId', historyBankAccount.paymentTypeId.toString()); }
    if (historyBankAccount.bankAccountId != null) { params = params.append('bankAccountId', historyBankAccount.bankAccountId.toString()); }
    if (historyBankAccount.accountsToPayContractsId != null) { params = params.append('accountsToPayContractsId', historyBankAccount.accountsToPayContractsId.toString()); }
    if (historyBankAccount.accountsToReceivableContractsId != null) { params = params.append('accountsToReceivableContractsId', historyBankAccount.accountsToReceivableContractsId.toString()); }
    if (historyBankAccount.obervation != null) { params = params.append('obervation', historyBankAccount.obervation.toString()); }
    if (historyBankAccount.compayId != null) { params = params.append('compayId', historyBankAccount.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Banks/historyBankAccount/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(historyBankAccount: HistoryBankAccountModel) {
    const url = environment.URL_SER_NODE + `Banks/historyBankAccount`;
    const res = this.http.post(url, {
      paymentTypeId: historyBankAccount.paymentTypeId,
      value: historyBankAccount.value,
      bankAccountId: historyBankAccount.bankAccountId,
      accountsToPayContractsId: historyBankAccount.accountsToPayContractsId,
      accountsToReceivableContractsId: historyBankAccount.accountsToReceivableContractsId,
      obervation: historyBankAccount.obervation,
      compayId: historyBankAccount.compayId
     });
    return res;
  }

  update(historyBankAccount: HistoryBankAccountModel) {
    const url = environment.URL_SER_NODE + `Banks/historyBankAccount`;
    const res = this.http.put(url, {
      historyBankAccountId: historyBankAccount.historyBankAccountId,
      paymentTypeId: historyBankAccount.paymentTypeId,
      value: historyBankAccount.value,
      bankAccountId: historyBankAccount.bankAccountId,
      accountsToPayContractsId: historyBankAccount.accountsToPayContractsId,
      accountsToReceivableContractsId: historyBankAccount.accountsToReceivableContractsId,
      obervation: historyBankAccount.obervation,
      compayId: historyBankAccount.compayId
    });
    return res;
  }

  enable(historyBankAccountId: number) {
    const url = environment.URL_SER_NODE + `Banks/historyBankAccount/enable`;
    const res = this.http.put(url, {
      historyBankAccountId: historyBankAccountId
    });
    return res;
  }

  disable(historyBankAccountId: number) {
    const url = environment.URL_SER_NODE + `Banks/historyBankAccount/disable`;
    const res = this.http.put(url, {
      historyBankAccountId: historyBankAccountId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Banks/historyBankAccount/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

