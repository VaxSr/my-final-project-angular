# Esame finale Angular

### Routes

- Home
- Chi siamo
- Nostri corsi
- Amministrazione

#### Spiegazione pagine

- Nella pagina Home viene visualizzata una hero e di 4 corsi che permette di accedere ai dettagli/prenotazione di ogni corso cliccando sul pulsante "Prenota Corso", se il corso ha raggiunto la capienza massima non è possibile prenotare il corso.

- Nella pagina corsi vengono visualizzati tutti i corsi presenti nel database, cliccando su Prenota corso avviene la stessa cosa presente nella home.
- Nella pagina Amministrazione vengono visualizzati tutti i corsi presenti nel database, sarà possibile vedere ogni partecipante del corso, aggiungere e rimuovere corsi. Alla rimozione di un corso, tutti i partecipanti saranno rimossi.

### Spiegazione componenti

- App component: gestisce la navigazione e il router-outlet principale che permette di visualizzare le varie pagine.
- corso: crea la card
- corso-info: permette di visualizzare i dettagli del corso e il form per prenotare il corso
- corsi: permette di visualizzare tutti i corsi presenti nel database
- partecipanti: permette di visualizzare tutti i partecipanti del corso
- add-corso: modale presente in amministrazione che permette di aggiungere un nuovo corso
