import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TenantModel } from 'src/app/models/Tenants/tenant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Tenants/tenant/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(tenant: TenantModel): Observable<TenantModel>{
    let params = new HttpParams();
    if (tenant.tenantId != null) { params = params.append('tenantId', tenant.tenantId.toString()); }
    if (tenant.tenantName != null) { params = params.append('tenantName', tenant.tenantName.toString()); }
    if (tenant.document != null) { params = params.append('document', tenant.document.toString()); }
    if (tenant.telephone != null) { params = params.append('telephone', tenant.telephone.toString()); }
    if (tenant.mobile != null) { params = params.append('mobile', tenant.mobile.toString()); }
    if (tenant.email != null) { params = params.append('email', tenant.email.toString()); }
    if (tenant.address != null) { params = params.append('address', tenant.address.toString()); }
    if (tenant.observation != null) { params = params.append('observation', tenant.observation.toString()); }
    if (tenant.compayId != null) { params = params.append('compayId', tenant.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Tenants/tenant`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(tenant: TenantModel): Observable<TenantModel>{
    let params = new HttpParams();
    if (tenant.tenantId != null) { params = params.append('tenantId', tenant.tenantId.toString()); }
    if (tenant.tenantName != null) { params = params.append('tenantName', tenant.tenantName.toString()); }
    if (tenant.document != null) { params = params.append('document', tenant.document.toString()); }
    if (tenant.telephone != null) { params = params.append('telephone', tenant.telephone.toString()); }
    if (tenant.mobile != null) { params = params.append('mobile', tenant.mobile.toString()); }
    if (tenant.email != null) { params = params.append('email', tenant.email.toString()); }
    if (tenant.address != null) { params = params.append('address', tenant.address.toString()); }
    if (tenant.observation != null) { params = params.append('observation', tenant.observation.toString()); }
    if (tenant.compayId != null) { params = params.append('compayId', tenant.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Tenants/tenant/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(tenant: TenantModel) {
    const url = environment.URL_SER_NODE + `Tenants/tenant`;
    const res = this.http.post(url, {
      tenantName: tenant.tenantName,
      document: tenant.document,
      telephone: tenant.telephone,
      mobile: tenant.mobile,
      email: tenant.email,
      address: tenant.address,
      observation: tenant.observation,
      compayId: tenant.compayId
     });
    return res;
  }

  update(tenant: TenantModel) {
    const url = environment.URL_SER_NODE + `Tenants/tenant`;
    const res = this.http.put(url, {
      tenantId: tenant.tenantId,
      tenantName: tenant.tenantName,
      document: tenant.document,
      telephone: tenant.telephone,
      mobile: tenant.mobile,
      email: tenant.email,
      address: tenant.address,
      observation: tenant.observation,
      compayId: tenant.compayId
    });
    return res;
  }

  enable(tenantId: number) {
    const url = environment.URL_SER_NODE + `Tenants/tenant/enable`;
    const res = this.http.put(url, {
      tenantId: tenantId
    });
    return res;
  }

  disable(tenantId: number) {
    const url = environment.URL_SER_NODE + `Tenants/tenant/disable`;
    const res = this.http.put(url, {
      tenantId: tenantId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Tenants/tenant/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

