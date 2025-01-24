import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PartecipantiService } from '../partecipanti/partecipanti.service';

@Injectable({
  providedIn: 'root',
})
export class CorsiService {
  private corsiUrl = 'http://localhost:3000/corsi';
  private httpClient = inject(HttpClient);

  private partecipantiService = inject(PartecipantiService);

  /**
   * Recupera tutti i corsi disponibili
   * @returns Observable<Corso[]>
   */
  getCorsi() {
    return this.httpClient.get<Corso[]>(this.corsiUrl);
  }

  /**
   * Recupera un numero specifico di corsi
   * @param number numero di corsi da recuperare
   * @returns Observable<Corso[]>
   */
  getNumberCorsi(number: number) {
    return this.getCorsi().pipe(map((corsi) => corsi.slice(0, number)));
  }

  /**
   * Recupera un corso specifico tramite il suo ID
   * @param id ID del corso da recuperare
   * @returns Observable<Corso>
   */
  getCorsoById(id: string) {
    return this.httpClient.get<Corso>(`${this.corsiUrl}/${id}`);
  }

  /**
   * Aggiunge un nuovo corso
   * @param corso Corso da aggiungere
   * @returns Observable<Corso>
   */
  addCorso(corso: Corso) {
    return this.httpClient.post<Corso>(this.corsiUrl, corso);
  }

  /**
   * Aggiunge una prenotazione a un corso
   * @param corso Corso a cui aggiungere la prenotazione
   * @param partecipante Partecipante da aggiungere al corso
   * @returns Observable<Corso>
   */
  addPrenotazione(corso: Corso, partecipante: Partecipante) {
    this.partecipantiService.postPartecipante(partecipante, corso.id);
    return this.httpClient.patch<Corso>(`${this.corsiUrl}/${corso.id}`, {
      numeroPartecipanti: ++corso.numeroPartecipanti,
    });
  }

  /**
   * Elimina un corso e tutti i suoi partecipanti
   * @param id ID del corso da eliminare
   * @returns Observable<any>
   */
  deleteCorso(id: string) {
    return this.httpClient.delete(`${this.corsiUrl}/${id}`).pipe(
      tap(() => {
        this.partecipantiService.deletePartecipanteByCorso(id);
      })
    );
  }
}
