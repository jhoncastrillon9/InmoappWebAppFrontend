import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CityModel } from 'src/app/models/Commons/city.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Commons/city/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(city: CityModel): Observable<CityModel>{
    let params = new HttpParams();
    if (city.cityId != null) { params = params.append('cityId', city.cityId.toString()); }
    if (city.cityName != null) { params = params.append('cityName', city.cityName.toString()); }
    if (city.stateId != null) { params = params.append('stateId', city.stateId.toString()); }

    const url = environment.URL_SER_NODE + `Commons/city`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(city: CityModel): Observable<CityModel>{
    let params = new HttpParams();
    if (city.cityId != null) { params = params.append('cityId', city.cityId.toString()); }
    if (city.cityName != null) { params = params.append('cityName', city.cityName.toString()); }
    if (city.stateId != null) { params = params.append('stateId', city.stateId.toString()); }

    const url = environment.URL_SER_NODE + `Commons/city/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(city: CityModel) {
    const url = environment.URL_SER_NODE + `Commons/city`;
    const res = this.http.post(url, {
      cityName: city.cityName,
      stateId: city.stateId
     });
    return res;
  }

  update(city: CityModel) {
    const url = environment.URL_SER_NODE + `Commons/city`;
    const res = this.http.put(url, {
      cityId: city.cityId,
      cityName: city.cityName,
      stateId: city.stateId
    });
    return res;
  }

  enable(cityId: number) {
    const url = environment.URL_SER_NODE + `Commons/city/enable`;
    const res = this.http.put(url, {
      cityId: cityId
    });
    return res;
  }

  disable(cityId: number) {
    const url = environment.URL_SER_NODE + `Commons/city/disable`;
    const res = this.http.put(url, {
      cityId: cityId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Commons/city/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

