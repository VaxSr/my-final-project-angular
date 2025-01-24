import { Component, inject, OnInit, signal } from '@angular/core';
import { CorsiService } from '../corsi/corsi.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddCorsoComponent } from './add-corso/add-corso.component';

@Component({
  selector: 'app-amministrazione',
  standalone: true,
  imports: [RouterLink, RouterOutlet, AddCorsoComponent],
  templateUrl: './amministrazione.component.html',
  styleUrl: './amministrazione.component.css',
})
export class AmministrazioneComponent implements OnInit {
  corsi = signal<Corso[] | null>(null);

  private corsiService = inject(CorsiService);

  isOpenDialog = signal<boolean>(false);

  toggleToast(message: string) {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.classList.add('show');
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');
      toast.innerText = message;
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  toggleDialog() {
    this.isOpenDialog.set(!this.isOpenDialog());
    if (!this.isOpenDialog()) {
      this.fetchCorsi();
    }
  }

  fetchCorsi() {
    this.corsiService.getCorsi().subscribe({
      next: (corsi) => {
        this.corsi.set(corsi);
      },
    });
  }
  deleteCorso(id: string) {
    this.corsiService.deleteCorso(id).subscribe({
      next: () => {
        this.toggleToast('Corso eliminato con successo');
        this.fetchCorsi();
      },
    });
  }
  ngOnInit(): void {
    this.fetchCorsi();
  }
}
