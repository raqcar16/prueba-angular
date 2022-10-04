import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
          error: () => {
            resolve(false);
          },
          complete: () => {},
        });
    });
  }
}
