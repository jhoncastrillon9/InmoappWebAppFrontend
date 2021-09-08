import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TypeOfferModel } from 'src/app/models/Properties/type-offer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeOfferService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Properties/typeOffer/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(typeOffer: TypeOfferModel): Observable<TypeOfferModel>{
    let params = new HttpParams();
    if (typeOffer.typeOfferId != null) { params = params.append('typeOfferId', typeOffer.typeOfferId.toString()); }
    if (typeOffer.typeOfferName != null) { params = params.append('typeOfferName', typeOffer.typeOfferName.toString()); }

    const url = environment.URL_SER_NODE + `Properties/typeOffer`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(typeOffer: TypeOfferModel): Observable<TypeOfferModel>{
    let params = new HttpParams();
    if (typeOffer.typeOfferId != null) { params = params.append('typeOfferId', typeOffer.typeOfferId.toString()); }
    if (typeOffer.typeOfferName != null) { params = params.append('typeOfferName', typeOffer.typeOfferName.toString()); }

    const url = environment.URL_SER_NODE + `Properties/typeOffer/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(typeOffer: TypeOfferModel) {
    const url = environment.URL_SER_NODE + `Properties/typeOffer`;
    const res = this.http.post(url, {
      typeOfferName: typeOffer.typeOfferName
     });
    return res;
  }

  update(typeOffer: TypeOfferModel) {
    const url = environment.URL_SER_NODE + `Properties/typeOffer`;
    const res = this.http.put(url, {
      typeOfferId: typeOffer.typeOfferId,
      typeOfferName: typeOffer.typeOfferName
    });
    return res;
  }

  enable(typeOfferId: number) {
    const url = environment.URL_SER_NODE + `Properties/typeOffer/enable`;
    const res = this.http.put(url, {
      typeOfferId: typeOfferId
    });
    return res;
  }

  disable(typeOfferId: number) {
    const url = environment.URL_SER_NODE + `Properties/typeOffer/disable`;
    const res = this.http.put(url, {
      typeOfferId: typeOfferId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Properties/typeOffer/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

