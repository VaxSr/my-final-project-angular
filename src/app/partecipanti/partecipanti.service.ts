import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartecipantiService {
  private url = 'http://localhost:3000/partecipanti';
  private httpClient = inject(HttpClient);

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
