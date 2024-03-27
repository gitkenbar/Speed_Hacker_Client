import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  isError = false;

  constructor(private authService: AuthService, private router:Router){}

  login(){
    if(this.loginForm.valid){
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authService.login(username, password).subscribe({
        next: (res:any) =>{
          this.authService.setToken(res.token)
          this.router.navigate(['/'])
        },
        error: (error:any) => {
          console.log("error when logging in", error)
          this.isError = true
        }
    })
    }
  }
}
