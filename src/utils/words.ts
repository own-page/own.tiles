/**
 * Built-in words of the tiles in the page language. The renderer passes the
 * page language as the `language` prop; missing or unknown languages stay
 * English. The creator's own text is never translated.
 */

const LANGUAGES = ['en', 'fr', 'de', 'es', 'it', 'pt', 'nl', 'bg'] as const;

export type TileLanguage = (typeof LANGUAGES)[number];

export const tileLanguage = (value: unknown): TileLanguage =>
  LANGUAGES.includes(value as TileLanguage) ? (value as TileLanguage) : 'en';

/** Intl locale per language, en-US keeps the English output unchanged */
const INTL_LOCALES: Record<TileLanguage, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  it: 'it-IT',
  pt: 'pt-BR',
  nl: 'nl-NL',
  bg: 'bg-BG'
};

export const tileLocale = (value: unknown) => INTL_LOCALES[tileLanguage(value)];

export type TileWords = {
  untitledEvent: string;
  locationNotSpecified: string;
  loadingEvent: string;
  eventDateTime: (date: string, time: string) => string;
  eventLocation: (location: string) => string;
  getTicketsForEvent: string;
  linkToTickets: string;
  tickets: string;
  clockIcon: string;
  githubError: (username: string) => string;
  myCalendar: string;
  embeddedContent: string;
  spotifyPlayer: (linkType: string) => string;
  appleMusicPlayer: string;
};

