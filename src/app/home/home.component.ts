import { Component, inject, OnInit, signal } from '@angular/core';
import { CorsiService } from '../corsi/corsi.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CorsiComponent } from '../corsi/corsi.component';
import { CorsoComponent } from '../corsi/corso/corso.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CorsoComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  corsi = signal<Corso[]>([]);
  private corsiService = inject(CorsiService);

  ngOnInit(): void {
    this.corsiService.getNumberCorsi(4).subscribe({
      next: (corsi) => {
        this.corsi.set(corsi);
      },
    });
  }
}
