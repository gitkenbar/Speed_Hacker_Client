import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { KatakanaService } from '../../../core/services/katakana.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: '../auth.shared.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  canvas!: HTMLCanvasElement
  context!: any

  fontSize = 16;
  columns!: number

  isError = false;

  constructor(
    private authService: AuthService,
    private router:Router,
    private katakana: KatakanaService){
  }

  ngOnInit(): void {
    // Initializes the canvas
    this.canvas = <HTMLCanvasElement>document.getElementById('codeRain');
    this.context = this.canvas.getContext('2d');
    // Sets the canvas size
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    // Starts the code rain effect
    this.makeItRain()
  }
  /* LOGIN */

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

  /* KATAKANA RAIN */

  makeItRain(){
    this.columns = this.canvas.width / this.fontSize;
    let rainDrops: number[] = []

    for( let x = 0; x < this.columns; x++ ) {
      rainDrops[x] = 1;
    }

    let draw = () => {
      this.context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.fillStyle = '#0F0';
      this.context.font = this.fontSize + 'px monospace';

      for(let i = 0; i < rainDrops.length; i++)
      {
        const text = this.katakana.getKatakana()
        this.context.fillText(text, i*this.fontSize, rainDrops[i]*this.fontSize);

        if(rainDrops[i]*this.fontSize > this.canvas.height && Math.random() > 0.975){
          rainDrops[i] = 0;
            }
        rainDrops[i]++;
      }
    };
    setInterval(draw, 30);
  }


}
