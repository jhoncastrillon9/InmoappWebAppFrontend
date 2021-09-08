import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = ''): any {

    if (!img) {
      return 'assets/media/users/default.jpg';
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    if (img.indexOf('http') >= 0) {
      return img;
    }
    return img;
  }

}
