import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: any, ...args: unknown[]) {

    console.log(imagen)
    if (imagen) {
      return imagen;
    }else if (!imagen) {
      return 'https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png';
    } else {
      return '../../assets/noImage.jpg';
    }
  }

}
