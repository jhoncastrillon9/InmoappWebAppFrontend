import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ZoneModel } from 'src/app/models/Commons/zone.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Commons/zone/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(zone: ZoneModel): Observable<ZoneModel>{
    let params = new HttpParams();
    if (zone.zoneId != null) { params = params.append('zoneId', zone.zoneId.toString()); }
    if (zone.zoneName != null) { params = params.append('zoneName', zone.zoneName.toString()); }
    if (zone.cityId != null) { params = params.append('cityId', zone.cityId.toString()); }

    const url = environment.URL_SER_NODE + `Commons/zone`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(zone: ZoneModel): Observable<ZoneModel>{
    let params = new HttpParams();
    if (zone.zoneId != null) { params = params.append('zoneId', zone.zoneId.toString()); }
    if (zone.zoneName != null) { params = params.append('zoneName', zone.zoneName.toString()); }
    if (zone.cityId != null) { params = params.append('cityId', zone.cityId.toString()); }

    const url = environment.URL_SER_NODE + `Commons/zone/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(zone: ZoneModel) {
    const url = environment.URL_SER_NODE + `Commons/zone`;
    const res = this.http.post(url, {
      zoneName: zone.zoneName,
      cityId: zone.cityId
     });
    return res;
  }

  update(zone: ZoneModel) {
    const url = environment.URL_SER_NODE + `Commons/zone`;
    const res = this.http.put(url, {
      zoneId: zone.zoneId,
      zoneName: zone.zoneName,
      cityId: zone.cityId
    });
    return res;
  }

  enable(zoneId: number) {
    const url = environment.URL_SER_NODE + `Commons/zone/enable`;
    const res = this.http.put(url, {
      zoneId: zoneId
    });
    return res;
  }

  disable(zoneId: number) {
    const url = environment.URL_SER_NODE + `Commons/zone/disable`;
    const res = this.http.put(url, {
      zoneId: zoneId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Commons/zone/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

