import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm = this.creadorForm.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private creadorForm: FormBuilder,
    private logSer: LoginService
  ) {}

  ngOnInit(): void {}

  async login() {
    const result = await this.logSer.signIn(this.loginForm);
    if (result) {
      this.router.navigate(['home']);
    } else {
      window.alert('User email not found or password invalid');
    }
    console.log(result);
  }

  goToRegister() {
    this.router.navigate(['registro']);
  }
}
