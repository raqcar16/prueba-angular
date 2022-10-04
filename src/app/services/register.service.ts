import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  guardaUsuario(form: FormGroup): boolean {
    let resultado: boolean = false;

    localStorage.setItem(
      'usuario',
      `${form.value.nombre} ${form.value.apellidos} `
    );

    localStorage.setItem('password', form.value.password);

    localStorage.setItem('email', form.value.email);
    resultado = true;

    return resultado;
  }

  signUp(form: FormGroup) {
    return new Promise((resolve) => {
      this.http
        .post(`http://51.38.51.187:5050/api/v1/auth/sign-up`, form.value)
        .subscribe({
          next: () => {
            resolve(true);
          },
          error: () => {
            resolve(false);
          },
          complete: () => {},
        });
    });
  }
}
