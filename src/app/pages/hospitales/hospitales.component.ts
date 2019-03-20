import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from '../../services/service.index';
import swal from 'sweetalert';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
      public _hospitalService: HospitalService,
      public _modalUploadService: ModalUploadService,

    ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarHospitales());
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id);
  }

  buscarHospital( termino: string) {
    if ( termino.length <= 0 ) {
      return;
    }
    this._hospitalService.buscarHospital( termino )
            .subscribe( (hospitales: Hospital[]) => {
              this.hospitales = hospitales;
              this.cargando = false;
            });

  }

  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales()
            .subscribe( (resp: any) => {
              this.hospitales = resp;
              this.totalRegistros = this.hospitales.length;
              this.cargando = false;
            });
  }

  borrarHospital( id: string ) {
    this._hospitalService.borrarHospital( id )
            .subscribe( () => this.cargarHospitales());
  }

  guardarHospital( hospital: Hospital, input: string) {
    hospital.nombre = input;
    this._hospitalService.actualizarHospital( hospital )
            .subscribe();
  }

  agregarHospital() {
    swal ({
      content: {
        attributes: {
          placeholder: 'Nombre del hospital a agregar'
        },
        element: 'input',
        buttons: {
          text: 'agregar',
          closeModal: false
        },
      }
    })
    .then( (nombre: string) => {
      if ( nombre ) {
        this._hospitalService.crearHospital( nombre )
                .subscribe( () => {
                  swal ('Hospital agregado', 'El hospital ' + nombre + ' fue agregado correctamente', 'success');
                  this.cargarHospitales();
                });
      }
    });
  }
}
