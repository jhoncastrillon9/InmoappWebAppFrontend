import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImagesModel } from 'src/app/models/Properties/images.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Properties/images/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(images: ImagesModel): Observable<ImagesModel>{
    let params = new HttpParams();
    if (images.imageId != null) { params = params.append('imageId', images.imageId.toString()); }
    if (images.imageName != null) { params = params.append('imageName', images.imageName.toString()); }
    if (images.path != null) { params = params.append('path', images.path.toString()); }
    if (images.isMain != null) { params = params.append('isMain', images.isMain.toString()); }
    if (images.propertyId != null) { params = params.append('propertyId', images.propertyId.toString()); }

    const url = environment.URL_SER_NODE + `Properties/images`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(images: ImagesModel): Observable<ImagesModel>{
    let params = new HttpParams();
    if (images.imageId != null) { params = params.append('imageId', images.imageId.toString()); }
    if (images.imageName != null) { params = params.append('imageName', images.imageName.toString()); }
    if (images.path != null) { params = params.append('path', images.path.toString()); }
    if (images.isMain != null) { params = params.append('isMain', images.isMain.toString()); }
    if (images.propertyId != null) { params = params.append('propertyId', images.propertyId.toString()); }

    const url = environment.URL_SER_NODE + `Properties/images/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(images: ImagesModel) {
    const url = environment.URL_SER_NODE + `Properties/images`;
    const res = this.http.post(url, {
      imageName: images.imageName,
      path: images.path,
      isMain: images.isMain,
      propertyId: images.propertyId
     });
    return res;
  }

  update(images: ImagesModel) {
    const url = environment.URL_SER_NODE + `Properties/images`;
    const res = this.http.put(url, {
      imageId: images.imageId,
      imageName: images.imageName,
      path: images.path,
      isMain: images.isMain,
      propertyId: images.propertyId
    });
    return res;
  }

  enable(imageId: number) {
    const url = environment.URL_SER_NODE + `Properties/images/enable`;
    const res = this.http.put(url, {
      imageId: imageId
    });
    return res;
  }

  disable(imageId: number) {
    const url = environment.URL_SER_NODE + `Properties/images/disable`;
    const res = this.http.put(url, {
      imageId: imageId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Properties/images/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

