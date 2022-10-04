import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });
    const requestOptions = { headers: headers };
    return new Promise((resolve) => {
      this.http
        .get(`http://51.38.51.187:5050/api/v1/users`, requestOptions)
        .subscribe({
          next: (resp: any) => {
            resolve([true, resp.items]);
          },
          error: () => {
            resolve(false);
          },
          complete: () => {},
        });
    });
  }

  editUser(id: string, form: FormGroup) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });
    const requestOptions = { headers: headers };
    return new Promise((resolve) => {
      this.http
        .put(
          `http://51.38.51.187:5050/api/v1/users/${id}`,
          form.value,
          requestOptions          
        )
        .subscribe({
          next: (resp: any) => {
            console.log(resp);
            resolve(true);
          },
          error: () => {
            resolve(false);
          },
          complete: () => {},
        });
    });
  }

  deleteUser(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    });
    const requestOptions = { headers: headers };
    return new Promise((resolve) => {
      this.http
        .delete(`http://51.38.51.187:5050/api/v1/users/${id}`, requestOptions)
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
