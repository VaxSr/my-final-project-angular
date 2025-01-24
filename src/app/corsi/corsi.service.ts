import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs/operators';
import { PartecipantiService } from '../partecipanti/partecipanti.service';

@Injectable({
  providedIn: 'root',
})
export class CorsiService {
  private corsiUrl = 'http://localhost:3000/corsi';
  private httpClient = inject(HttpClient);

  private partecipantiService = inject(PartecipantiService);

  getCorsi() {
    return this.httpClient.get<Corso[]>(this.corsiUrl);
  }
  getNumberCorsi(number: number) {
    return this.getCorsi().pipe(map((corsi) => corsi.slice(0, number)));
  }

  getCorsoById(id: string) {
    return this.httpClient.get<Corso>(`${this.corsiUrl}/${id}`);
  }

  addCorso(corso: Corso) {
    return this.httpClient.post<Corso>(this.corsiUrl, corso);
  }

  addPrenotazione(corso: Corso, partecipante: Partecipante) {
    this.partecipantiService.postPartecipante(partecipante, corso.id);
    return this.httpClient.patch<Corso>(`${this.corsiUrl}/${corso.id}`, {
      numeroPartecipanti: ++corso.numeroPartecipanti,
    });
  }
}
