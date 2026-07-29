import { normalizeLanguage, type SupportedLanguage } from './locales';

export interface ApiCopy {
  rate: string;
  email: string;
  pass: string;
  send: string;
  general: string;
  subscribed: string;
  invalidPassType: string;
  invalidConfirm: string;
  confirmed: string;
  invalidUnsubscribe: string;
  unsubscribed: string;
}

const apiCopy: Partial<Record<SupportedLanguage, ApiCopy>> & Record<'de' | 'fr' | 'it' | 'en', ApiCopy> = {
  de: {
    rate: 'Zu viele Anfragen. Bitte versuche es später erneut.',
    email: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    pass: 'Bitte wähle mindestens einen Pass-Typ aus.',
    send: 'E-Mail konnte nicht gesendet werden. Bitte versuche es später.',
    general: 'Ein Fehler ist aufgetreten.',
    subscribed: 'Falls die Adresse noch nicht angemeldet war, haben wir eine Bestätigungs-E-Mail geschickt.',
    invalidPassType: 'Ungültiger Pass-Typ. Erlaubt: silver, gold.',
    invalidConfirm: 'Der Bestätigungslink ist ungültig oder wurde bereits verwendet.',
    confirmed: 'E-Mail bestätigt!',
    invalidUnsubscribe: 'Der Abmelde-Link ist ungültig.',
    unsubscribed: 'Erfolgreich abgemeldet.',
  },
  fr: {
    rate: 'Trop de demandes. Veuillez réessayer plus tard.',
    email: 'Veuillez saisir une adresse e-mail valide.',
    pass: 'Veuillez sélectionner au moins un type de pass.',
    send: 'Impossible d’envoyer l’e-mail. Veuillez réessayer plus tard.',
    general: 'Une erreur est survenue.',
    subscribed: 'Si l’adresse n’était pas encore inscrite, nous avons envoyé un e-mail de confirmation.',
    invalidPassType: 'Type de pass invalide. Valeurs autorisées : silver, gold.',
    invalidConfirm: 'Le lien de confirmation est invalide ou a déjà été utilisé.',
    confirmed: 'Adresse e-mail confirmée !',
    invalidUnsubscribe: 'Le lien de désabonnement est invalide.',
    unsubscribed: 'Désabonnement effectué.',
  },
  it: {
    rate: 'Troppe richieste. Riprova più tardi.',
    email: 'Inserisci un indirizzo e-mail valido.',
    pass: 'Seleziona almeno un tipo di pass.',
    send: 'Impossibile inviare l’e-mail. Riprova più tardi.',
    general: 'Si è verificato un errore.',
    subscribed: 'Se l’indirizzo non era ancora registrato, abbiamo inviato un’e-mail di conferma.',
    invalidPassType: 'Tipo di pass non valido. Valori consentiti: silver, gold.',
    invalidConfirm: 'Il link di conferma non è valido o è già stato utilizzato.',
    confirmed: 'Indirizzo e-mail confermato!',
    invalidUnsubscribe: 'Il link di disiscrizione non è valido.',
    unsubscribed: 'Disiscrizione completata.',
  },
  en: {
    rate: 'Too many requests. Please try again later.',
    email: 'Please enter a valid email address.',
    pass: 'Please select at least one pass type.',
    send: 'The email could not be sent. Please try again later.',
    general: 'Something went wrong.',
    subscribed: 'If the address was not already subscribed, we sent a confirmation email.',
    invalidPassType: 'Invalid pass type. Allowed values: silver, gold.',
    invalidConfirm: 'The confirmation link is invalid or has already been used.',
    confirmed: 'Email confirmed!',
    invalidUnsubscribe: 'The unsubscribe link is invalid.',
    unsubscribed: 'Successfully unsubscribed.',
  },
};

export function getApiCopy(value: unknown): ApiCopy {
  return apiCopy[normalizeLanguage(value)] || apiCopy.en;
}

export interface CommunityCopy {
  token: string;
  name: string;
  title: string;
  body: string;
  limit: string;
  success: string;
  general: string;
}

const communityCopy: Partial<Record<SupportedLanguage, CommunityCopy>> &
  Record<'de' | 'fr' | 'it' | 'en', CommunityCopy> = {
    de: {
      token: 'Ungültiger oder abgelaufener Community-Link.',
      name: 'Bitte gib einen Namen mit höchstens 50 Zeichen ein.',
      title: 'Bitte gib einen Titel mit 3 bis 100 Zeichen ein.',
      body: 'Bitte gib einen Beitrag mit 10 bis 2.000 Zeichen ein.',
      limit: 'Du hast heute schon 3 Beiträge eingereicht. Probier es morgen noch einmal.',
      success: 'Danke für deinen Tipp! Er wird geprüft und erscheint bald auf der Seite.',
      general: 'Ein Fehler ist aufgetreten.',
    },
    fr: {
      token: 'Le lien communautaire est invalide ou expiré.',
      name: 'Veuillez saisir un nom de 50 caractères maximum.',
      title: 'Veuillez saisir un titre de 3 à 100 caractères.',
      body: 'Veuillez saisir un texte de 10 à 2 000 caractères.',
      limit: 'Vous avez déjà envoyé 3 contributions aujourd’hui. Réessayez demain.',
      success: 'Merci pour votre conseil ! Il sera vérifié avant sa publication.',
      general: 'Une erreur est survenue.',
    },
    it: {
      token: 'Il link della community non è valido o è scaduto.',
      name: 'Inserisci un nome di massimo 50 caratteri.',
      title: 'Inserisci un titolo da 3 a 100 caratteri.',
      body: 'Inserisci un testo da 10 a 2.000 caratteri.',
      limit: 'Hai già inviato 3 contributi oggi. Riprova domani.',
      success: 'Grazie per il consiglio! Verrà verificato prima della pubblicazione.',
      general: 'Si è verificato un errore.',
    },
    en: {
      token: 'The community link is invalid or expired.',
      name: 'Please enter a name with no more than 50 characters.',
      title: 'Please enter a title between 3 and 100 characters.',
      body: 'Please enter a post between 10 and 2,000 characters.',
      limit: 'You have already submitted 3 posts today. Please try again tomorrow.',
      success: 'Thanks for your tip! It will be reviewed before publication.',
      general: 'Something went wrong.',
    },
  };

export function getCommunityCopy(value: unknown): CommunityCopy {
  return communityCopy[normalizeLanguage(value)] || communityCopy.en;
}
