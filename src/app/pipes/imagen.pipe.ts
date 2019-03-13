import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';

    // Si no tiene ninguna imagen cargada
    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    // Si el usuario es de google
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
         url += '/usuarios/' + img;
      break;

      case 'medico':
         url += '/medicos/' + img;
      break;

      case 'hospital':
         url += '/hospitales/' + img;
      break;

      default:
        console.log('tipos de imagenes que existen: usuarios, medicos y hospitales');
        url += '/usuarios/xxx';
      break;

    }

    return url;
  }

}
