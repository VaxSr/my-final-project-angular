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
  isOpen = input.required<boolean>();
  close = output();

  corsiService = inject(CorsiService);

  onClose() {
    this.close.emit();
  }

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
