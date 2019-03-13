import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';



declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '981137061041-d3n6htobes9g5vbj8hfe13l4indc5a33.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

  // tslint:disable-next-line:no-shadowed-variable
  attachSignin ( element: HTMLElement ) {
    this.auth2.attachClickHandler (element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle( token )
          .subscribe( () => window.location.href = '#/dashboard');
      console.log(token);
    });
  }

  ingresar( forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario( null, forma.value.email, forma.value.password );
    this._usuarioService.login( usuario, forma.value.recuerdame )
            .subscribe( () => this.router.navigate(['/dashboard']));
    console.log(forma.valid);
    console.log(forma.value);
    // console.log('ingresando');
    // this.router.navigate(['/dashboard']);
  }
}
