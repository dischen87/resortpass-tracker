import nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';
import {
  defaultLanguage,
  fallbackLanguage,
  isRtlLanguage,
  normalizeLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from './locales';

const SITE_URL = process.env.SITE_URL || 'https://www.resortpass-europapark.ch';
const ASSET_URL = SITE_URL.replace(/\/+$/, '');
const SMTP_HOST = process.env.SMTP_HOST || 'localhost';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '25');
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@resortpass-europapark.ch';
const FROM_NAME = process.env.FROM_NAME || 'ResortPass Tracker';
const localizedUiLanguages = new Set<SupportedLanguage>(supportedLanguages);

const transportConfig: any = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  /*
   * Pooled connections. Without this every alert opened its own SMTP session:
   * connect, TLS handshake, auth, one message, close — repeated once per
   * subscriber. With ~885 confirmed subscribers that handshake cost dominated
   * the run on the one occasion the project exists for.
   *
   * Three connections stays well inside Brevo's relay limits while cutting the
   * per-message overhead to almost nothing.
   */
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
};

if (SMTP_USER && SMTP_PASS) {
  transportConfig.auth = {
    user: SMTP_USER,
    pass: SMTP_PASS,
  };
}

const transporter = nodemailer.createTransport(transportConfig);

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

interface EmailCopy {
  footer: string;
  confirm: {
    title: string;
    subject: string;
    greeting: string;
    message: string;
    button: string;
    ignore: string;
    community: string;
    communityButton: string;
    text: (url: string, communityUrl?: string) => string;
  };
  alert: {
    title: string;
    subject: (pass: string) => string;
    greeting: string;
    headline: (pass: string) => string;
    urgency: string;
    button: string;
    closing: string;
    reason: string;
    unsubscribe: string;
    community: string;
    communityButton: string;
    text: (pass: string, shopUrl: string, unsubscribeUrl: string, communityUrl?: string) => string;
  };
  unsubscribe: {
    title: string;
    subject: string;
    heading: string;
    message: string;
    resubscribe: string;
    text: (siteUrl: string) => string;
  };
}

type GeneratedEmailCopy = Omit<EmailCopy, 'confirm' | 'alert' | 'unsubscribe'> & {
  confirm: Omit<EmailCopy['confirm'], 'text'>;
  alert: Omit<EmailCopy['alert'], 'text'>;
  unsubscribe: Omit<EmailCopy['unsubscribe'], 'text'>;
};

function defineEmailCopy(copy: GeneratedEmailCopy): EmailCopy {
  return {
    ...copy,
    confirm: {
      ...copy.confirm,
      text: (url, communityUrl) =>
        `${copy.confirm.greeting}\n\n${copy.confirm.message}\n${url}\n\n${copy.confirm.ignore}${communityUrl ? `\n\n${copy.confirm.community}\n${communityUrl}` : ''}`,
    },
    alert: {
      ...copy.alert,
      text: (pass, shopUrl, unsubscribeUrl, communityUrl) =>
        `${copy.alert.greeting}\n\n${copy.alert.headline(pass)}\n\n${copy.alert.urgency}\n${shopUrl}\n\n${copy.alert.closing}${communityUrl ? `\n\n${copy.alert.community}\n${communityUrl}` : ''}\n\n---\n${copy.alert.unsubscribe}: ${unsubscribeUrl}`,
    },
    unsubscribe: {
      ...copy.unsubscribe,
      text: (siteUrl) =>
        `${copy.unsubscribe.heading}\n\n${copy.unsubscribe.message}\n\n${copy.unsubscribe.resubscribe} ${siteUrl}`,
    },
  };
}

