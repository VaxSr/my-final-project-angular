import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartecipantiService {
  private url = 'http://localhost:3000/partecipanti';
  private httpClient = inject(HttpClient);

  /**
   * Recupera i partecipanti filtrati per idCorso
   * @param idCorso - ID del corso per filtrare i partecipanti
   * @returns Observable di array di Partecipante filtrato e invertito
   */
  getPartecipanti(idCorso: string) {
    return this.httpClient
      .get<Partecipante[]>(`${this.url}`)
      .pipe(
        map((partecipanti) =>
          partecipanti
            .filter((partecipante) => partecipante.idCorso === idCorso)
            .reverse()
        )
      );
  }

  /**
   * Aggiunge un nuovo partecipante al corso
   * @param partecipante - Oggetto partecipante da aggiungere
   * @param idCorso - ID del corso a cui aggiungere il partecipante
   */
  postPartecipante(partecipante: Partecipante, idCorso: string) {
    return this.httpClient
      .post<Partecipante>(this.url, {
        ...partecipante,
        id: new Date().getTime().toString(),
        idCorso: idCorso,
      })
      .subscribe({
        next: () => {
          console.log('partecipante aggiunto');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * Elimina tutti i partecipanti associati a un corso
   * @param idCorso - ID del corso per cui eliminare i partecipanti
   */
  deletePartecipanteByCorso(idCorso: string) {
    this.httpClient.get<Partecipante[]>(this.url).subscribe({
      next: (partecipanti) => {
        partecipanti
          .filter((partecipante) => partecipante.idCorso === idCorso)
          .forEach((partecipante) => {
            this.httpClient.delete(`${this.url}/${partecipante.id}`).subscribe({
              next: () => {
                console.log('partecipante eliminato');
              },
              error: (error) => {
                console.log(error);
              },
            });
          });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