const WORDS: Record<TileLanguage, TileWords> = {
  en: {
    untitledEvent: 'Untitled Event',
    locationNotSpecified: 'Location not specified',
    loadingEvent: 'Loading event data...',
    eventDateTime: (date, time) => `Date and time: ${date} at ${time}`,
    eventLocation: (location) => `Location of the event: ${location}`,
    getTicketsForEvent: 'Get tickets for this event',
    linkToTickets: 'Link to tickets',
    tickets: 'Tickets',
    clockIcon: 'Clock icon',
    githubError: (username) =>
      `GitHub user "${username}" was not found or contributions could not be loaded. Check the username or try again later.`,
    myCalendar: 'My Calendar',
    embeddedContent: 'Embedded content',
    spotifyPlayer: (linkType) => `Spotify ${linkType} player`,
    appleMusicPlayer: 'Apple Music player'
  },
  fr: {
    untitledEvent: 'Événement sans titre',
    locationNotSpecified: 'Lieu non précisé',
    loadingEvent: 'Chargement de l’événement…',
    eventDateTime: (date, time) => `Date et heure : ${date} à ${time}`,
    eventLocation: (location) => `Lieu de l’événement : ${location}`,
    getTicketsForEvent: 'Réserver des billets pour cet événement',
    linkToTickets: 'Lien vers les billets',
    tickets: 'Billets',
    clockIcon: 'Icône d’horloge',
    githubError: (username) =>
      `Utilisateur GitHub « ${username} » introuvable ou contributions impossibles à charger. Vérifiez le nom d’utilisateur ou réessayez plus tard.`,
    myCalendar: 'Mon agenda',
    embeddedContent: 'Contenu intégré',
    spotifyPlayer: () => 'Lecteur Spotify',
    appleMusicPlayer: 'Lecteur Apple Music'
  },
  de: {
    untitledEvent: 'Unbenanntes Event',
    locationNotSpecified: 'Ort nicht angegeben',
    loadingEvent: 'Event wird geladen …',
    eventDateTime: (date, time) => `Datum und Uhrzeit: ${date} um ${time}`,
    eventLocation: (location) => `Ort des Events: ${location}`,
    getTicketsForEvent: 'Tickets für dieses Event',
    linkToTickets: 'Link zu den Tickets',
    tickets: 'Tickets',
    clockIcon: 'Uhr-Symbol',
    githubError: (username) =>
      `GitHub-Nutzer „${username}“ wurde nicht gefunden oder die Beiträge konnten nicht geladen werden. Bitte Nutzernamen prüfen oder später erneut versuchen.`,
    myCalendar: 'Mein Kalender',
    embeddedContent: 'Eingebetteter Inhalt',
    spotifyPlayer: () => 'Spotify-Player',
    appleMusicPlayer: 'Apple Music-Player'
  },
  es: {
    untitledEvent: 'Evento sin título',
    locationNotSpecified: 'Ubicación no indicada',
    loadingEvent: 'Cargando el evento…',
    eventDateTime: (date, time) => `Fecha y hora: ${date} a las ${time}`,
    eventLocation: (location) => `Lugar del evento: ${location}`,
    getTicketsForEvent: 'Consigue entradas para este evento',
    linkToTickets: 'Enlace a las entradas',
    tickets: 'Entradas',
    clockIcon: 'Icono de reloj',
    githubError: (username) =>
      `No se encontró el usuario de GitHub «${username}» o no se pudieron cargar sus contribuciones. Revisa el nombre de usuario o inténtalo más tarde.`,
    myCalendar: 'Mi calendario',
    embeddedContent: 'Contenido insertado',
    spotifyPlayer: () => 'Reproductor de Spotify',
    appleMusicPlayer: 'Reproductor de Apple Music'
  },
  it: {
    untitledEvent: 'Evento senza titolo',
    locationNotSpecified: 'Luogo non indicato',
    loadingEvent: 'Caricamento evento…',
    eventDateTime: (date, time) => `Data e ora: ${date} alle ${time}`,
    eventLocation: (location) => `Luogo dell’evento: ${location}`,
    getTicketsForEvent: 'Biglietti per questo evento',
    linkToTickets: 'Link ai biglietti',
    tickets: 'Biglietti',
    clockIcon: 'Icona orologio',
    githubError: (username) =>
      `Utente GitHub "${username}" non trovato o contributi non caricabili. Controlla il nome utente o riprova più tardi.`,
    myCalendar: 'Il mio calendario',
    embeddedContent: 'Contenuto incorporato',
    spotifyPlayer: () => 'Player Spotify',
    appleMusicPlayer: 'Player Apple Music'
  },
  pt: {
    untitledEvent: 'Evento sem título',
    locationNotSpecified: 'Local não informado',
    loadingEvent: 'Carregando evento…',
    eventDateTime: (date, time) => `Data e hora: ${date} às ${time}`,
    eventLocation: (location) => `Local do evento: ${location}`,
    getTicketsForEvent: 'Garanta ingressos para este evento',
    linkToTickets: 'Link para os ingressos',
    tickets: 'Ingressos',
    clockIcon: 'Ícone de relógio',
    githubError: (username) =>
      `Usuário do GitHub "${username}" não encontrado ou não foi possível carregar as contribuições. Confira o nome de usuário ou tente de novo mais tarde.`,
    myCalendar: 'Minha agenda',
    embeddedContent: 'Conteúdo incorporado',
    spotifyPlayer: () => 'Player do Spotify',
    appleMusicPlayer: 'Player do Apple Music'
  },
  nl: {
    untitledEvent: 'Naamloos evenement',
    locationNotSpecified: 'Locatie niet opgegeven',
    loadingEvent: 'Evenement laden…',
    eventDateTime: (date, time) => `Datum en tijd: ${date} om ${time}`,
    eventLocation: (location) => `Locatie van het evenement: ${location}`,
    getTicketsForEvent: 'Tickets voor dit evenement',
    linkToTickets: 'Link naar tickets',
    tickets: 'Tickets',
    clockIcon: 'Klokpictogram',
    githubError: (username) =>
      `GitHub-gebruiker "${username}" is niet gevonden of de bijdragen konden niet worden geladen. Controleer de gebruikersnaam of probeer het later opnieuw.`,
    myCalendar: 'Mijn agenda',
    embeddedContent: 'Ingesloten inhoud',
    spotifyPlayer: () => 'Spotify-speler',
    appleMusicPlayer: 'Apple Music-speler'
  },
  bg: {
    untitledEvent: 'Събитие без заглавие',
    locationNotSpecified: 'Мястото не е посочено',
    loadingEvent: 'Зареждане на събитието…',
    eventDateTime: (date, time) => `Дата и час: ${date} в ${time}`,
    eventLocation: (location) => `Място на събитието: ${location}`,
    getTicketsForEvent: 'Билети за това събитие',
    linkToTickets: 'Връзка към билетите',
    tickets: 'Билети',
    clockIcon: 'Икона на часовник',
    githubError: (username) =>
      `Потребителят „${username}“ в GitHub не е намерен или приносите му не могат да се заредят. Проверете потребителското име или опитайте отново по-късно.`,
    myCalendar: 'Моят календар',
    embeddedContent: 'Вградено съдържание',
    spotifyPlayer: () => 'Плейър на Spotify',
    appleMusicPlayer: 'Плейър на Apple Music'
  }
};

export const tileWords = (value: unknown): TileWords =>
  WORDS[tileLanguage(value)];
