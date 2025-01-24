import { Component, inject, input, OnInit, signal } from '@angular/core';
import { PartecipantiService } from './partecipanti.service';

@Component({
  selector: 'app-partecipanti',
  standalone: true,
  imports: [],
  templateUrl: './partecipanti.component.html',
  styleUrl: './partecipanti.component.css',
})
export class PartecipantiComponent implements OnInit {
  idCorso = input.required<string>();
  partecipanti = signal<Partecipante[] | null>(null);

  private partecipantiService = inject(PartecipantiService);

  private fetchPartecipanti(): void {
    this.partecipantiService.getPartecipanti(this.idCorso()).subscribe({
      next: (partecipanti) => {
        this.partecipanti.set(partecipanti);
      },
    });
  }

  ngOnInit(): void {
    this.fetchPartecipanti();
  }
  ngOnChanges(): void {
    this.fetchPartecipanti();
  }
}
