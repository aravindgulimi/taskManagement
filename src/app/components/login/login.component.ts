import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from '../../services/log-in.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  errorMsg :  string | null = null;

  loginService : LogInService = inject(LogInService);

  constructor(private fb: FormBuilder, private route: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  welcomePage(){
    this.route.navigate(['/home']);
  }

  onSubmit() {

    const formValue = this.loginForm.value;

    const email = formValue.email;
    const password = formValue.password;

    this.loginService.logIn(email, password).subscribe({
      next: (resp : any) => {
        console.log(resp);
        this.route.navigate(['/dashBoard'])
      },
      error : (err: any) => {
        alert(this.errorMsg = err)
      }
    })
  }

}
