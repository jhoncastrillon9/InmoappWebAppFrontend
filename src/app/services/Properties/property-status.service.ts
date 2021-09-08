import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PropertyStatusModel } from 'src/app/models/Properties/property-status.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyStatusService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Properties/propertyStatus/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(propertyStatus: PropertyStatusModel): Observable<PropertyStatusModel>{
    let params = new HttpParams();
    if (propertyStatus.propertyStatusId != null) { params = params.append('propertyStatusId', propertyStatus.propertyStatusId.toString()); }
    if (propertyStatus.propertyStatusName != null) { params = params.append('propertyStatusName', propertyStatus.propertyStatusName.toString()); }

    const url = environment.URL_SER_NODE + `Properties/propertyStatus`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(propertyStatus: PropertyStatusModel): Observable<PropertyStatusModel>{
    let params = new HttpParams();
    if (propertyStatus.propertyStatusId != null) { params = params.append('propertyStatusId', propertyStatus.propertyStatusId.toString()); }
    if (propertyStatus.propertyStatusName != null) { params = params.append('propertyStatusName', propertyStatus.propertyStatusName.toString()); }

    const url = environment.URL_SER_NODE + `Properties/propertyStatus/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(propertyStatus: PropertyStatusModel) {
    const url = environment.URL_SER_NODE + `Properties/propertyStatus`;
    const res = this.http.post(url, {
      propertyStatusName: propertyStatus.propertyStatusName
     });
    return res;
  }

  update(propertyStatus: PropertyStatusModel) {
    const url = environment.URL_SER_NODE + `Properties/propertyStatus`;
    const res = this.http.put(url, {
      propertyStatusId: propertyStatus.propertyStatusId,
      propertyStatusName: propertyStatus.propertyStatusName
    });
    return res;
  }

  enable(propertyStatusId: number) {
    const url = environment.URL_SER_NODE + `Properties/propertyStatus/enable`;
    const res = this.http.put(url, {
      propertyStatusId: propertyStatusId
    });
    return res;
  }

  disable(propertyStatusId: number) {
    const url = environment.URL_SER_NODE + `Properties/propertyStatus/disable`;
    const res = this.http.put(url, {
      propertyStatusId: propertyStatusId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Properties/propertyStatus/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

