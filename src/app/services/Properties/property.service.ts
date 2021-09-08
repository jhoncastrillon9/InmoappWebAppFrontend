import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PropertyModel } from 'src/app/models/Properties/property.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Properties/property/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(property: PropertyModel): Observable<PropertyModel>{
    let params = new HttpParams();
    if (property.propertyId != null) { params = params.append('propertyId', property.propertyId.toString()); }
    if (property.idIva != null) { params = params.append('idIva', property.idIva.toString()); }
    if (property.code != null) { params = params.append('code', property.code.toString()); }
    if (property.title != null) { params = params.append('title', property.title.toString()); }
    if (property.description != null) { params = params.append('description', property.description.toString()); }
    if (property.address != null) { params = params.append('address', property.address.toString()); }
    if (property.reception != null) { params = params.append('reception', property.reception.toString()); }
    if (property.pool != null) { params = params.append('pool', property.pool.toString()); }
    if (property.observation != null) { params = params.append('observation', property.observation.toString()); }
    if (property.propertyStatusId != null) { params = params.append('propertyStatusId', property.propertyStatusId.toString()); }
    if (property.cityId != null) { params = params.append('cityId', property.cityId.toString()); }
    if (property.zoneId != null) { params = params.append('zoneId', property.zoneId.toString()); }
    if (property.ownerId != null) { params = params.append('ownerId', property.ownerId.toString()); }
    if (property.propertyCategoryId != null) { params = params.append('propertyCategoryId', property.propertyCategoryId.toString()); }
    if (property.typeOfferId != null) { params = params.append('typeOfferId', property.typeOfferId.toString()); }
    if (property.compayId != null) { params = params.append('compayId', property.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Properties/property`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(property: PropertyModel): Observable<PropertyModel>{
    let params = new HttpParams();
    if (property.propertyId != null) { params = params.append('propertyId', property.propertyId.toString()); }
    if (property.idIva != null) { params = params.append('idIva', property.idIva.toString()); }
    if (property.code != null) { params = params.append('code', property.code.toString()); }
    if (property.title != null) { params = params.append('title', property.title.toString()); }
    if (property.description != null) { params = params.append('description', property.description.toString()); }
    if (property.address != null) { params = params.append('address', property.address.toString()); }
    if (property.reception != null) { params = params.append('reception', property.reception.toString()); }
    if (property.pool != null) { params = params.append('pool', property.pool.toString()); }
    if (property.observation != null) { params = params.append('observation', property.observation.toString()); }
    if (property.propertyStatusId != null) { params = params.append('propertyStatusId', property.propertyStatusId.toString()); }
    if (property.cityId != null) { params = params.append('cityId', property.cityId.toString()); }
    if (property.zoneId != null) { params = params.append('zoneId', property.zoneId.toString()); }
    if (property.ownerId != null) { params = params.append('ownerId', property.ownerId.toString()); }
    if (property.propertyCategoryId != null) { params = params.append('propertyCategoryId', property.propertyCategoryId.toString()); }
    if (property.typeOfferId != null) { params = params.append('typeOfferId', property.typeOfferId.toString()); }
    if (property.compayId != null) { params = params.append('compayId', property.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Properties/property/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(property: PropertyModel) {
    const url = environment.URL_SER_NODE + `Properties/property`;
    const res = this.http.post(url, {
      idIva: property.idIva,
      code: property.code,
      title: property.title,
      description: property.description,
      address: property.address,
      priceOwner: property.priceOwner,
      percentage: property.percentage,
      feeCompany: property.feeCompany,
      recruitmentDate: property.recruitmentDate,
      finalPrice: property.finalPrice,
      rooms: property.rooms,
      toilets: property.toilets,
      reception: property.reception,
      pool: property.pool,
      area: property.area,
      observation: property.observation,
      propertyStatusId: property.propertyStatusId,
      cityId: property.cityId,
      zoneId: property.zoneId,
      ownerId: property.ownerId,
      propertyCategoryId: property.propertyCategoryId,
      typeOfferId: property.typeOfferId,
      compayId: property.compayId
     });
    return res;
  }

  update(property: PropertyModel) {
    const url = environment.URL_SER_NODE + `Properties/property`;
    const res = this.http.put(url, {
      propertyId: property.propertyId,
      idIva: property.idIva,
      code: property.code,
      title: property.title,
      description: property.description,
      address: property.address,
      priceOwner: property.priceOwner,
      percentage: property.percentage,
      feeCompany: property.feeCompany,
      recruitmentDate: property.recruitmentDate,
      finalPrice: property.finalPrice,
      rooms: property.rooms,
      toilets: property.toilets,
      reception: property.reception,
      pool: property.pool,
      area: property.area,
      observation: property.observation,
      propertyStatusId: property.propertyStatusId,
      cityId: property.cityId,
      zoneId: property.zoneId,
      ownerId: property.ownerId,
      propertyCategoryId: property.propertyCategoryId,
      typeOfferId: property.typeOfferId,
      compayId: property.compayId
    });
    return res;
  }

  enable(propertyId: number) {
    const url = environment.URL_SER_NODE + `Properties/property/enable`;
    const res = this.http.put(url, {
      propertyId: propertyId
    });
    return res;
  }

  disable(propertyId: number) {
    const url = environment.URL_SER_NODE + `Properties/property/disable`;
    const res = this.http.put(url, {
      propertyId: propertyId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Properties/property/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

