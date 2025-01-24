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

  toggleDialog() {
    console.log('ciao');
    this.isOpenDialog.set(!this.isOpenDialog());
  }

  ngOnInit(): void {
    this.corsiService.getCorsi().subscribe({
      next: (corsi) => {
        this.corsi.set(corsi);
      },
    });
  }
}
