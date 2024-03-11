import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  gameForm: FormGroup = new FormGroup({
    gameName: new FormControl('', Validators.required),
    lineOne: new FormControl('', Validators.required),
    lineTwo: new FormControl('', Validators.required),
    lineThree: new FormControl('', Validators.required),
    lineFour: new FormControl('', Validators.required),
    lineFive: new FormControl('', Validators.required)
  })


  submit(){

  }
}
