import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
    ) {}

  canActivate(): Promise<boolean> | boolean {
    const token = this._usuarioService.token;
    const payload = JSON.parse( atob( token.split('.')[1]) );
    const expirado = this.expirado( payload.exp );
    if ( expirado ) {
      return false;
    }
    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {
    return new Promise( (res, rej) => {
      const tokenExp = new Date( fechaExp * 1000 );
      const ahora = new Date();
      ahora.setTime( ahora.getTime() + ( 1 * 3600 * 1000 ));
      if ( tokenExp.getTime() > ahora.getTime() ) {
        res( true );
      } else {
        this._usuarioService.renuevaToken()
                .subscribe( () => {
                  res(true);
                }, () => {
                  this.router.navigate(['/login']);
                  rej(false);
                });
      }
    });
  }

  expirado( fechaExp: number ) {
    const ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      this.router.navigate(['/login']);
      return true;
    } else {
      return false;
    }
  }
}
