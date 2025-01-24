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
          partecipanti.filter(
            (partecipante) => partecipante.idCorso === idCorso
          )
        )
      );
  }

  postPartecipante(partecipante: Partecipante, idCorso: string) {
    console.log(partecipante);
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
}