const emailCopy: Record<SupportedLanguage, EmailCopy> = {
  de: {
    footer: 'ResortPass Tracker — inoffizielles Community-Projekt',
    confirm: {
      title: 'E-Mail bestätigen',
      subject: 'Bitte bestätige deine E-Mail — ResortPass Tracker',
      greeting: 'Hallo!',
      message: 'Bitte bestätige deine Anmeldung, damit wir dich benachrichtigen können, sobald der Europa-Park ResortPass wieder verfügbar ist.',
      button: 'E-Mail bestätigen',
      ignore: 'Wenn du dich nicht angemeldet hast, ignoriere diese E-Mail einfach.',
      community: 'Nach der Bestätigung kannst du deinen Tipp mit der Community teilen.',
      communityButton: 'Community-Tipp teilen',
      text: (url, communityUrl) => `Hallo!\n\nBitte bestätige deine Anmeldung beim ResortPass Tracker:\n${url}\n\nWenn du dich nicht angemeldet hast, ignoriere diese E-Mail einfach.${communityUrl ? `\n\nNach der Bestätigung kannst du deinen Tipp mit der Community teilen:\n${communityUrl}` : ''}`,
    },
    alert: {
      title: 'ResortPass verfügbar!',
      subject: (pass) => `ResortPass ${pass} ist jetzt verfügbar!`,
      greeting: 'Hallo!',
      headline: (pass) => `Der Europa-Park ResortPass ${pass} ist gerade wieder im Ticketshop verfügbar!`,
      urgency: 'Erfahrungsgemäss sind die Kontingente schnell vergriffen, also am besten sofort zuschlagen:',
      button: 'Jetzt kaufen →',
      closing: 'Viel Spass im Europa-Park!',
      reason: 'Du erhältst diese E-Mail, weil du dich auf resortpass-europapark.ch angemeldet hast.',
      unsubscribe: 'Abmelden',
      community: 'Du hast einen Tipp? Teile ihn mit der Community.',
      communityButton: 'Community-Tipp teilen',
      text: (pass, shopUrl, unsubscribeUrl, communityUrl) => `Hallo!\n\nGute Nachrichten — der Europa-Park ResortPass ${pass} ist gerade wieder im Ticketshop verfügbar!\n\nErfahrungsgemäss sind die Kontingente schnell vergriffen, also am besten sofort zuschlagen:\n${shopUrl}\n\nViel Spass im Europa-Park!${communityUrl ? `\n\nDu hast einen Tipp? Teile ihn mit der Community:\n${communityUrl}` : ''}\n\n---\nAbmelden: ${unsubscribeUrl}`,
    },
    unsubscribe: {
      title: 'Abmeldung bestätigt',
      subject: 'Abmeldung bestätigt — ResortPass Tracker',
      heading: 'Du wurdest erfolgreich abgemeldet.',
      message: 'Deine Daten wurden vollständig gelöscht. Du erhältst keine weiteren E-Mails von uns.',
      resubscribe: 'Falls du dich wieder anmelden möchtest:',
      text: (siteUrl) => `Du wurdest erfolgreich vom ResortPass Tracker abgemeldet.\n\nDeine Daten wurden gelöscht. Du erhältst keine weiteren E-Mails.\n\nFalls du dich wieder anmelden möchtest: ${siteUrl}`,
    },
  },
  fr: {
    footer: 'ResortPass Tracker — projet communautaire non officiel',
    confirm: {
      title: 'Confirmer votre adresse e-mail',
      subject: 'Veuillez confirmer votre adresse e-mail — ResortPass Tracker',
      greeting: 'Bonjour !',
      message: 'Veuillez confirmer votre inscription afin que nous puissions vous avertir dès que le ResortPass Europa-Park sera à nouveau disponible.',
      button: 'Confirmer mon adresse e-mail',
      ignore: 'Si vous ne vous êtes pas inscrit, vous pouvez simplement ignorer cet e-mail.',
      community: 'Après la confirmation, vous pourrez partager votre astuce avec la communauté.',
      communityButton: 'Partager une astuce',
      text: (url, communityUrl) => `Bonjour !\n\nVeuillez confirmer votre inscription au ResortPass Tracker :\n${url}\n\nSi vous ne vous êtes pas inscrit, vous pouvez simplement ignorer cet e-mail.${communityUrl ? `\n\nAprès la confirmation, vous pourrez partager votre astuce avec la communauté :\n${communityUrl}` : ''}`,
    },
    alert: {
      title: 'ResortPass disponible !',
      subject: (pass) => `Le ResortPass ${pass} est disponible maintenant !`,
      greeting: 'Bonjour !',
      headline: (pass) => `Bonne nouvelle : le ResortPass Europa-Park ${pass} est à nouveau disponible dans la billetterie !`,
      urgency: 'Les contingents sont souvent épuisés rapidement. Mieux vaut donc ne pas attendre :',
      button: 'Acheter maintenant →',
      closing: 'Bon séjour à Europa-Park !',
      reason: 'Vous recevez cet e-mail parce que vous vous êtes inscrit sur resortpass-europapark.ch.',
      unsubscribe: 'Se désabonner',
      community: 'Vous avez une astuce ? Partagez-la avec la communauté.',
      communityButton: 'Partager une astuce',
      text: (pass, shopUrl, unsubscribeUrl, communityUrl) => `Bonjour !\n\nBonne nouvelle : le ResortPass Europa-Park ${pass} est à nouveau disponible dans la billetterie !\n\nLes contingents sont souvent épuisés rapidement. Mieux vaut donc ne pas attendre :\n${shopUrl}\n\nBon séjour à Europa-Park !${communityUrl ? `\n\nVous avez une astuce ? Partagez-la avec la communauté :\n${communityUrl}` : ''}\n\n---\nSe désabonner : ${unsubscribeUrl}`,
    },
    unsubscribe: {
      title: 'Désabonnement confirmé',
      subject: 'Désabonnement confirmé — ResortPass Tracker',
      heading: 'Votre désabonnement a bien été pris en compte.',
      message: 'Vos données ont été entièrement supprimées. Vous ne recevrez plus d’e-mails de notre part.',
      resubscribe: 'Si vous souhaitez vous réinscrire :',
      text: (siteUrl) => `Votre désabonnement au ResortPass Tracker a bien été pris en compte.\n\nVos données ont été supprimées. Vous ne recevrez plus d’e-mails.\n\nSi vous souhaitez vous réinscrire : ${siteUrl}`,
    },
  },
  it: {
    footer: 'ResortPass Tracker — progetto della community non ufficiale',
    confirm: {
      title: 'Conferma il tuo indirizzo e-mail',
      subject: 'Conferma il tuo indirizzo e-mail — ResortPass Tracker',
      greeting: 'Ciao!',
      message: 'Conferma la tua iscrizione per ricevere una notifica non appena il ResortPass Europa-Park sarà di nuovo disponibile.',
      button: 'Conferma il mio indirizzo e-mail',
      ignore: 'Se non ti sei iscritto, ignora semplicemente questa e-mail.',
      community: 'Dopo la conferma potrai condividere il tuo consiglio con la community.',
      communityButton: 'Condividi un consiglio',
      text: (url, communityUrl) => `Ciao!\n\nConferma la tua iscrizione al ResortPass Tracker:\n${url}\n\nSe non ti sei iscritto, ignora semplicemente questa e-mail.${communityUrl ? `\n\nDopo la conferma potrai condividere il tuo consiglio con la community:\n${communityUrl}` : ''}`,
    },
    alert: {
      title: 'ResortPass disponibile!',
      subject: (pass) => `Il ResortPass ${pass} è disponibile ora!`,
      greeting: 'Ciao!',
      headline: (pass) => `Ottime notizie: il ResortPass Europa-Park ${pass} è di nuovo disponibile nel negozio di biglietti!`,
      urgency: 'I contingenti si esauriscono spesso in fretta, quindi ti consigliamo di non aspettare:',
      button: 'Acquista ora →',
      closing: 'Buon divertimento a Europa-Park!',
      reason: 'Ricevi questa e-mail perché ti sei iscritto su resortpass-europapark.ch.',
      unsubscribe: 'Disiscriviti',
      community: 'Hai un consiglio? Condividilo con la community.',
      communityButton: 'Condividi un consiglio',
      text: (pass, shopUrl, unsubscribeUrl, communityUrl) => `Ciao!\n\nOttime notizie: il ResortPass Europa-Park ${pass} è di nuovo disponibile nel negozio di biglietti!\n\nI contingenti si esauriscono spesso in fretta, quindi ti consigliamo di non aspettare:\n${shopUrl}\n\nBuon divertimento a Europa-Park!${communityUrl ? `\n\nHai un consiglio? Condividilo con la community:\n${communityUrl}` : ''}\n\n---\nDisiscriviti: ${unsubscribeUrl}`,
    },
    unsubscribe: {
      title: 'Disiscrizione confermata',
      subject: 'Disiscrizione confermata — ResortPass Tracker',
      heading: 'La tua disiscrizione è stata confermata.',
      message: 'I tuoi dati sono stati eliminati completamente. Non riceverai altre e-mail da parte nostra.',
      resubscribe: 'Se vuoi iscriverti di nuovo:',
      text: (siteUrl) => `La tua disiscrizione dal ResortPass Tracker è stata confermata.\n\nI tuoi dati sono stati eliminati. Non riceverai altre e-mail.\n\nSe vuoi iscriverti di nuovo: ${siteUrl}`,
    },
  },
  en: {
    footer: 'ResortPass Tracker — unofficial community project',
    confirm: {
      title: 'Confirm your email address',
      subject: 'Please confirm your email — ResortPass Tracker',
      greeting: 'Hello!',
      message: 'Please confirm your subscription so we can notify you as soon as the Europa-Park ResortPass becomes available again.',
      button: 'Confirm my email',
      ignore: 'If you did not sign up, you can simply ignore this email.',
      community: 'After confirming, you can share your tip with the community.',
      communityButton: 'Share a community tip',
      text: (url, communityUrl) => `Hello!\n\nPlease confirm your ResortPass Tracker subscription:\n${url}\n\nIf you did not sign up, you can simply ignore this email.${communityUrl ? `\n\nAfter confirming, you can share your tip with the community:\n${communityUrl}` : ''}`,
    },
    alert: {
      title: 'ResortPass available!',
      subject: (pass) => `ResortPass ${pass} is available now!`,
      greeting: 'Hello!',
      headline: (pass) => `Good news: the Europa-Park ResortPass ${pass} is back in stock in the ticket shop!`,
      urgency: 'Allocations often sell out quickly, so it is best not to wait:',
      button: 'Buy now →',
      closing: 'Have a great time at Europa-Park!',
      reason: 'You are receiving this email because you signed up at resortpass-europapark.ch.',
      unsubscribe: 'Unsubscribe',
      community: 'Have a tip? Share it with the community.',
      communityButton: 'Share a community tip',
      text: (pass, shopUrl, unsubscribeUrl, communityUrl) => `Hello!\n\nGood news: the Europa-Park ResortPass ${pass} is back in stock in the ticket shop!\n\nAllocations often sell out quickly, so it is best not to wait:\n${shopUrl}\n\nHave a great time at Europa-Park!${communityUrl ? `\n\nHave a tip? Share it with the community:\n${communityUrl}` : ''}\n\n---\nUnsubscribe: ${unsubscribeUrl}`,
    },
    unsubscribe: {
      title: 'Unsubscription confirmed',
      subject: 'Unsubscription confirmed — ResortPass Tracker',
      heading: 'You have been successfully unsubscribed.',
      message: 'Your data has been completely deleted. You will not receive any more emails from us.',
      resubscribe: 'If you would like to subscribe again:',
      text: (siteUrl) => `You have been successfully unsubscribed from ResortPass Tracker.\n\nYour data has been deleted. You will not receive any more emails.\n\nIf you would like to subscribe again: ${siteUrl}`,
    },
  },
  nl: defineEmailCopy({
    footer: 'ResortPass Tracker — onofficieel communityproject',
    confirm: {
      title: 'Bevestig je e-mailadres',
      subject: 'Bevestig je e-mailadres — ResortPass Tracker',
      greeting: 'Hallo!',
      message: 'Bevestig je aanmelding, zodat we je kunnen laten weten wanneer de Europa-Park ResortPass weer verkrijgbaar is.',
      button: 'Mijn e-mailadres bevestigen',
      ignore: 'Heb je je niet aangemeld? Dan kun je deze e-mail gewoon negeren.',
      community: 'Na de bevestiging kun je jouw tip met de community delen.',
      communityButton: 'Tip met de community delen',
    },
    alert: {
      title: 'ResortPass verkrijgbaar!',
      subject: (pass) => `ResortPass ${pass} is nu verkrijgbaar!`,
      greeting: 'Hallo!',
      headline: (pass) => `Goed nieuws: de Europa-Park ResortPass ${pass} is weer verkrijgbaar in de ticketshop!`,
      urgency: 'De voorraad is vaak snel uitverkocht, dus wacht bij voorkeur niet te lang:',
      button: 'Nu kopen →',
      closing: 'Veel plezier in Europa-Park!',
      reason: 'Je ontvangt deze e-mail omdat je je hebt aangemeld op resortpass-europapark.ch.',
      unsubscribe: 'Afmelden',
      community: 'Heb je een tip? Deel hem met de community.',
      communityButton: 'Tip met de community delen',
    },
    unsubscribe: {
      title: 'Afmelding bevestigd',
      subject: 'Afmelding bevestigd — ResortPass Tracker',
      heading: 'Je bent succesvol afgemeld.',
      message: 'Je gegevens zijn volledig verwijderd. Je ontvangt geen e-mails meer van ons.',
      resubscribe: 'Wil je je opnieuw aanmelden?',
    },
  }),
  es: defineEmailCopy({
    footer: 'ResortPass Tracker — proyecto comunitario no oficial',
    confirm: {
      title: 'Confirma tu correo electrónico',
      subject: 'Confirma tu correo electrónico — ResortPass Tracker',
      greeting: '¡Hola!',
      message: 'Confirma tu suscripción para que podamos avisarte en cuanto el ResortPass de Europa-Park vuelva a estar disponible.',
      button: 'Confirmar mi correo',
      ignore: 'Si no te has suscrito, puedes ignorar este correo.',
      community: 'Después de confirmar, podrás compartir tu consejo con la comunidad.',
      communityButton: 'Compartir un consejo',
    },
    alert: {
      title: '¡ResortPass disponible!',
      subject: (pass) => `¡El ResortPass ${pass} ya está disponible!`,
      greeting: '¡Hola!',
      headline: (pass) => `Buenas noticias: ¡el ResortPass ${pass} de Europa-Park vuelve a estar disponible en la tienda de entradas!`,
      urgency: 'Las existencias suelen agotarse rápidamente, así que es mejor no esperar:',
      button: 'Comprar ahora →',
      closing: '¡Que disfrutes de Europa-Park!',
      reason: 'Recibes este correo porque te suscribiste en resortpass-europapark.ch.',
      unsubscribe: 'Darse de baja',
      community: '¿Tienes un consejo? Compártelo con la comunidad.',
      communityButton: 'Compartir un consejo',
    },
    unsubscribe: {
      title: 'Baja confirmada',
      subject: 'Baja confirmada — ResortPass Tracker',
      heading: 'Te has dado de baja correctamente.',
      message: 'Tus datos se han eliminado por completo. No recibirás más correos nuestros.',
      resubscribe: 'Si quieres volver a suscribirte:',
    },
  }),
  sv: defineEmailCopy({
    footer: 'ResortPass Tracker — inofficiellt communityprojekt',
    confirm: {
      title: 'Bekräfta din e-postadress',
      subject: 'Bekräfta din e-postadress — ResortPass Tracker',
      greeting: 'Hej!',
      message: 'Bekräfta din prenumeration så att vi kan meddela dig så snart Europa-Park ResortPass blir tillgängligt igen.',
      button: 'Bekräfta min e-postadress',
      ignore: 'Om du inte registrerade dig kan du helt enkelt bortse från det här mejlet.',
      community: 'Efter bekräftelsen kan du dela ditt tips med communityn.',
      communityButton: 'Dela ett tips',
    },
    alert: {
      title: 'ResortPass är tillgängligt!',
      subject: (pass) => `ResortPass ${pass} är tillgängligt nu!`,
      greeting: 'Hej!',
      headline: (pass) => `Goda nyheter: Europa-Park ResortPass ${pass} finns åter i lager i biljettbutiken!`,
      urgency: 'Tilldelningarna tar ofta snabbt slut, så vänta helst inte:',
      button: 'Köp nu →',
      closing: 'Ha det så roligt på Europa-Park!',
      reason: 'Du får det här mejlet eftersom du registrerade dig på resortpass-europapark.ch.',
      unsubscribe: 'Avregistrera',
      community: 'Har du ett tips? Dela det med communityn.',
      communityButton: 'Dela ett tips',
    },
    unsubscribe: {
      title: 'Avregistreringen är bekräftad',
      subject: 'Avregistreringen är bekräftad — ResortPass Tracker',
      heading: 'Du har avregistrerats.',
      message: 'Dina uppgifter har raderats helt. Du kommer inte att få fler mejl från oss.',
      resubscribe: 'Om du vill registrera dig igen:',
    },
  }),
  ro: defineEmailCopy({
    footer: 'ResortPass Tracker — proiect comunitar neoficial',
    confirm: {
      title: 'Confirmă adresa de e-mail',
      subject: 'Confirmă adresa de e-mail — ResortPass Tracker',
      greeting: 'Bună!',
      message: 'Confirmă abonarea pentru a te putea anunța imediat ce ResortPass Europa-Park devine din nou disponibil.',
      button: 'Confirmă adresa de e-mail',
      ignore: 'Dacă nu te-ai abonat, poți ignora acest e-mail.',
      community: 'După confirmare, poți împărtăși sfatul tău cu comunitatea.',
      communityButton: 'Împărtășește un sfat',
    },
    alert: {
      title: 'ResortPass este disponibil!',
      subject: (pass) => `ResortPass ${pass} este disponibil acum!`,
      greeting: 'Bună!',
      headline: (pass) => `Vești bune: ResortPass Europa-Park ${pass} este din nou disponibil în magazinul de bilete!`,
      urgency: 'Stocurile se epuizează adesea rapid, așa că este mai bine să nu aștepți:',
      button: 'Cumpără acum →',
      closing: 'Distracție plăcută la Europa-Park!',
      reason: 'Primești acest e-mail deoarece te-ai abonat pe resortpass-europapark.ch.',
      unsubscribe: 'Dezabonare',
      community: 'Ai un sfat? Împărtășește-l cu comunitatea.',
      communityButton: 'Împărtășește un sfat',
    },
    unsubscribe: {
      title: 'Dezabonare confirmată',
      subject: 'Dezabonare confirmată — ResortPass Tracker',
      heading: 'Te-ai dezabonat cu succes.',
      message: 'Datele tale au fost șterse complet. Nu vei mai primi e-mailuri de la noi.',
      resubscribe: 'Dacă dorești să te abonezi din nou:',
    },
  }),
  cs: defineEmailCopy({
    footer: 'ResortPass Tracker — neoficiální komunitní projekt',
    confirm: {
      title: 'Potvrďte svou e-mailovou adresu',
      subject: 'Potvrďte svůj e-mail — ResortPass Tracker',
      greeting: 'Dobrý den!',
      message: 'Potvrďte svou registraci, abychom vás mohli upozornit, jakmile bude ResortPass Europa-Park znovu dostupný.',
      button: 'Potvrdit e-mail',
      ignore: 'Pokud jste se neregistrovali, můžete tento e-mail jednoduše ignorovat.',
      community: 'Po potvrzení můžete sdílet svůj tip s komunitou.',
      communityButton: 'Sdílet tip s komunitou',
    },
    alert: {
      title: 'ResortPass je dostupný!',
      subject: (pass) => `ResortPass ${pass} je nyní dostupný!`,
      greeting: 'Dobrý den!',
      headline: (pass) => `Dobrá zpráva: ResortPass Europa-Park ${pass} je znovu dostupný v obchodě se vstupenkami!`,
      urgency: 'Dostupné kusy bývají rychle vyprodány, proto raději nečekejte:',
      button: 'Koupit nyní →',
      closing: 'Užijte si Europa-Park!',
      reason: 'Tento e-mail dostáváte, protože jste se zaregistrovali na resortpass-europapark.ch.',
      unsubscribe: 'Odhlásit odběr',
      community: 'Máte tip? Podělte se o něj s komunitou.',
      communityButton: 'Sdílet tip s komunitou',
    },
    unsubscribe: {
      title: 'Odhlášení potvrzeno',
      subject: 'Odhlášení potvrzeno — ResortPass Tracker',
      heading: 'Odběr byl úspěšně odhlášen.',
      message: 'Vaše údaje byly zcela smazány. Další e-maily od nás už nedostanete.',
      resubscribe: 'Pokud se chcete znovu přihlásit:',
    },
  }),
  pl: defineEmailCopy({
    footer: 'ResortPass Tracker — nieoficjalny projekt społecznościowy',
    confirm: {
      title: 'Potwierdź adres e-mail',
      subject: 'Potwierdź swój adres e-mail — ResortPass Tracker',
      greeting: 'Cześć!',
      message: 'Potwierdź zapis, abyśmy mogli powiadomić Cię, gdy ResortPass Europa-Park znów będzie dostępny.',
      button: 'Potwierdź adres e-mail',
      ignore: 'Jeśli nie zapisano się do powiadomień, po prostu zignoruj tę wiadomość.',
      community: 'Po potwierdzeniu możesz podzielić się swoją wskazówką ze społecznością.',
      communityButton: 'Udostępnij wskazówkę',
    },
    alert: {
      title: 'ResortPass jest dostępny!',
      subject: (pass) => `ResortPass ${pass} jest już dostępny!`,
      greeting: 'Cześć!',
      headline: (pass) => `Dobra wiadomość: ResortPass Europa-Park ${pass} znów jest dostępny w sklepie z biletami!`,
      urgency: 'Dostępna pula często szybko się wyczerpuje, więc lepiej nie zwlekać:',
      button: 'Kup teraz →',
      closing: 'Udanej zabawy w Europa-Park!',
      reason: 'Otrzymujesz tę wiadomość, ponieważ zapisano się na resortpass-europapark.ch.',
      unsubscribe: 'Wypisz się',
      community: 'Masz wskazówkę? Podziel się nią ze społecznością.',
      communityButton: 'Udostępnij wskazówkę',
    },
    unsubscribe: {
      title: 'Rezygnacja potwierdzona',
      subject: 'Rezygnacja potwierdzona — ResortPass Tracker',
      heading: 'Subskrypcja została pomyślnie anulowana.',
      message: 'Twoje dane zostały całkowicie usunięte. Nie otrzymasz od nas więcej wiadomości.',
      resubscribe: 'Jeśli chcesz zapisać się ponownie:',
    },
  }),
  tr: defineEmailCopy({
    footer: 'ResortPass Tracker — resmî olmayan topluluk projesi',
    confirm: {
      title: 'E-posta adresinizi onaylayın',
      subject: 'E-posta adresinizi onaylayın — ResortPass Tracker',
      greeting: 'Merhaba!',
      message: 'Europa-Park ResortPass yeniden satışa çıktığında sizi bilgilendirebilmemiz için kaydınızı onaylayın.',
      button: 'E-postamı onayla',
      ignore: 'Kayıt olmadıysanız bu e-postayı yok sayabilirsiniz.',
      community: 'Onaydan sonra ipucunuzu toplulukla paylaşabilirsiniz.',
      communityButton: 'Topluluk ipucu paylaş',
    },
    alert: {
      title: 'ResortPass satışta!',
      subject: (pass) => `ResortPass ${pass} şimdi satışta!`,
      greeting: 'Merhaba!',
      headline: (pass) => `İyi haber: Europa-Park ResortPass ${pass} bilet mağazasında yeniden satışa çıktı!`,
      urgency: 'Kontenjanlar genellikle hızla tükenir, bu nedenle beklememenizi öneririz:',
      button: 'Şimdi satın al →',
      closing: 'Europa-Park’ta iyi eğlenceler!',
      reason: 'Bu e-postayı resortpass-europapark.ch üzerinden kaydolduğunuz için alıyorsunuz.',
      unsubscribe: 'Abonelikten çık',
      community: 'Bir ipucunuz mu var? Toplulukla paylaşın.',
      communityButton: 'Topluluk ipucu paylaş',
    },
    unsubscribe: {
      title: 'Abonelikten çıkma onaylandı',
      subject: 'Abonelikten çıkma onaylandı — ResortPass Tracker',
      heading: 'Abonelikten başarıyla çıktınız.',
      message: 'Verileriniz tamamen silindi. Artık bizden e-posta almayacaksınız.',
      resubscribe: 'Yeniden kaydolmak isterseniz:',
    },
  }),
  da: defineEmailCopy({
    footer: 'ResortPass Tracker — uofficielt fællesskabsprojekt',
    confirm: {
      title: 'Bekræft din e-mailadresse',
      subject: 'Bekræft din e-mailadresse — ResortPass Tracker',
      greeting: 'Hej!',
      message: 'Bekræft din tilmelding, så vi kan give dig besked, så snart Europa-Park ResortPass igen er tilgængeligt.',
      button: 'Bekræft min e-mail',
      ignore: 'Hvis du ikke har tilmeldt dig, kan du blot se bort fra denne e-mail.',
      community: 'Efter bekræftelsen kan du dele dit tip med fællesskabet.',
      communityButton: 'Del et tip',
    },
    alert: {
      title: 'ResortPass er tilgængeligt!',
      subject: (pass) => `ResortPass ${pass} er tilgængeligt nu!`,
      greeting: 'Hej!',
      headline: (pass) => `Gode nyheder: Europa-Park ResortPass ${pass} er igen tilgængeligt i billetshoppen!`,
      urgency: 'De tilgængelige kort bliver ofte hurtigt udsolgt, så vent helst ikke:',
      button: 'Køb nu →',
      closing: 'God fornøjelse i Europa-Park!',
      reason: 'Du modtager denne e-mail, fordi du tilmeldte dig på resortpass-europapark.ch.',
      unsubscribe: 'Afmeld',
      community: 'Har du et tip? Del det med fællesskabet.',
      communityButton: 'Del et tip',
    },
    unsubscribe: {
      title: 'Afmelding bekræftet',
      subject: 'Afmelding bekræftet — ResortPass Tracker',
      heading: 'Du er blevet afmeldt.',
      message: 'Dine data er blevet slettet helt. Du modtager ikke flere e-mails fra os.',
      resubscribe: 'Hvis du vil tilmelde dig igen:',
    },
  }),
  el: defineEmailCopy({
    footer: 'ResortPass Tracker — ανεπίσημο κοινοτικό έργο',
    confirm: {
      title: 'Επιβεβαιώστε τη διεύθυνση email σας',
      subject: 'Επιβεβαιώστε το email σας — ResortPass Tracker',
      greeting: 'Γεια σας!',
      message: 'Επιβεβαιώστε την εγγραφή σας, ώστε να σας ειδοποιήσουμε μόλις το Europa-Park ResortPass γίνει ξανά διαθέσιμο.',
      button: 'Επιβεβαίωση email',
      ignore: 'Αν δεν κάνατε εγγραφή, μπορείτε απλώς να αγνοήσετε αυτό το email.',
      community: 'Μετά την επιβεβαίωση, μπορείτε να μοιραστείτε τη συμβουλή σας με την κοινότητα.',
      communityButton: 'Κοινοποίηση συμβουλής',
    },
    alert: {
      title: 'Το ResortPass είναι διαθέσιμο!',
      subject: (pass) => `Το ResortPass ${pass} είναι διαθέσιμο τώρα!`,
      greeting: 'Γεια σας!',
      headline: (pass) => `Καλά νέα: το Europa-Park ResortPass ${pass} είναι ξανά διαθέσιμο στο κατάστημα εισιτηρίων!`,
      urgency: 'Τα διαθέσιμα τεμάχια συνήθως εξαντλούνται γρήγορα, γι’ αυτό μην περιμένετε:',
      button: 'Αγορά τώρα →',
      closing: 'Καλή διασκέδαση στο Europa-Park!',
      reason: 'Λαμβάνετε αυτό το email επειδή εγγραφήκατε στο resortpass-europapark.ch.',
      unsubscribe: 'Διαγραφή',
      community: 'Έχετε μια συμβουλή; Μοιραστείτε τη με την κοινότητα.',
      communityButton: 'Κοινοποίηση συμβουλής',
    },
    unsubscribe: {
      title: 'Η διαγραφή επιβεβαιώθηκε',
      subject: 'Η διαγραφή επιβεβαιώθηκε — ResortPass Tracker',
      heading: 'Η διαγραφή σας ολοκληρώθηκε με επιτυχία.',
      message: 'Τα δεδομένα σας διαγράφηκαν πλήρως. Δεν θα λαμβάνετε πλέον email από εμάς.',
      resubscribe: 'Αν θέλετε να εγγραφείτε ξανά:',
    },
  }),
  pt: defineEmailCopy({
    footer: 'ResortPass Tracker — projeto comunitário não oficial',
    confirm: {
      title: 'Confirme o seu endereço de email',
      subject: 'Confirme o seu email — ResortPass Tracker',
      greeting: 'Olá!',
      message: 'Confirme a sua subscrição para podermos avisá-lo assim que o ResortPass Europa-Park voltar a estar disponível.',
      button: 'Confirmar o meu email',
      ignore: 'Se não se inscreveu, pode simplesmente ignorar este email.',
      community: 'Após a confirmação, poderá partilhar a sua dica com a comunidade.',
      communityButton: 'Partilhar uma dica',
    },
    alert: {
      title: 'ResortPass disponível!',
      subject: (pass) => `O ResortPass ${pass} está disponível agora!`,
      greeting: 'Olá!',
      headline: (pass) => `Boas notícias: o ResortPass Europa-Park ${pass} está novamente disponível na loja de bilhetes!`,
      urgency: 'As unidades disponíveis esgotam-se muitas vezes rapidamente, por isso é melhor não esperar:',
      button: 'Comprar agora →',
      closing: 'Divirta-se no Europa-Park!',
      reason: 'Recebe este email porque se inscreveu em resortpass-europapark.ch.',
      unsubscribe: 'Cancelar subscrição',
      community: 'Tem uma dica? Partilhe-a com a comunidade.',
      communityButton: 'Partilhar uma dica',
    },
    unsubscribe: {
      title: 'Cancelamento confirmado',
      subject: 'Cancelamento confirmado — ResortPass Tracker',
      heading: 'A sua subscrição foi cancelada com sucesso.',
      message: 'Os seus dados foram totalmente eliminados. Não receberá mais emails nossos.',
      resubscribe: 'Se quiser voltar a subscrever:',
    },
  }),
  nb: defineEmailCopy({
    footer: 'ResortPass Tracker — uoffisielt fellesskapsprosjekt',
    confirm: {
      title: 'Bekreft e-postadressen din',
      subject: 'Bekreft e-postadressen din — ResortPass Tracker',
      greeting: 'Hei!',
      message: 'Bekreft påmeldingen, slik at vi kan varsle deg så snart Europa-Park ResortPass blir tilgjengelig igjen.',
      button: 'Bekreft e-postadressen min',
      ignore: 'Hvis du ikke meldte deg på, kan du bare se bort fra denne e-posten.',
      community: 'Etter bekreftelsen kan du dele tipset ditt med fellesskapet.',
      communityButton: 'Del et tips',
    },
    alert: {
      title: 'ResortPass er tilgjengelig!',
      subject: (pass) => `ResortPass ${pass} er tilgjengelig nå!`,
      greeting: 'Hei!',
      headline: (pass) => `Gode nyheter: Europa-Park ResortPass ${pass} er igjen tilgjengelig i billettbutikken!`,
      urgency: 'De tilgjengelige kortene blir ofte raskt utsolgt, så det er best å ikke vente:',
      button: 'Kjøp nå →',
      closing: 'Kos deg i Europa-Park!',
      reason: 'Du mottar denne e-posten fordi du meldte deg på hos resortpass-europapark.ch.',
      unsubscribe: 'Avmeld',
      community: 'Har du et tips? Del det med fellesskapet.',
      communityButton: 'Del et tips',
    },
    unsubscribe: {
      title: 'Avmelding bekreftet',
      subject: 'Avmelding bekreftet — ResortPass Tracker',
      heading: 'Du er nå avmeldt.',
      message: 'Opplysningene dine er fullstendig slettet. Du vil ikke motta flere e-poster fra oss.',
      resubscribe: 'Hvis du vil melde deg på igjen:',
    },
  }),
  he: defineEmailCopy({
    footer: 'ResortPass Tracker — מיזם קהילתי לא רשמי',
    confirm: {
      title: 'אישור כתובת האימייל',
      subject: 'נא לאשר את כתובת האימייל — ResortPass Tracker',
      greeting: 'שלום!',
      message: 'נא לאשר את ההרשמה כדי שנוכל לעדכן אותך ברגע שה־ResortPass של Europa-Park יהיה זמין שוב.',
      button: 'אישור האימייל',
      ignore: 'אם לא נרשמת, אפשר פשוט להתעלם מהודעה זו.',
      community: 'לאחר האישור אפשר לשתף את הטיפ שלך עם הקהילה.',
      communityButton: 'שיתוף טיפ עם הקהילה',
    },
    alert: {
      title: 'ה־ResortPass זמין!',
      subject: (pass) => `ה־ResortPass ${pass} זמין עכשיו!`,
      greeting: 'שלום!',
      headline: (pass) => `חדשות טובות: ה־ResortPass ${pass} של Europa-Park זמין שוב בחנות הכרטיסים!`,
      urgency: 'המלאי נוטה להיגמר במהירות, לכן מומלץ לא להמתין:',
      button: 'לרכישה עכשיו ←',
      closing: 'בילוי נעים ב־Europa-Park!',
      reason: 'הודעה זו נשלחה כי נרשמת באתר resortpass-europapark.ch.',
      unsubscribe: 'ביטול הרשמה',
      community: 'יש לך טיפ? אפשר לשתף אותו עם הקהילה.',
      communityButton: 'שיתוף טיפ עם הקהילה',
    },
    unsubscribe: {
      title: 'ביטול ההרשמה אושר',
      subject: 'ביטול ההרשמה אושר — ResortPass Tracker',
      heading: 'ההרשמה שלך בוטלה בהצלחה.',
      message: 'הנתונים שלך נמחקו במלואם. לא יישלחו אליך הודעות אימייל נוספות מאיתנו.',
      resubscribe: 'להרשמה מחדש:',
    },
  }),
  hu: defineEmailCopy({
    footer: 'ResortPass Tracker — nem hivatalos közösségi projekt',
    confirm: {
      title: 'Erősítsd meg az e-mail-címedet',
      subject: 'Erősítsd meg az e-mail-címedet — ResortPass Tracker',
      greeting: 'Szia!',
      message: 'Erősítsd meg a feliratkozást, hogy értesíthessünk, amint az Europa-Park ResortPass ismét elérhető.',
      button: 'E-mail-cím megerősítése',
      ignore: 'Ha nem te iratkoztál fel, egyszerűen hagyd figyelmen kívül ezt az e-mailt.',
      community: 'A megerősítés után megoszthatod a tippedet a közösséggel.',
      communityButton: 'Tipp megosztása',
    },
    alert: {
      title: 'A ResortPass elérhető!',
      subject: (pass) => `A ResortPass ${pass} most elérhető!`,
      greeting: 'Szia!',
      headline: (pass) => `Jó hír: az Europa-Park ResortPass ${pass} ismét elérhető a jegyáruházban!`,
      urgency: 'A készlet gyakran gyorsan elfogy, ezért érdemes mielőbb lecsapni rá:',
      button: 'Vásárlás most →',
      closing: 'Kellemes időtöltést az Europa-Parkban!',
      reason: 'Ezt az e-mailt azért kapod, mert feliratkoztál a resortpass-europapark.ch oldalon.',
      unsubscribe: 'Leiratkozás',
      community: 'Van egy jó tipped? Oszd meg a közösséggel.',
      communityButton: 'Tipp megosztása',
    },
    unsubscribe: {
      title: 'Leiratkozás megerősítve',
      subject: 'Leiratkozás megerősítve — ResortPass Tracker',
      heading: 'Sikeresen leiratkoztál.',
      message: 'Az adataidat teljesen töröltük. Több e-mailt nem küldünk.',
      resubscribe: 'Ha újra fel szeretnél iratkozni:',
    },
  }),
};

