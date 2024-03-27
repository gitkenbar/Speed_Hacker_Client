import { Component, Input } from '@angular/core';
import { Challenge } from '../../../../shared/models/challenge';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-instance',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './instance.component.html',
  styleUrl: './instance.component.scss'
})
export class InstanceComponent {
  @Input() challenge!: Challenge;
  @Input() form!: FormGroup;
}
