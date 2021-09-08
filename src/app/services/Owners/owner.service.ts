import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OwnerModel } from 'src/app/models/Owners/owner.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Owners/owner/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(owner: OwnerModel): Observable<OwnerModel>{
    let params = new HttpParams();
    if (owner.ownerId != null) { params = params.append('ownerId', owner.ownerId.toString()); }
    if (owner.ownerName != null) { params = params.append('ownerName', owner.ownerName.toString()); }
    if (owner.document != null) { params = params.append('document', owner.document.toString()); }
    if (owner.telephone != null) { params = params.append('telephone', owner.telephone.toString()); }
    if (owner.mobile != null) { params = params.append('mobile', owner.mobile.toString()); }
    if (owner.email != null) { params = params.append('email', owner.email.toString()); }
    if (owner.address != null) { params = params.append('address', owner.address.toString()); }
    if (owner.observation != null) { params = params.append('observation', owner.observation.toString()); }
    if (owner.compayId != null) { params = params.append('compayId', owner.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Owners/owner`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(owner: OwnerModel): Observable<OwnerModel>{
    let params = new HttpParams();
    if (owner.ownerId != null) { params = params.append('ownerId', owner.ownerId.toString()); }
    if (owner.ownerName != null) { params = params.append('ownerName', owner.ownerName.toString()); }
    if (owner.document != null) { params = params.append('document', owner.document.toString()); }
    if (owner.telephone != null) { params = params.append('telephone', owner.telephone.toString()); }
    if (owner.mobile != null) { params = params.append('mobile', owner.mobile.toString()); }
    if (owner.email != null) { params = params.append('email', owner.email.toString()); }
    if (owner.address != null) { params = params.append('address', owner.address.toString()); }
    if (owner.observation != null) { params = params.append('observation', owner.observation.toString()); }
    if (owner.compayId != null) { params = params.append('compayId', owner.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Owners/owner/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(owner: OwnerModel) {
    const url = environment.URL_SER_NODE + `Owners/owner`;
    const res = this.http.post(url, {
      ownerName: owner.ownerName,
      document: owner.document,
      telephone: owner.telephone,
      mobile: owner.mobile,
      email: owner.email,
      address: owner.address,
      observation: owner.observation,
      compayId: owner.compayId
     });
    return res;
  }

  update(owner: OwnerModel) {
    const url = environment.URL_SER_NODE + `Owners/owner`;
    const res = this.http.put(url, {
      ownerId: owner.ownerId,
      ownerName: owner.ownerName,
      document: owner.document,
      telephone: owner.telephone,
      mobile: owner.mobile,
      email: owner.email,
      address: owner.address,
      observation: owner.observation,
      compayId: owner.compayId
    });
    return res;
  }

  enable(ownerId: number) {
    const url = environment.URL_SER_NODE + `Owners/owner/enable`;
    const res = this.http.put(url, {
      ownerId: ownerId
    });
    return res;
  }

  disable(ownerId: number) {
    const url = environment.URL_SER_NODE + `Owners/owner/disable`;
    const res = this.http.put(url, {
      ownerId: ownerId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Owners/owner/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

