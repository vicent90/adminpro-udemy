import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {
    return new Promise ((res, rej) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
          if ( xhr.status === 200 ) {
            res( JSON.parse(xhr.response) );
          } else {
            console.log('Fallo la subida');
            rej( xhr.response );
          }
        }
      };

      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      console.log(url);
      xhr.open('PUT', url, true);
      xhr.send( formData );
    });
  }
}
