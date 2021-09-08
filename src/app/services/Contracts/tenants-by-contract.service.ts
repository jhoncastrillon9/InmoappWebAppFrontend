import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TenantsByContractModel } from 'src/app/models/Contracts/tenants-by-contract.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantsByContractService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Contracts/tenantsByContract/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(tenantsByContract: TenantsByContractModel): Observable<TenantsByContractModel>{
    let params = new HttpParams();
    if (tenantsByContract.tenantsByContractId != null) { params = params.append('tenantsByContractId', tenantsByContract.tenantsByContractId.toString()); }
    if (tenantsByContract.tenantId != null) { params = params.append('tenantId', tenantsByContract.tenantId.toString()); }
    if (tenantsByContract.profile != null) { params = params.append('profile', tenantsByContract.profile.toString()); }

    const url = environment.URL_SER_NODE + `Contracts/tenantsByContract`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(tenantsByContract: TenantsByContractModel): Observable<TenantsByContractModel>{
    let params = new HttpParams();
    if (tenantsByContract.tenantsByContractId != null) { params = params.append('tenantsByContractId', tenantsByContract.tenantsByContractId.toString()); }
    if (tenantsByContract.tenantId != null) { params = params.append('tenantId', tenantsByContract.tenantId.toString()); }
    if (tenantsByContract.profile != null) { params = params.append('profile', tenantsByContract.profile.toString()); }

    const url = environment.URL_SER_NODE + `Contracts/tenantsByContract/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(tenantsByContract: TenantsByContractModel) {
    const url = environment.URL_SER_NODE + `Contracts/tenantsByContract`;
    const res = this.http.post(url, {
      tenantId: tenantsByContract.tenantId,
      profile: tenantsByContract.profile
     });
    return res;
  }

  update(tenantsByContract: TenantsByContractModel) {
    const url = environment.URL_SER_NODE + `Contracts/tenantsByContract`;
    const res = this.http.put(url, {
      tenantsByContractId: tenantsByContract.tenantsByContractId,
      tenantId: tenantsByContract.tenantId,
      profile: tenantsByContract.profile
    });
    return res;
  }

  enable(tenantsByContractId: number) {
    const url = environment.URL_SER_NODE + `Contracts/tenantsByContract/enable`;
    const res = this.http.put(url, {
      tenantsByContractId: tenantsByContractId
    });
    return res;
  }

  disable(tenantsByContractId: number) {
    const url = environment.URL_SER_NODE + `Contracts/tenantsByContract/disable`;
    const res = this.http.put(url, {
      tenantsByContractId: tenantsByContractId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Contracts/tenantsByContract/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

