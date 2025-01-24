import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CorsiService } from './corsi.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CorsoComponent } from './corso/corso.component';

@Component({
  selector: 'app-corsi',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CorsoComponent],
  templateUrl: './corsi.component.html',
  styleUrl: './corsi.component.css',
})
export class CorsiComponent implements OnInit {
  corsi = signal<Corso[]>([]);
  private corsiService = inject(CorsiService);

  ngOnInit() {
    this.corsiService.getCorsi().subscribe({
      next: (corsi) => {
        this.corsi.set(corsi);
      },
    });
  }
}
