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
  isOpen = input.required<string>();
  corsiService = inject(CorsiService);
  corso = signal<Corso | null>(null);

  /**
   * Recupera le informazioni del corso tramite l'ID
   */
  private fetchCorso(): void {
    this.corsiService.getCorsoById(this.idCorso()).subscribe({
      next: (corso) => {
        this.corso.set(corso);
      },
    });
  }

  /**
   * Aggiunge un nuovo partecipante al corso e aggiorna i dati
   * @param partecipante I dati del partecipante da aggiungere
   */
  addParticipante(partecipante: Partecipante) {
    this.corsiService.addPrenotazione(this.corso()!, partecipante).subscribe({
      next: () => {
        this.fetchCorso();
      },
    });
    this.form.reset();
  }

  /**
   * Inizializza il componente recuperando i dati del corso
   */
  ngOnInit(): void {
    this.fetchCorso();
  }

  /**
   * Aggiorna i dati del corso quando cambiano gli input
   */
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

  /**
   * Verifica se il campo nome è valido
   */
  get isNotNomeValid() {
    return this.form.controls.nome.touched && this.form.controls.nome.invalid;
  }

  /**
   * Verifica se il campo cognome è valido
   */
  get isNotCognomeValid() {
    return (
      this.form.controls.cognome.touched && this.form.controls.cognome.invalid
    );
  }

  /**
   * Verifica se il campo email è valido
   */
  get isNotEmailValid() {
    return this.form.controls.email.touched && this.form.controls.email.invalid;
  }

  /**
   * Verifica se l'intero form è valido
   */
  get isFormValid() {
    return this.form.valid;
  }

  /**
   * Gestisce l'invio del form aggiungendo un nuovo partecipante
   */
  onSubmit() {
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
