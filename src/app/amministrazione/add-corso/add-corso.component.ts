import { Component, inject, input, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CorsiService } from '../../corsi/corsi.service';

@Component({
  selector: 'app-add-corso',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-corso.component.html',
  styleUrl: './add-corso.component.css',
})
export class AddCorsoComponent {
  // Input per controllare la visibilità del componente
  isOpen = input.required<boolean>();
  // Output per emettere l'evento di chiusura
  close = output();

  corsiService = inject(CorsiService);

  /**
   * Gestisce la chiusura del componente
   */
  onClose() {
    this.close.emit();
  }

  /**
   * Form per l'inserimento dei dati del corso
   */
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

  /**
   * Gestisce l'invio del form
   * Crea un nuovo corso e lo invia al server
   */
  onSubmit() {
    console.log(this.form.value);

    let corso: Corso = {
      id: Date.now().toString(),
      nome: this.form.value.nome!,
      descrizione: this.form.value.descrizione!,
      istruttore: this.form.value.istruttore!,
      durata: +this.form.value.durata!,
      capacitaMassima: +Number(this.form.value.capacitaMassima!),
      numeroPartecipanti: 0,
      image: 'https://picsum.photos/200/300',
    };
    this.corsiService.addCorso(corso).subscribe({
      next: () => {
        this.onClose();
      },
    });
  }
}
