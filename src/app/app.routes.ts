import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { CorsiComponent } from './corsi/corsi.component';
import { AmministrazioneComponent } from './amministrazione/amministrazione.component';

import { PartecipantiComponent } from './partecipanti/partecipanti.component';
import { CorsoInfoComponent } from './corsi/corso-info/corso-info.component';

export const routes: Routes = [
  {
    path: 'chi-siamo',
    component: ChiSiamoComponent,
  },
  {
    path: 'corsi',
    component: CorsiComponent,
    children: [{ path: ':idCorso', component: CorsoInfoComponent }],
  },
  {
    path: 'amministrazione',
    component: AmministrazioneComponent,
    children: [{ path: ':idCorso', component: PartecipantiComponent }],
  },
  {
    path: '',
    component: HomeComponent,
    children: [{ path: ':idCorso', component: CorsoInfoComponent }],
  },
];
