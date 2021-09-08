import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyModel } from 'src/app/models/Companies/company.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Companies/company/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(company: CompanyModel): Observable<CompanyModel>{
    let params = new HttpParams();
    if (company.compayId != null) { params = params.append('compayId', company.compayId.toString()); }
    if (company.companyName != null) { params = params.append('companyName', company.companyName.toString()); }
    if (company.document != null) { params = params.append('document', company.document.toString()); }
    if (company.telephone != null) { params = params.append('telephone', company.telephone.toString()); }
    if (company.mobile != null) { params = params.append('mobile', company.mobile.toString()); }
    if (company.email != null) { params = params.append('email', company.email.toString()); }
    if (company.address != null) { params = params.append('address', company.address.toString()); }
    if (company.observation != null) { params = params.append('observation', company.observation.toString()); }

    const url = environment.URL_SER_NODE + `Companies/company`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(company: CompanyModel): Observable<CompanyModel>{
    let params = new HttpParams();
    if (company.compayId != null) { params = params.append('compayId', company.compayId.toString()); }
    if (company.companyName != null) { params = params.append('companyName', company.companyName.toString()); }
    if (company.document != null) { params = params.append('document', company.document.toString()); }
    if (company.telephone != null) { params = params.append('telephone', company.telephone.toString()); }
    if (company.mobile != null) { params = params.append('mobile', company.mobile.toString()); }
    if (company.email != null) { params = params.append('email', company.email.toString()); }
    if (company.address != null) { params = params.append('address', company.address.toString()); }
    if (company.observation != null) { params = params.append('observation', company.observation.toString()); }

    const url = environment.URL_SER_NODE + `Companies/company/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(company: CompanyModel) {
    const url = environment.URL_SER_NODE + `Companies/company`;
    const res = this.http.post(url, {
      companyName: company.companyName,
      document: company.document,
      telephone: company.telephone,
      mobile: company.mobile,
      email: company.email,
      address: company.address,
      observation: company.observation
     });
    return res;
  }

  update(company: CompanyModel) {
    const url = environment.URL_SER_NODE + `Companies/company`;
    const res = this.http.put(url, {
      compayId: company.compayId,
      companyName: company.companyName,
      document: company.document,
      telephone: company.telephone,
      mobile: company.mobile,
      email: company.email,
      address: company.address,
      observation: company.observation
    });
    return res;
  }

  enable(compayId: number) {
    const url = environment.URL_SER_NODE + `Companies/company/enable`;
    const res = this.http.put(url, {
      compayId: compayId
    });
    return res;
  }

  disable(compayId: number) {
    const url = environment.URL_SER_NODE + `Companies/company/disable`;
    const res = this.http.put(url, {
      compayId: compayId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Companies/company/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

