import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';

import { Router } from '@angular/router';
import { RegistroErrors, RegistroUser, UsuariosService } from '../../services/usuarios-services';
declare var $:any;
@Component({
  selector: 'app-registro-screen',
  imports: [
    ...SHARED_IMPORTS
  ],
  templateUrl: './registro-screen.html',
  styleUrl: './registro-screen.scss',
})
export class RegistroScreen implements OnInit {

  /* =========================
     Estado
     ========================= */
  public user!: RegistroUser;
  public errors: RegistroErrors = {};
  public isLoading = false;
  public editar: boolean = false;
  /* Password */
  public hide_1 = true;
  public inputType_1: 'password' | 'text' = 'password';
  public hide_2 = true;
  public inputType_2: 'password' | 'text' = 'password'

  /* Edades */
  public edades: Array<{ value: number }> = [];
  public estados: string[] = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas'
];
public grado: string []= [
  'Preparatoria',
  'Licenciatura',
  'Maestría',
  'Doctorado'
];
  constructor(

    private readonly usuariosService: UsuariosService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.usuariosService.esquemaUser();

    // Llenar el array de edades
    this.llenarArrayEdades();
  }

  private llenarArrayEdades(): void {
    // Igual a su lógica original (18..80)
    this.edades = Array.from({ length: 63 }, (_, i) => ({ value: i + 18 }));
  }

  public terminosCondiciones(): void {
    // Aquí puede abrir modal / navegar / etc.
    alert('Aquí se mostrarán los Términos y Condiciones.');
  }

 public registrar(): void {
  if (this.isLoading) return;

  console.log('Registro de usuario:', this.user);

  this.errors = this.usuariosService.validarUsuario(
    this.user,
    this.editar
  );

  if (Object.keys(this.errors).length > 0) {
    console.log('Errores de validación:', this.errors);
    return;
  }else {
    alert('Usuario registrado correctamente');
  }

  this.isLoading = true;

}

  public goLogin(): void {
    this.router.navigate(['']); // ajuste según su app
  }

  public showPassword(): void {
    this.hide_1 = !this.hide_1;
    this.inputType_1 = this.hide_1 ? 'password' : 'text';
  }
    public showPasswordConfirm(): void {
    this.hide_2 = !this.hide_2;
    this.inputType_2 = this.hide_2 ? 'password' : 'text';
  }
}
