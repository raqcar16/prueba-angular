import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm = this.creadorForm.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(
    private router: Router,
    private creadorForm: FormBuilder,
    private regSer: RegisterService
  ) {}

  ngOnInit(): void {}

  async register() {
    const result = await this.regSer.signUp(this.registerForm);
    if (result) {
      window.alert('Registro completado');
      this.goToLogin();
    } else {
      window.alert('Error al registrar');
    }
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
