import { Component, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-corso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-corso.component.html',
  styleUrl: './add-corso.component.css',
})
export class AddCorsoComponent {
  isOpen = input.required<boolean>();
  toggleDialog = input.required<() => void>();

  form = new FormGroup({
    nome: new FormControl('', {
      validators: [Validators.required],
    }),
    descrizione: new FormControl('', {
      validators: [Validators.required],
    }),
    istruttore: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    durata: new FormControl('', {
      validators: [Validators.required],
    }),
    capacitaMassima: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    console.log(this.form.value);
  }
}
