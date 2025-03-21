import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../customComponents/customValidators.validator';
import { Router } from '@angular/router';
import { LogInService } from '../../services/log-in.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reg-mod',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './reg-mod.component.html',
  styleUrl: './reg-mod.component.css'
})
export class RegModComponent {

  registrationForm!: FormGroup;

  errorMsg : string | null = null;

  constructor(private fb: FormBuilder, private route : Router, private logInService: LogInService) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required, CustomValidators.noSpaceAllowed, CustomValidators.nameValidator]],
      surName: ['', [Validators.required, CustomValidators.noSpaceAllowed, CustomValidators.nameValidator]],
      gmail: ['', [Validators.required, CustomValidators.emailValidator]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      confirmPassword:['',[Validators.required, Validators.minLength(8)]],
      phoneNo: ['', [Validators.required,CustomValidators.phoneNumberValidator]],
      gender: ['', [Validators.required]],
    },
    {
      validators: (formGroup) => {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;
  
        return password === confirmPassword ? null : { passwordMismatch: true };
      }
    })

    this.registrationForm.get('gmail')?.statusChanges.subscribe((resp) =>{
      console.log(resp);
      
    })
  }

  onSubmitReg(){
    const formValue = this.registrationForm.value;

    const userData = {
      firstName : formValue.firstName,
      surName : formValue.surName,
      phoneNo : formValue.phoneNo,
      gender : formValue.gender,
      password : formValue.passWord,
      gmail : formValue.gmail
    };

    const email = formValue.gmail;
    const password = formValue.password;
    
    //calling API 
    this.logInService.signUp( email, password).subscribe({
      next : (resp: any)=> {console.log(resp);
        const token = resp.idToken;
        alert('Details saved Successfully.')
        this.route.navigate(['/dashBoard']) 


        // storing the User details
        this.logInService.regSignUp(userData, token).subscribe({
          next : (resp) => {console.log(resp);
          }
        })
      },
      error : (err: any) => {
        // this.errorMsg = err;
        alert(this.errorMsg = err)
      }
    });

  }

}
