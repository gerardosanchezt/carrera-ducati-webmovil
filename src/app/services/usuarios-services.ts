import { Injectable } from '@angular/core';
import { Validator } from './tools/validator';
import { Errors } from './tools/errors';

export interface RegistroUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmar_password?: string;
  rfc: string;
  grado: string;
  curp: string;
  direccion: string;
  telefono: string;
  estado: string;
  edad: number | null;
  terminos_condiciones: boolean;
}

export interface PerfilUsuarioUI {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  rfc: string;
  telefono: string;
  estado: string;
  grado: string;
  direccion: string;
  edad: number | null;

  // extras para UI
  codigo?: string;
  fecha_registro?: string; // ISO
  photoUrl?: string;
  rolEtiqueta?: string; // ej. "DOCENTE BUAP"
}

export type RegistroErrors = Partial<Record<keyof RegistroUser, string>>;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(
    private readonly Validator: Validator,
    private readonly Errors: Errors
  ) {

  }
  /* =========================================================
     1) ESQUEMA (modelo base)
     ========================================================= */
  public esquemaUser(): RegistroUser {
    return {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      rfc: '',
      curp: '',
      grado: '',
      direccion: '',
      telefono: '',
      estado: '',
      edad: null,
      terminos_condiciones: false
    };
  }

  public validarUsuario(data: any, editar: boolean) {

    console.log("Validando usuario... ", data);
    let error: any = [];

    if (!this.Validator.required(data["id"])) {
      error["id"] = this.Errors.required;
    }else if(!this.Validator.max(data["id"], 8)){
        error["id"] = this.Errors.max(8);
    }else if(!this.Validator.min(data["id"], 8)){
        error["id"] = this.Errors.min(8);
    }else if(!this.Validator.alphanumeric(data["id"])){
      error["id"] = "El ID solo puede contener letras y números";
    }

    if (!this.Validator.required(data["first_name"])) {
      error["first_name"] = this.Errors.required;
    }

    if (!this.Validator.required(data["last_name"])) {
      error["last_name"] = this.Errors.required;
    }

    if (!this.Validator.required(data["email"])) {
      error["email"] = this.Errors.required;
    } else if (!this.Validator.max(data["email"], 40)) {
      error["email"] = this.Errors.max(40);
    } else if (!this.Validator.email(data['email'])) {
      error['email'] = this.Errors.email;
    }

    if (!editar) {
      if (!this.Validator.required(data["password"])) {
        error["password"] = this.Errors.required;
      }

      if (!this.Validator.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.Errors.required;
      }
      else if (data["password"] !== data["confirmar_password"]) {
        error["confirmar_password"] = "Las contraseñas no coinciden";
      }
    }

    if (!this.Validator.required(data["curp"])) {
      error["curp"] = this.Errors.required;
    } else if (!this.Validator.min(data["curp"], 18)) {
      error["curp"] = this.Errors.min(18);
      alert("La longitud de caracteres de la CURP es menor, deben ser 18");
    } else if (!this.Validator.max(data["curp"], 18)) {
      error["curp"] = this.Errors.max(18);
      alert("La longitud de caracteres de la CURP es mayor, deben ser 18");
    }

    if (!this.Validator.required(data["rfc"])) {
      error["rfc"] = this.Errors.required;
    } else if (!this.Validator.min(data["rfc"], 12)) {
      error["rfc"] = this.Errors.min(12);
      alert("La longitud de caracteres deL RFC es menor, deben ser 12");
    } else if (!this.Validator.max(data["rfc"], 13)) {
      error["rfc"] = this.Errors.max(13);
      alert("La longitud de caracteres deL RFC es mayor, deben ser 13");
    }

    if (!this.Validator.required(data["edad"])) {
      error["edad"] = this.Errors.required;
    } else if (!this.Validator.numeric(data["edad"])) {
      alert("El formato es solo números");
    }

    if (!this.Validator.required(data["telefono"])) {
      error["telefono"] = this.Errors.required;
    }

    if (!this.Validator.required(data["direccion"])) {
      error["direccion"] = this.Errors.required;
    }
    if (!this.Validator.required(data["estado"])) {
      error["estado"] = this.Errors.required;
    }
    if (!this.Validator.required(data["grado"])) {
      error["grado"] = this.Errors.required;
    }
    if (!this.Validator.required(data["terminos_condiciones"])) {
      error["terminos_condiciones"] = "Debe aceptar los términos y condiciones";
    }
    //Return arreglo
    return error;
  }

  // public validarUsuario(user: RegistroUser): RegistroErrors {

  // }

}
