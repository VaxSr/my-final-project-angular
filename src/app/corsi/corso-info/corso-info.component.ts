import { Component, inject, input, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CorsiService } from '../corsi.service';

@Component({
  selector: 'app-corso-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './corso-info.component.html',
  styleUrl: './corso-info.component.css',
})
export class CorsoInfoComponent {
  idCorso = input.required<string>();
  corsiService = inject(CorsiService);
  corso = signal<Corso | null>(null);

  private fetchCorso(): void {
    this.corsiService.getCorsoById(this.idCorso()).subscribe({
      next: (corso) => {
        this.corso.set(corso);
      },
    });
  }

  addParticipante(partecipante: Partecipante) {
    this.corsiService.addPrenotazione(this.corso()!, partecipante).subscribe({
      next: () => {
        this.fetchCorso();
      },
    });
    this.form.reset();
  }

  ngOnInit(): void {
    this.fetchCorso();
  }

  ngOnChanges(): void {
    this.fetchCorso();
  }

  // form component
  form = new FormGroup({
    nome: new FormControl('', {
      validators: [Validators.required],
    }),
    cognome: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });

  get isNotNomeValid() {
    return this.form.controls.nome.touched && this.form.controls.nome.invalid;
  }
  get isNotCognomeValid() {
    return (
      this.form.controls.cognome.touched && this.form.controls.cognome.invalid
    );
  }
  get isNotEmailValid() {
    return this.form.controls.email.touched && this.form.controls.email.invalid;
  }
  get isFormValid() {
    return this.form.valid;
  }

  onSubmit() {
    console.log(this.form);
    const nome = this.form.value.nome;
    const cognome = this.form.value.cognome;
    const email = this.form.value.email;

    this.addParticipante({
      nome,
      cognome,
      email,
    } as Partecipante);
  }
}
