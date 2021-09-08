import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaymentTypeModel } from 'src/app/models/Banks/payment-type.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Banks/paymentType/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(paymentType: PaymentTypeModel): Observable<PaymentTypeModel>{
    let params = new HttpParams();
    if (paymentType.paymentTypeId != null) { params = params.append('paymentTypeId', paymentType.paymentTypeId.toString()); }
    if (paymentType.paymentTypeName != null) { params = params.append('paymentTypeName', paymentType.paymentTypeName.toString()); }
    if (paymentType.compayId != null) { params = params.append('compayId', paymentType.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Banks/paymentType`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(paymentType: PaymentTypeModel): Observable<PaymentTypeModel>{
    let params = new HttpParams();
    if (paymentType.paymentTypeId != null) { params = params.append('paymentTypeId', paymentType.paymentTypeId.toString()); }
    if (paymentType.paymentTypeName != null) { params = params.append('paymentTypeName', paymentType.paymentTypeName.toString()); }
    if (paymentType.compayId != null) { params = params.append('compayId', paymentType.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Banks/paymentType/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(paymentType: PaymentTypeModel) {
    const url = environment.URL_SER_NODE + `Banks/paymentType`;
    const res = this.http.post(url, {
      paymentTypeName: paymentType.paymentTypeName,
      compayId: paymentType.compayId
     });
    return res;
  }

  update(paymentType: PaymentTypeModel) {
    const url = environment.URL_SER_NODE + `Banks/paymentType`;
    const res = this.http.put(url, {
      paymentTypeId: paymentType.paymentTypeId,
      paymentTypeName: paymentType.paymentTypeName,
      compayId: paymentType.compayId
    });
    return res;
  }

  enable(paymentTypeId: number) {
    const url = environment.URL_SER_NODE + `Banks/paymentType/enable`;
    const res = this.http.put(url, {
      paymentTypeId: paymentTypeId
    });
    return res;
  }

  disable(paymentTypeId: number) {
    const url = environment.URL_SER_NODE + `Banks/paymentType/disable`;
    const res = this.http.put(url, {
      paymentTypeId: paymentTypeId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Banks/paymentType/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

