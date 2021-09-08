import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PropertyCategoryModel } from 'src/app/models/Properties/property-category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyCategoryService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Properties/propertyCategory/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(propertyCategory: PropertyCategoryModel): Observable<PropertyCategoryModel>{
    let params = new HttpParams();
    if (propertyCategory.propertyCategoryId != null) { params = params.append('propertyCategoryId', propertyCategory.propertyCategoryId.toString()); }
    if (propertyCategory.categoryName != null) { params = params.append('categoryName', propertyCategory.categoryName.toString()); }

    const url = environment.URL_SER_NODE + `Properties/propertyCategory`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(propertyCategory: PropertyCategoryModel): Observable<PropertyCategoryModel>{
    let params = new HttpParams();
    if (propertyCategory.propertyCategoryId != null) { params = params.append('propertyCategoryId', propertyCategory.propertyCategoryId.toString()); }
    if (propertyCategory.categoryName != null) { params = params.append('categoryName', propertyCategory.categoryName.toString()); }

    const url = environment.URL_SER_NODE + `Properties/propertyCategory/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(propertyCategory: PropertyCategoryModel) {
    const url = environment.URL_SER_NODE + `Properties/propertyCategory`;
    const res = this.http.post(url, {
      categoryName: propertyCategory.categoryName
     });
    return res;
  }

  update(propertyCategory: PropertyCategoryModel) {
    const url = environment.URL_SER_NODE + `Properties/propertyCategory`;
    const res = this.http.put(url, {
      propertyCategoryId: propertyCategory.propertyCategoryId,
      categoryName: propertyCategory.categoryName
    });
    return res;
  }

  enable(propertyCategoryId: number) {
    const url = environment.URL_SER_NODE + `Properties/propertyCategory/enable`;
    const res = this.http.put(url, {
      propertyCategoryId: propertyCategoryId
    });
    return res;
  }

  disable(propertyCategoryId: number) {
    const url = environment.URL_SER_NODE + `Properties/propertyCategory/disable`;
    const res = this.http.put(url, {
      propertyCategoryId: propertyCategoryId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Properties/propertyCategory/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

