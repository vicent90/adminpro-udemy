import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;

  constructor( public http: HttpClient ) {
    this.cargarStorage();
   }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get( url ).
                  pipe(map ( (resp: any) => resp.hospitales));
  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;
    return this.http.get( url ).
                  pipe(map ( (resp: any) => resp.hospital));
  }

  borrarHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;
    return this.http.delete( url )
                .pipe(map ( resp => {
                  swal('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
                  return true;
                }));
  }

  crearHospital( nombre: string ) {
    const url = URL_SERVICIOS + '/hospital?token=' + this.token;
    return this.http.post( url, { nombre: nombre } )
                  .pipe(map ( resp => {
                    swal('Hospital creado', 'El hospital a sido creado correctamente', 'success');
                    return true;
                  }));
  }

  buscarHospital( termino: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
                  .pipe(map( (resp: any) => resp.hospitales));
  }

  actualizarHospital( hospital: Hospital ) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this.token;
    return this.http.put( url, hospital )
                  .pipe(map ( resp => {
                    swal('Hospital actualizado', 'El hospital a sido actualizado correctamente', 'success');
                    return true;
                  }));
  }
}
