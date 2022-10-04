import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  email = 'usuario@gmail.com';
  password = '1234';
  constructor(private http: HttpClient) {}

  signIn(form: FormGroup) {
    return new Promise((resolve) => {
      this.http
        .post(`http://51.38.51.187:5050/api/v1/auth/log-in`, form.value)
        .subscribe({
          next: (resp: any) => {
            localStorage.setItem('accessToken', resp.accessToken);
            localStorage.setItem('refreshToken', resp.refreshToken);
            localStorage.setItem('tokenType', resp.tokenType);
            resolve(true);
          },
          error: (resp) => {
            console.log(resp);
            resolve(false);
          },
          complete: () => {},
        });
    });
  }
}