function loadTemplate(name: string): string {
  return readFileSync(join(import.meta.dir, '..', 'emails', `${name}.html`), 'utf-8')
    .replace('<html lang="{{LANG}}">', '<html lang="{{LANG}}" dir="{{DIR}}">');
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function replacePlaceholders(template: string, vars: Record<string, string>): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{{${key}}}`, escapeHtml(value));
  }
  return result;
}

function emailContext(value: unknown) {
  const requestedLanguage = normalizeLanguage(value);
  const localizedCopy = emailCopy[requestedLanguage];
  const contentLanguage = localizedCopy ? requestedLanguage : fallbackLanguage;
  return {
    requestedLanguage,
    contentLanguage,
    copy: localizedCopy || emailCopy.en,
  };
}

/*
 * Always ends in a slash, because the site is built with
 * `trailingSlash: 'always'` and every other spelling is a redirect.
 *
 * That mattered far more than a canonical-URL nicety: the links built on top of
 * this all carry `?token=`, and the redirect Caddy sends for the slashless form
 * points at `{path}/` — a bare path, with no query. So the 308 quietly dropped
 * the token, every confirmation link landed on an empty /confirm/, and nobody
 * had been able to confirm a subscription since the redirect went in.
 */
export function localizedSiteUrl(lang: string = defaultLanguage, route = ''): string {
  const base = SITE_URL.replace(/\/+$/, '');
  const normalizedLanguage = normalizeLanguage(lang);
  const routeLanguage = localizedUiLanguages.has(normalizedLanguage)
    ? normalizedLanguage
    : fallbackLanguage;
  const locale = routeLanguage === defaultLanguage ? '' : `/${routeLanguage}`;
  const path = route.replace(/^\/+|\/+$/g, '');
  return path ? `${base}${locale}/${path}/` : `${base}${locale}/`;
}

function linkSection(message: string, button: string, url?: string): string {
  if (!url) return '';
  return `<p style="color: #94A3B8; font-size: 14px; line-height: 1.5; margin: 20px 0 0; text-align: center;">${escapeHtml(message)}<br /><a href="${escapeHtml(url)}" style="color: #3B82F6; text-decoration: none;">${escapeHtml(button)}</a></p>`;
}

export function renderConfirmationEmail(
  confirmToken: string,
  lang: string = defaultLanguage,
  communityUrl?: string,
): RenderedEmail {
  const { requestedLanguage, contentLanguage, copy } = emailContext(lang);
  const confirmUrl = `${localizedSiteUrl(requestedLanguage, 'confirm')}?token=${encodeURIComponent(confirmToken)}`;
  const template = loadTemplate('confirm').replaceAll(
    '{{COMMUNITY_SECTION}}',
    linkSection(copy.confirm.community, copy.confirm.communityButton, communityUrl),
  );
  const html = replacePlaceholders(template, {
    LANG: contentLanguage,
    DIR: isRtlLanguage(contentLanguage) ? 'rtl' : 'ltr',
    TITLE: copy.confirm.title,
    GREETING: copy.confirm.greeting,
    MESSAGE: copy.confirm.message,
    BUTTON: copy.confirm.button,
    IGNORE: copy.confirm.ignore,
    FOOTER: copy.footer,
    CONFIRM_URL: confirmUrl,
    ASSET_URL,
    SITE_URL: localizedSiteUrl(requestedLanguage),
  });

  return { subject: copy.confirm.subject, html, text: copy.confirm.text(confirmUrl, communityUrl) };
}

export function renderAlertEmail(
  passType: 'silver' | 'gold',
  unsubscribeToken: string,
  lang: string = defaultLanguage,
  communityUrl?: string,
): RenderedEmail {
  const { requestedLanguage, contentLanguage, copy } = emailContext(lang);
  const passLabel = passType === 'silver' ? 'Silver' : 'Gold';
  const shopUrl = 'https://tickets.mackinternational.de/de/resortpass/uebersicht';
  const unsubscribeUrl = `${localizedSiteUrl(requestedLanguage, 'unsubscribe')}?token=${encodeURIComponent(unsubscribeToken)}`;
  const template = loadTemplate('alert').replaceAll(
    '{{COMMUNITY_SECTION}}',
    linkSection(copy.alert.community, copy.alert.communityButton, communityUrl),
  );
  const html = replacePlaceholders(template, {
    LANG: contentLanguage,
    DIR: isRtlLanguage(contentLanguage) ? 'rtl' : 'ltr',
    TITLE: copy.alert.title,
    GREETING: copy.alert.greeting,
    HEADLINE: copy.alert.headline(passLabel),
    URGENCY: copy.alert.urgency,
    BUTTON: copy.alert.button,
    CLOSING: copy.alert.closing,
    REASON: copy.alert.reason,
    UNSUBSCRIBE: copy.alert.unsubscribe,
    SHOP_URL: shopUrl,
    UNSUBSCRIBE_URL: unsubscribeUrl,
    ASSET_URL,
    SITE_URL: localizedSiteUrl(requestedLanguage),
  });

  return {
    subject: copy.alert.subject(passLabel),
    html,
    text: copy.alert.text(passLabel, shopUrl, unsubscribeUrl, communityUrl),
  };
}

export function renderUnsubscribeEmail(lang: string = defaultLanguage): RenderedEmail {
  const { requestedLanguage, contentLanguage, copy } = emailContext(lang);
  const siteUrl = localizedSiteUrl(requestedLanguage);
  const html = replacePlaceholders(loadTemplate('unsubscribe'), {
    LANG: contentLanguage,
    DIR: isRtlLanguage(contentLanguage) ? 'rtl' : 'ltr',
    TITLE: copy.unsubscribe.title,
    HEADING: copy.unsubscribe.heading,
    MESSAGE: copy.unsubscribe.message,
    RESUBSCRIBE: copy.unsubscribe.resubscribe,
    FOOTER: copy.footer,
    ASSET_URL,
    SITE_URL: siteUrl,
  });

  return { subject: copy.unsubscribe.subject, html, text: copy.unsubscribe.text(siteUrl) };
}

export async function sendConfirmationEmail(
  email: string,
  confirmToken: string,
  lang: string = defaultLanguage,
  communityUrl?: string,
) {
  await transporter.sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    ...renderConfirmationEmail(confirmToken, lang, communityUrl),
  });
}

export async function sendAlertEmail(
  email: string,
  passType: 'silver' | 'gold',
  unsubscribeToken: string,
  lang: string = defaultLanguage,
  communityUrl?: string,
) {
  await transporter.sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    ...renderAlertEmail(passType, unsubscribeToken, lang, communityUrl),
  });
}

export async function sendUnsubscribeConfirmation(email: string, lang: string = defaultLanguage) {
  await transporter.sendMail({
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: email,
    ...renderUnsubscribeEmail(lang),
  });
}
