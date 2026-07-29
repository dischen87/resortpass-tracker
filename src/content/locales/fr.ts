import type { PlanningLocalePack } from '../planning-types';

const common: PlanningLocalePack['common'] = {
  skip: 'Aller au contenu',
  menu: 'Menu',
  language: 'Choisir la langue',
  home: 'Accueil',
  plannerLabel: 'Planifier la visite',
  answerLabel: 'Réponse en bref',
  updatedLabel: 'Vérifié',
  sourcePrefix: 'Source',
  onThisPage: 'Sur cette page',
  relatedTitle: 'Étapes suivantes utiles',
  sourcesTitle: 'Sources et mise à jour',
  sourcesIntro:
    'Les informations susceptibles d’évoluer proviennent de sources officielles de l’exploitant et des autorités. Vérifiez les prix, horaires et règles dans la source primaire indiquée avant de réserver.',
  correctionLabel: 'Une information est incorrecte ?',
  correctionText:
    'Signalez-nous toute information obsolète. Nous distinguons clairement les faits vérifiés, les hypothèses de calcul et l’analyse éditoriale.',
  unofficial: 'Projet communautaire indépendant',
  footerText: 'Outil de planification indépendant, sans lien avec Europa-Park.',
  overview: 'Vue d’ensemble',
  tool: 'Outil de planification',
  decisions: 'Aide à la décision',
  faq: 'Questions fréquentes',
  notRecommendation: 'Fiche d’annuaire, pas une recommandation',
  verifyBeforeVisit: 'À vérifier directement auprès de l’établissement avant la visite',
};

const navigation: PlanningLocalePack['navigation'] = {
  parkGuide: 'Europa-Park',
  visitPlanner: '1 ou 2 jours',
  costCalculator: 'Budget',
  familyGuide: 'Familles',
  rulanticaGuide: 'Rulantica',
  stayGuide: 'Hébergement',
  restaurantGuide: 'Restaurants à Rust',
  resortPassGuide: 'ResortPass',
};

const pages: PlanningLocalePack['pages'] = {
  parkGuide: {
    title: 'Préparer Europa-Park : guide indépendant et calculateurs',
    description:
      'Préparez concrètement votre visite à Europa-Park : 1 ou 2 jours, budget, famille, Rulantica, hébergement et restaurants à Rust, avec des outils interactifs.',
    eyebrow: 'Centre de planification Europa-Park',
    heading: 'Préparez Europa-Park selon vos vrais besoins',
    answer:
      'Pour une première visite, une journée complète est le minimum ; deux jours sont généralement plus confortables, surtout avec des enfants, des spectacles ou une forte affluence. Appuyez-vous sur la date, le profil du groupe et le budget plutôt que sur un top 10 générique.',
    sectionTitle: 'De votre question à un programme de visite réaliste',
    sectionIntro:
      'Les outils relient votre situation à des informations à jour. Ils ne remplacent pas une réservation officielle, mais limitent les principales erreurs de planification avant le voyage.',
    points: [
      {
        title: 'Commencer par fixer la durée',
        text: 'Décidez entre un ou deux jours de parc selon votre heure d’arrivée, les attractions visées et l’affluence attendue.',
        icon: 'tabler:calendar-time',
      },
      {
        title: 'Calculer le budget total',
        text: 'Additionnez les billets du parc, Rulantica, le parking et l’hébergement sous forme de fourchette, sans faux prix fixe.',
        icon: 'tabler:calculator',
      },
      {
        title: 'Adapter le parcours au groupe',
        text: 'La taille, l’âge, le besoin de pauses et les centres d’intérêt déterminent davantage un bon ordre de visite que les classements généralistes.',
        icon: 'tabler:route',
      },
    ],
    faqs: [
      {
        question: 'Combien de jours faut-il prévoir pour Europa-Park ?',
        answer:
          'Une journée complète peut suffire pour une sélection de temps forts. Deux jours sont généralement plus réalistes pour une première visite, les familles, les spectacles et un parcours moins pressé.',
      },
      {
        question: 'Ce site est-il officiel ?',
        answer:
          'Non. ResortPass Tracker est un projet communautaire indépendant. Pour l’entrée, la sécurité et les règles du jour, seules les informations officielles d’Europa-Park font foi.',
      },
      {
        question: 'Pourquoi le calculateur affiche-t-il des fourchettes de prix ?',
        answer:
          'Europa-Park et Rulantica appliquent des tarifs en ligne variables selon la date. Tant qu’aucune date précise n’est choisie dans la billetterie officielle, une fourchette est plus honnête.',
      },
    ],
  },
  visitPlanner: {
    title: 'Europa-Park en 1 ou 2 jours ? Planificateur interactif',
    description:
      'Une journée suffit-elle à Europa-Park ? Créez un programme selon la date, le groupe, l’arrivée, l’affluence et Rulantica, avec un parcours par journée.',
    eyebrow: '1 ou 2 jours',
    heading: 'Combien de jours vous faut-il à Europa-Park ?',
    answer:
      'Une journée convient avec une arrivée tôt et des priorités claires. Deux jours sont le choix le plus sûr pour les familles, les spectacles et les nombreux quartiers thématiques ; avec Rulantica, deux à trois jours sont généralement préférables.',
    sectionTitle: 'Ce qui change réellement la durée de visite',
    sectionIntro:
      'Tous les groupes n’ont pas besoin du même parcours. Planifiez d’abord des plages horaires et des priorités ; les temps d’attente réels n’affineront l’ordre que le jour de la visite.',
    points: [
      {
        title: 'Un jour : faire des choix',
        text: 'Arrivez à l’ouverture, retenez trois à cinq objectifs majeurs et prévoyez des solutions de repli dans les quartiers voisins.',
        icon: 'tabler:number-1',
      },
      {
        title: 'Deux jours : répartir les zones',
        text: 'Répartissez les grandes attractions, les offres familiales et les spectacles entre deux parties du parc pour réduire les trajets et les doublons.',
        icon: 'tabler:number-2',
      },
      {
        title: 'Forte affluence : garder une marge',
        text: 'Réservez du temps pour manger, les pannes techniques et les déplacements. Les temps d’attente en direct permettent d’ajuster le programme sur place.',
        icon: 'tabler:clock-hour-4',
      },
    ],
    faqs: [
      {
        question: 'Peut-on faire Europa-Park en une journée ?',
        answer:
          'On peut découvrir de nombreux incontournables, mais rarement tout. Le planificateur tient compte de l’arrivée, du groupe et de l’affluence, puis recommande plus de temps lorsque les conditions sont défavorables.',
      },
      {
        question: 'Faut-il visiter Rulantica le même jour ?',
        answer:
          'Un billet soirée peut convenir à des adultes ou à des enfants plus âgés qui aiment l’eau. Avec de jeunes enfants ou si la zone aquatique est prioritaire, une journée séparée est plus reposante.',
      },
      {
        question: 'Le parcours garantit-il les temps d’attente ?',
        answer:
          'Non. La météo, les pannes et l’affluence réelle peuvent modifier le programme. Le jour de votre visite, consultez l’application officielle et les temps d’attente en direct.',
      },
    ],
  },
  costCalculator: {
    title: 'Budget Europa-Park 2026 : billets, parking et hôtel',
    description:
      'Calculez une fourchette réaliste pour Europa-Park selon le nombre d’adultes et d’enfants, 1 ou 2 jours, Rulantica, le parking et l’hébergement.',
    eyebrow: 'Budget total',
    heading: 'Combien coûtera votre séjour à Europa-Park au total ?',
    answer:
      'L’entrée n’est qu’une partie du budget. Le calculateur combine les fourchettes de billets variables selon la date avec le parking, Rulantica et votre budget d’hébergement, puis affiche volontairement un minimum et un maximum.',
    sectionTitle: 'Transformer les tarifs en budget utile',
    sectionIntro:
      'Nous utilisons les fourchettes officielles, sans inventer de prix d’hôtel. Vous renseignez vos propres hypothèses pour l’hébergement, les repas et le trajet.',
    points: [
      {
        title: 'Une fourchette pour les tarifs datés',
        text: 'Sans date de visite précise, une fourchette est plus fiable qu’un prix d’appel unique.',
        icon: 'tabler:arrows-horizontal',
      },
      {
        title: 'Budget familial par personne',
        text: 'Le total et le montant par personne facilitent la comparaison entre les options sur 1 et 2 jours.',
        icon: 'tabler:users',
      },
      {
        title: 'Des hypothèses toujours visibles',
        text: 'L’hébergement et les frais annexes sont affichés séparément afin que vous puissiez remplacer chaque hypothèse.',
        icon: 'tabler:list-details',
      },
    ],
    faqs: [
      {
        question: 'Les prix du calculateur sont-ils garantis ?',
        answer:
          'Non. Il s’agit de fourchettes officielles assorties d’une date de vérification. La disponibilité, la date de visite, les frais de dossier et le canal de réservation peuvent modifier le prix final.',
      },
      {
        question: 'Pourquoi ne pas utiliser un prix moyen pour l’hôtel ?',
        answer:
          'Le prix d’un hébergement dépend fortement de la date, du nombre de personnes et des conditions d’annulation. Vous saisissez donc vous-même un prix réellement trouvé.',
      },
      {
        question: 'Les repas et le trajet sont-ils inclus ?',
        answer:
          'Pas automatiquement pour le moment. Ces dépenses varient fortement selon votre lieu de départ et vos habitudes ; ajoutez-les comme marge personnelle.',
      },
    ],
  },
  familyGuide: {
    title: 'Europa-Park avec des enfants : taille et programme famille',
    description:
      'Préparez Europa-Park avec un bébé, un jeune enfant ou un enfant d’âge scolaire : filtrez les attractions par âge et taille, identifiez les règles d’accompagnement et placez les pauses.',
    eyebrow: 'Familles et enfants',
    heading: 'Quelles attractions conviennent à votre enfant ?',
    answer:
      'Pour de nombreuses attractions, l’âge et la taille sont pris en compte ensemble. Utilisez le filtre pour présélectionner, puis vérifiez toujours sur place la toise, les panneaux et les consignes du personnel.',
    sectionTitle: 'Un programme famille ne se résume pas à une liste d’attractions',
    sectionIntro:
      'Les pauses, les repas, les changes, les écarts de taille entre frères et sœurs et les éventuelles règles d’accompagnement façonnent autant le parcours que les attractions favorites.',
    points: [
      {
        title: 'Combiner âge et taille',
        text: 'Le filtre distingue les conditions minimales et l’éventuel accompagnement par un adulte à partir des pages officielles détaillées.',
        icon: 'tabler:ruler-measure',
      },
      {
        title: 'Prévoir des moments calmes',
        text: 'Les attractions en intérieur, les aires de jeux et les spectacles offrent de bonnes pauses entre les expériences plus intenses.',
        icon: 'tabler:zzz',
      },
      {
        title: 'Revérifier sur place',
        text: 'Les règles de sécurité peuvent évoluer et sont affichées de façon contraignante à l’entrée de chaque attraction.',
        icon: 'tabler:shield-check',
      },
    ],
    faqs: [
      {
        question: 'La taille suffit-elle à déterminer l’accès ?',
        answer:
          'Non. Certaines attractions imposent aussi un âge minimum ou exigent la présence d’un adulte jusqu’à un âge ou une taille donnée.',
      },
      {
        question: 'Le filtre garantit-il l’accès à l’attraction ?',
        answer:
          'Non. Les règles à jour, la mesure et le personnel sur place font foi. La santé, la morphologie, une grossesse ou des modifications techniques peuvent entraîner d’autres restrictions.',
      },
      {
        question: 'Qu’est-ce que le Baby-Switch ?',
        answer:
          'Pour certaines attractions, les accompagnateurs peuvent se relayer. Demandez directement à l’attraction comment la procédure s’applique.',
      },
    ],
  },
  rulanticaGuide: {
    title: 'Préparer Rulantica : journée, soirée ou séjour combiné ?',
    description:
      'Combinez Rulantica et Europa-Park : aide interactive pour choisir billet journée, soirée ou Moonlight, avec enfants, liste à emporter et durée de visite.',
    eyebrow: 'Europa-Park + Rulantica',
    heading: 'Comment intégrer Rulantica à votre court séjour ?',
    answer:
      'Une journée complète à Rulantica est la formule la plus confortable pour les familles et les amateurs de parcs aquatiques. Les billets soirée ou Moonlight conviennent davantage en complément, si l’âge et l’énergie du groupe le permettent.',
    sectionTitle: 'Choisir le créneau du billet selon votre objectif',
    sectionIntro:
      'L’univers aquatique reste normalement ouvert en soirée. L’essentiel est de savoir si Rulantica constitue un objectif principal ou un simple complément après le parc.',
    points: [
      {
        title: 'Billet journée',
        text: 'Davantage de temps pour les espaces enfants, les toboggans, les pauses et les zones extérieures saisonnières, surtout avec une journée dédiée à Rulantica.',
        icon: 'tabler:sun',
      },
      {
        title: 'Soirée ou Moonlight',
        text: 'Moins de temps et généralement un prix plus bas, mais aussi moins d’énergie après une longue journée au parc.',
        icon: 'tabler:moon-stars',
      },
      {
        title: 'Prendre la liste à emporter au sérieux',
        text: 'Vérifiez à l’avance serviette, maillot et règles à jour ; les visiteurs à la journée ne doivent pas compter sur une location spontanée de serviette.',
        icon: 'tabler:backpack',
      },
    ],
    faqs: [
      {
        question: 'Un billet soirée suffit-il pour Rulantica ?',
        answer:
          'Il peut suffire pour quelques toboggans ciblés ou une courte fin de journée. Les familles avec de jeunes enfants et les visiteurs qui souhaitent explorer de nombreux espaces profitent généralement davantage d’une journée complète.',
      },
      {
        question: 'Peut-on faire Europa-Park et Rulantica le même jour ?',
        answer:
          'Techniquement oui, mais la combinaison est fatigante et impose de fortes priorités. L’outil tient compte des jours de parc, des enfants et du rythme souhaité.',
      },
      {
        question: 'Peut-on louer une serviette à Rulantica ?',
        answer:
          'Selon la FAQ officielle, il n’existe pas de location régulière de serviettes pour les visiteurs à la journée. Apportez donc la vôtre et revérifiez la FAQ avant votre visite.',
      },
    ],
  },
  stayGuide: {
    title: 'Où dormir près d’Europa-Park : hôtel, Rust ou alentours',
    description:
      'Comparez les hébergements près d’Europa-Park : hôtel thématique, pension, location de vacances, camping ou communes voisines selon le gain de temps, l’autonomie et le transport.',
    eyebrow: 'Hébergement',
    heading: 'Quel hébergement convient à votre programme ?',
    answer:
      'Le meilleur hébergement ne dépend pas uniquement du prix de la chambre. Comparez l’accès anticipé, les trajets, les transports, l’autonomie, l’annulation et le coût total pour le groupe.',
    sectionTitle: 'Des scénarios plutôt qu’un classement d’hôtels arbitraire',
    sectionIntro:
      'Le comparateur présente des types d’hébergement et les points encore à vérifier. Il n’affiche volontairement ni prix non confirmés ni classement d’établissements.',
    points: [
      {
        title: 'Avantages du Resort',
        text: 'Les hôtels thématiques officiels peuvent proposer une entrée anticipée et une navette ; vérifiez la validité et les attractions ouvertes pour vos dates.',
        icon: 'tabler:sparkles',
      },
      {
        title: 'Rust et l’autonomie',
        text: 'Les pensions et locations peuvent offrir un trajet court ou une cuisine, mais chaque équipement doit être confirmé auprès de l’établissement concerné.',
        icon: 'tabler:building-cottage',
      },
      {
        title: 'Communes voisines et transports',
        text: 'Un prix de chambre inférieur peut être compensé par le parking, le dernier bus et les trajets supplémentaires.',
        icon: 'tabler:bus',
      },
    ],
    faqs: [
      {
        question: 'Les hôtels officiels d’Europa-Park sont-ils toujours le meilleur choix ?',
        answer:
          'Non. Ils sont intéressants si les avantages du Resort et le confort comptent beaucoup. Pour l’autonomie, les grands groupes ou un autre budget, un hébergement indépendant peut mieux convenir.',
      },
      {
        question: 'Le comparateur affiche-t-il les prix actuels des hôtels ?',
        answer:
          'Non. Un prix fiable exige les dates, le nombre de personnes et les conditions de réservation. Le calculateur de budget utilise donc le tarif de nuit que vous avez vous-même vérifié.',
      },
      {
        question: 'Quelles villes regarder en dehors de Rust ?',
        answer:
          'Ringsheim, Herbolzheim et d’autres communes de l’Erlebnisregion peuvent être pertinentes. La liaison précise et le dernier trajet retour le jour de votre visite sont déterminants.',
      },
    ],
  },
  restaurantGuide: {
    title: 'Restaurants à Rust après Europa-Park : annuaire vérifié',
    description:
      'Trouvez où manger à Rust le soir : fiches neutres et sourcées avec type de cuisine, indications de service, incertitudes et liens directs vers les établissements.',
    eyebrow: 'Manger à Rust',
    heading: 'Où manger à Rust après la fermeture du parc ?',
    answer:
      'Cet annuaire n’est pas un palmarès. Il présente des établissements disposant d’une source primaire ou municipale traçable et indique clairement quels horaires, réservations et besoins alimentaires doivent encore être vérifiés directement.',
    sectionTitle: 'Plus utile qu’un classement de restaurants non vérifié',
    sectionIntro:
      'Les horaires et jours de fermeture changent. Nous séparons donc, pour chaque fiche, le profil culinaire vérifié, les indications de service et les questions ouvertes.',
    points: [
      {
        title: 'Des sources plutôt que des étoiles',
        text: 'Nous n’utilisons pas les notes des plateformes comme preuve de qualité ; nous renvoyons vers les sites des établissements et de la commune.',
        icon: 'tabler:source-code',
      },
      {
        title: 'Service du soir clairement indiqué',
        text: 'Le filtre repose uniquement sur des indications de service vérifiées. L’heure réelle de fermeture de la cuisine reste à confirmer le jour même.',
        icon: 'tabler:clock',
      },
      {
        title: 'Aucun filtre alimentaire inventé',
        text: 'Les options véganes, sans gluten ou adaptées aux allergies ne sont proposées que lorsqu’il existe des informations actuelles et solides.',
        icon: 'tabler:salad',
      },
    ],
    faqs: [
      {
        question: 'Les restaurants répertoriés sont-ils recommandés ?',
        answer:
          'Non. Une fiche indique seulement que l’établissement figure dans une source traçable. Le goût, la qualité et la disponibilité des tables n’ont pas été évalués.',
      },
      {
        question: 'Les horaires d’ouverture sont-ils garantis ?',
        answer:
          'Non. Les ouvertures exceptionnelles, congés et horaires de cuisine peuvent changer au dernier moment. Consultez le lien de l’établissement ou appelez avant votre visite.',
      },
      {
        question: 'Pourquoi certaines distances manquent-elles ?',
        answer:
          'Un temps de marche fiable dépend du point de départ réel et de l’itinéraire. Ces valeurs ne seront ajoutées qu’après une vérification cohérente par carte ou sur place.',
      },
    ],
  },
  resortPassGuide: {
    title: 'ResortPass Europa-Park 2026 : disponibilité, prix et règles',
    description:
      'Comprendre ResortPass Silver et Gold : état actuel des ventes, prix, jours de visite, réservation, Rulantica et alerte de disponibilité indépendante.',
    eyebrow: 'Guide ResortPass',
    heading: 'L’essentiel sur le ResortPass Europa-Park',
    answer:
      'Silver et Gold ne sont actuellement pas disponibles à la vente standard, et aucune nouvelle date de vente n’est annoncée. Silver coûte moins cher avec des jours de visite définis ; Gold est plus flexible et inclut des prestations Rulantica supplémentaires.',
    sectionTitle: 'Choisir le pass annuel selon votre usage',
    sectionIntro:
      'Le prix ne suffit pas à décider. Les jours où vous pouvez venir, la flexibilité, l’utilisation de Rulantica et la disponibilité réelle du pass comptent davantage.',
    points: [
      {
        title: 'Vérifier d’abord la disponibilité',
        text: 'Le tracker contrôle régulièrement la billetterie officielle et distingue une disponibilité d’achat réelle des annonces ou files d’attente.',
        icon: 'tabler:bell-ringing',
      },
      {
        title: 'Silver ou Gold',
        text: 'Silver comporte des jours de visite définis ; Gold offre davantage de flexibilité et inclut deux billets journée pour Rulantica.',
        icon: 'tabler:scale',
      },
      {
        title: 'Vérifier les règles dans le portail',
        text: 'Les réservations, jours d’exclusion et conditions contractuelles peuvent évoluer : consultez la source officielle avant tout achat.',
        icon: 'tabler:shield-check',
      },
    ],
    faqs: [
      {
        question: 'Quand les ResortPass seront-ils de nouveau disponibles ?',
        answer:
          'Aucune nouvelle date de vente n’est actuellement annoncée. Le tracker vous alerte lorsque la boutique officielle affiche réellement Silver ou Gold comme achetable.',
      },
      {
        question: 'Combien coûte le ResortPass ?',
        answer:
          'Selon la dernière vérification officielle, Silver coûte 325 euros pour les adultes et 275 euros pour les enfants/seniors ; Gold coûte respectivement 495 et 430 euros.',
      },
      {
        question: 'Le tracker est-il lié à Europa-Park ?',
        answer:
          'Non. Il s’agit d’un projet communautaire indépendant. L’achat, le contrat et les prestations contractuelles passent exclusivement par les fournisseurs officiels.',
      },
    ],
  },
  resortPassCompare: {
    title: 'ResortPass Silver ou Gold ? Comparatif et aide au choix',
    description:
      'Comparez ResortPass Silver et Gold : prix, jours de visite, flexibilité, Rulantica et profils d’utilisation adaptés.',
    eyebrow: 'Silver ou Gold',
    heading: 'Quel ResortPass correspond à vos habitudes de visite ?',
    answer:
      'Silver convient plutôt si les jours définis vous correspondent et si le prix inférieur prime. Gold se justifie davantage si vous recherchez une flexibilité maximale et utilisez réellement les journées Rulantica incluses.',
    sectionTitle: 'Le pass le plus cher n’est pas automatiquement le meilleur',
    sectionIntro:
      'Comparez vos véritables jours de visite et les prestations supplémentaires. Une flexibilité inutilisée ou des billets Rulantica non consommés n’apportent aucune valeur.',
    points: [
      {
        title: 'Silver : moins cher si vous planifiez',
        text: 'Adapté si vous pouvez organiser vos dates tôt et si les jours de visite publiés correspondent à votre calendrier.',
        icon: 'tabler:calendar-check',
      },
      {
        title: 'Gold : davantage de flexibilité',
        text: 'Adapté aux visites plus fréquentes ou spontanées et aux visiteurs qui utiliseront réellement les deux billets journée Rulantica inclus.',
        icon: 'tabler:crown',
      },
      {
        title: 'Comparer avec des billets journée',
        text: 'Estimez votre nombre réel de visites et comparez-le aux billets journée dont les prix varient selon la date.',
        icon: 'tabler:calculator',
      },
    ],
    faqs: [
      {
        question: 'Silver comporte-t-il des jours d’exclusion ?',
        answer:
          'Silver est valable durant des jours d’ouverture définis à l’avance. La liste à jour de la page officielle et du portail ResortPass fait foi.',
      },
      {
        question: 'Gold inclut-il des billets Rulantica ?',
        answer:
          'Selon les informations actuelles de l’exploitant, Gold inclut deux billets journée Rulantica. Revérifiez officiellement les conditions et la réservation avant utilisation.',
      },
      {
        question: 'À partir de combien de visites un pass devient-il rentable ?',
        answer:
          'Cela dépend des dates de visite réelles, du prix des billets journée et des prestations supplémentaires utilisées. Un nombre universel serait trompeur.',
      },
    ],
  },
  resortPassPrices: {
    title: 'Prix ResortPass 2026 : Silver, Gold et billets journée',
    description:
      'Prix actuels du ResortPass pour adultes, enfants et seniors, avec comparaison aux billets journée Europa-Park dont le tarif varie selon la date.',
    eyebrow: 'Prix 2026',
    heading: 'Combien coûtent les ResortPass Silver et Gold ?',
    answer:
      'Dernière vérification officielle : Silver coûte 325 euros pour les adultes et 275 euros pour les enfants/seniors ; Gold coûte respectivement 495 et 430 euros. Les deux pass ne sont actuellement pas disponibles à la vente standard.',
    sectionTitle: 'Évaluer le prix uniquement avec l’usage prévu',
    sectionIntro:
      'Les billets journée ont des prix variables selon la date. La rentabilité d’un pass annuel ne dépend donc pas d’un nombre universel, mais de vos dates réelles.',
    points: [
      {
        title: 'Silver',
        text: '325 euros pour les adultes ; 275 euros pour les enfants de 4 à 11 ans et les seniors dès 60 ans. Tenez compte de la date de la source primaire.',
        icon: 'tabler:circle-letter-s',
      },
      {
        title: 'Gold',
        text: '495 euros pour les adultes ; 430 euros pour les enfants et seniors, avec des prestations supplémentaires telles que deux journées Rulantica.',
        icon: 'tabler:circle-letter-g',
      },
      {
        title: 'La disponibilité reste indispensable',
        text: 'La comparaison de prix n’est utile que si le pass souhaité est réellement en vente. Consultez pour cela le statut en direct.',
        icon: 'tabler:shopping-cart',
      },
    ],
    faqs: [
      {
        question: 'Ces prix s’appliquent-ils en 2026 ?',
        answer:
          'Les montants ont été repris de la billetterie officielle à la date de vérification indiquée. L’exploitant peut modifier les prix et conditions.',
      },
      {
        question: 'Existe-t-il des tarifs réduits ?',
        answer:
          'La page officielle mentionne des tarifs réduits pour les enfants, seniors et certaines catégories éligibles. Les justificatifs et conditions à jour font foi.',
      },
      {
        question: 'Puis-je acheter le ResortPass maintenant ?',
        answer:
          'Silver et Gold sont actuellement indiqués comme indisponibles. Le suivi en direct vous informe si le statut réel de la boutique change.',
      },
    ],
  },
  resortPassReservation: {
    title: 'Réservation ResortPass : jours de visite, portail et hôtels',
    description:
      'Fonctionnement des réservations ResortPass : enregistrer un jour de visite, quotas, réservation d’hôtel et règles actuelles du portail ResortPass.',
    eyebrow: 'Réservation',
    heading: 'Faut-il réserver sa visite avec un ResortPass ?',
    answer:
      'La réservation nécessaire dépend du pass, du jour de visite et des éventuels quotas. Le portail ResortPass et la FAQ officielle font foi ; une réservation d’hôtel ne remplace pas automatiquement toutes les démarches requises.',
    sectionTitle: 'Trois points à vérifier avant le départ',
    sectionIntro:
      'Un pass valide, un jour de visite autorisé et, le cas échéant, une réservation obligatoire sont trois conditions distinctes.',
    points: [
      {
        title: 'Ouvrir le portail du pass',
        text: 'Vérifiez-y la validité, les jours de visite enregistrés et les informations actuelles sur les quotas.',
        icon: 'tabler:login-2',
      },
      {
        title: 'Recouper avec la réservation d’hôtel',
        text: 'Consultez la FAQ à jour pour savoir si et comment les jours de visite sont associés à votre hébergement précis au Resort.',
        icon: 'tabler:hotel-service',
      },
      {
        title: 'Conserver la confirmation',
        text: 'Le jour de la visite, gardez le pass et la preuve de réservation dans l’application officielle ou dans le format prévu.',
        icon: 'tabler:ticket',
      },
    ],
    faqs: [
      {
        question: 'Faut-il réserver chaque visite ?',
        answer:
          'Il n’existe pas de réponse unique pour tous les types de pass et toutes les périodes. Vérifiez la règle actuelle dans le portail ResortPass avant chaque visite.',
      },
      {
        question: 'Une réservation d’hôtel vaut-elle automatiquement réservation du parc ?',
        answer:
          'La FAQ officielle décrit des règles particulières pour les clients hébergés. Ne vous fiez pas à une supposition : vérifiez votre réservation précise dans le portail.',
      },
      {
        question: 'Que se passe-t-il lorsque le quota est épuisé ?',
        answer:
          'La règle actuelle de l’exploitant fait foi. Le tracker de disponibilité surveille les ventes, pas les quotas individuels de jours de visite dans le portail personnel.',
      },
    ],
  },
  resortPassRulantica: {
    title: 'ResortPass et Rulantica : avantages Gold et réservation',
    description:
      'Quelles prestations Rulantica sont incluses dans ResortPass Gold ? Explication des deux billets journée, de la planification, de la réservation et de la différence avec Silver.',
    eyebrow: 'ResortPass + Rulantica',
    heading: 'Que comprend le ResortPass pour Rulantica ?',
    answer:
      'Selon les informations actuelles de l’exploitant, ResortPass Gold comprend deux billets journée Rulantica ; Silver n’en comprend pas. La réservation, la validité et les éventuels quotas doivent être vérifiés officiellement avant la visite.',
    sectionTitle: 'Utiliser réellement les deux journées Rulantica',
    sectionIntro:
      'La prestation n’a de valeur que si les journées incluses correspondent à votre séjour et peuvent être réservées à temps.',
    points: [
      {
        title: 'Planifier l’avantage Gold',
        text: 'Intégrez les deux journées à votre programme annuel au lieu de les considérer comme un bonus improvisé après le parc.',
        icon: 'tabler:droplet-filled',
      },
      {
        title: 'Calculer Silver séparément',
        text: 'Avec Silver, les billets Rulantica doivent être chiffrés séparément et réservés sous réserve de disponibilité.',
        icon: 'tabler:receipt-euro',
      },
      {
        title: 'Vérifier le créneau',
        text: 'Pour les familles, une journée complète à Rulantica est généralement plus intéressante qu’un transfert précipité après une journée entière au parc.',
        icon: 'tabler:clock-hour-8',
      },
    ],
    faqs: [
      {
        question: 'Combien de journées Rulantica Gold inclut-il ?',
        answer:
          'Selon les prestations officielles actuelles, deux billets journée Rulantica. Les conditions en vigueur de l’exploitant s’appliquent avant toute utilisation.',
      },
      {
        question: 'Silver inclut-il Rulantica ?',
        answer:
          'Selon la comparaison actuelle, ce n’est pas une prestation standard incluse. Les billets Rulantica nécessaires doivent être budgétés séparément.',
      },
      {
        question: 'Faut-il réserver les journées incluses ?',
        answer:
          'Consultez la règle de réservation en vigueur dans le portail ResortPass. Rulantica dispose de quotas journaliers limités.',
      },
    ],
  },
};

const visitPlanner: PlanningLocalePack['visitPlanner'] = {
  eyebrow: 'Planificateur de visite interactif',
  title: 'Un programme réaliste pour votre journée',
  intro:
    'Choisissez la durée, le groupe et les conditions de visite. Vous obtenez un ordre de parcours robuste, sans fausse précision à la minute.',
  dateLabel: 'Date de visite',
  daysLabel: 'Jours prévus à Europa-Park',
  days: ['1 jour', '2 jours', '3 jours'],
  groupLabel: 'Priorité du groupe',
  groups: {
    balanced: 'Équilibré',
    family: 'Famille et enfants',
    thrill: 'Montagnes russes et sensations',
    shows: 'Spectacles et rythme tranquille',
  },
  arrivalLabel: 'Arrivée',
  arrivals: {
    early: 'Sur place avant l’ouverture',
    opening: 'À l’ouverture',
    late: 'Après 10 h 30',
  },
  crowdLabel: 'Affluence attendue',
  crowds: {
    low: 'Plutôt faible',
    medium: 'Moyenne',
    high: 'Forte',
  },
  rulanticaLabel: 'Inclure Rulantica',
  submit: 'Créer mon programme',
  resultTitle: 'Votre recommandation',
  resultLead: 'Planifier avec des priorités claires',
  resultDays: 'jours recommandés au total',
  routeLabel: 'Déroulé de la journée',
  morning: 'Matin',
  midday: 'Midi',
  afternoon: 'Après-midi',
  evening: 'Soir',
  notes: {
    early: 'Soyez à l’entrée avant l’ouverture officielle et définissez trois objectifs majeurs.',
    late: 'En cas d’arrivée tardive, un deuxième jour est plus fiable qu’une course surchargée.',
    busy: 'En cas de forte affluence, utilisez les temps d’attente en direct et gardez une alternative par quartier.',
    rulantica: 'Avec de jeunes enfants ou si l’univers aquatique est prioritaire, consacrez plutôt une journée entière à Rulantica.',
    family: 'Prévoyez des plages fixes pour manger et vous reposer, ainsi qu’au moins une solution en intérieur.',
    thrill: 'N’utilisez Single Rider et VirtualLine que s’ils sont effectivement proposés le jour de votre visite.',
    shows: 'Consultez d’abord les horaires des spectacles et construisez le parcours autour de ces rendez-vous fixes.',
  },
  routes: {
    balanced: [
      'Commencez par deux attractions importantes tout en restant dans le même quartier du parc.',
      'Mangez tôt ou tard, puis profitez d’une attraction en intérieur ou d’un spectacle pour une plage plus calme.',
      'Explorez les quartiers voisins et comparez les temps d’attente en direct avant de changer de zone.',
      'Rattrapez une priorité restante, puis vérifiez les boutiques et une éventuelle prolongation des horaires du parc.',
    ],
    family: [
      'Commencez par une attraction familiale adaptée et vérifiez la taille requise à l’entrée.',
      'Prévoyez tôt une pause, un repas et une attraction calme en intérieur ou un spectacle.',
      'Regroupez une aire de jeux et deux autres attractions adaptées à l’âge dans la même moitié du parc.',
      'Laissez l’énergie des enfants décider : mieux vaut un temps fort qu’un sprint final épuisant.',
    ],
    thrill: [
      'Priorisez un grand coaster à l’ouverture sans traverser tout le parc pour une seule attraction.',
      'Vérifiez VirtualLine et Single Rider ; à midi, choisissez une alternative à proximité.',
      'Choisissez le deuxième groupe de coasters selon les temps d’attente en direct et anticipez les pannes techniques.',
      'Planifiez stratégiquement le dernier tour près de la zone où vous souhaitez terminer.',
    ],
    shows: [
      'Consultez le programme des spectacles et choisissez une attraction tranquille sur le chemin du premier rendez-vous.',
      'Associez un repas pris tôt à un spectacle en intérieur ou à une attraction thématique.',
      'Fixez un deuxième horaire de spectacle et limitez-vous aux attractions voisines entre les deux.',
      'Profitez de l’ambiance, de la restauration et d’un dernier tour sans changement de quartier inutile.',
    ],
  },
  disclaimer:
    'Outil de planification sans garantie. Les horaires, temps d’attente, VirtualLine et l’exploitation des attractions peuvent changer au dernier moment.',
  forecastCta: 'Consulter les prévisions d’affluence',
};

const costCalculator: PlanningLocalePack['costCalculator'] = {
  eyebrow: 'Planificateur de budget 2026',
  title: 'Calculer une fourchette de coût réaliste',
  intro:
    'Les fourchettes officielles des billets, plus votre hypothèse d’hébergement. Les repas, le trajet et les options restent volontairement hors du total automatique.',
  adults: 'Adultes dès 12 ans',
  children: 'Enfants de 4 à 11 ans',
  days: 'Europa-Park',
  oneDay: '1 jour',
  twoDays: '2 jours',
  rulantica: 'Rulantica',
  rulanticaOptions: {
    none: 'Ne pas inclure',
    day: 'Billet journée',
    evening: 'Billet soirée dès 17 h',
    moonlight: 'Moonlight dès 19 h',
  },
  parking: 'Parking standard à Europa-Park',
  nights: 'Nuitées',
  lodgingPerNight: 'Hébergement total par nuit',
  calculate: 'Mettre à jour le budget',
  resultEyebrow: 'Votre fourchette de budget',
  total: 'Coût total estimé',
  rangeConnector: 'à',
  perPerson: 'par personne',
  breakdown: 'Détail',
  europaParkTickets: 'Billets Europa-Park',
  rulanticaTickets: 'Billets Rulantica',
  parkingCost: 'Parking',
  lodgingCost: 'Hébergement',
  variableNote: 'Le prix des billets varie selon la date ; cette fourchette ne constitue pas une garantie tarifaire.',
  assumptionNote: 'Ajoutez également les repas, le trajet et les éventuels frais.',
  currency: 'EUR',
};

const familyFinder: PlanningLocalePack['familyFinder'] = {
  eyebrow: 'Filtre famille',
  title: 'Filtrer les attractions par âge et par taille',
  intro:
    'Le filtre s’appuie sur une sélection volontairement limitée et vérifiée officiellement. La décision contraignante revient toujours au personnel sur place.',
  age: 'Âge de l’enfant',
  height: 'Taille de l’enfant',
  interest: 'Centre d’intérêt',
  interests: {
    all: 'Tous les exemples vérifiés',
    calm: 'Calme',
    family: 'Aventure en famille',
    thrill: 'Sensations',
    indoor: 'En intérieur',
  },
  submit: 'Afficher les exemples adaptés',
  resultTitle: 'Sélection vérifiée',
  resultCount: 'attractions affichées',
  eligible: 'Conditions remplies',
  accompanied: 'Accompagnement par un adulte requis',
  notYet: 'Conditions non remplies',
  minimum: 'Minimum',
  years: 'ans',
  centimeters: 'cm',
  indoor: 'En intérieur',
  source: 'Source officielle',
  noResults: 'Aucun exemple d’attraction vérifié ne correspond encore à ce filtre.',
  disclaimer:
    'Accès non garanti. Sur place, les panneaux, la toise, les règles de santé et de sécurité ainsi que les consignes du personnel font foi.',
  officialFilter: 'Vérifier toutes les attractions dans le filtre officiel',
};

const rulanticaPlanner: PlanningLocalePack['rulanticaPlanner'] = {
  eyebrow: 'Aide au choix combiné',
  title: 'Quel billet Rulantica convient à votre séjour ?',
  intro:
    'L’outil pondère les jours à Europa-Park, les enfants, l’importance de l’univers aquatique et le niveau d’énergie. Vous vérifiez ensuite officiellement les prix et disponibilités.',
  parkDays: 'Jours à Europa-Park',
  parkDayOptions: ['1 jour de parc', '2 jours de parc', '3 jours ou plus'],
  children: 'Enfants dans le groupe',
  childOptions: ['Aucun enfant', 'Enfants de moins de 8 ans', 'Enfants plus âgés / adolescents'],
  waterPriority: 'Importance de Rulantica',
  priorityOptions: ['Simple découverte', 'Complément important', 'Objectif principal'],
  energy: 'Rythme souhaité',
  energyOptions: ['Tranquille', 'Équilibré', 'Programme bien rempli'],
  submit: 'Choisir le type de billet',
  resultLabel: 'Recommandation de planification',
  recommendations: {
    day: {
      title: 'Une journée complète à Rulantica',
      text: 'Avec de jeunes enfants ou une forte priorité donnée à l’eau, une journée dédiée laisse assez de temps pour les pauses, les changes et plusieurs espaces.',
    },
    evening: {
      title: 'Le billet soirée en complément',
      text: 'Il convient avec un rythme normal et des choix clairs, mais prévoyez une vraie pause après Europa-Park ainsi que le temps de trajet.',
    },
    moonlight: {
      title: 'Moonlight pour une courte fin de journée',
      text: 'Trois heures conviennent davantage à des visiteurs expérimentés et énergiques ayant peu de priorités qu’à une première visite complète.',
    },
    separate: {
      title: 'Prévoir Rulantica séparément',
      text: 'Avec un rythme tranquille ou un séjour plus long, une plage séparée est plus robuste qu’un transfert après une journée complète au parc.',
    },
  },
  checklistTitle: 'À emporter et à vérifier avant la visite',
  checklist: [
    'Votre propre serviette pour les visiteurs à la journée',
    'Maillot de bain et vêtements de rechange secs',
    'Horaires d’ouverture et périodes de maintenance actuels',
    'Règles d’âge et de taille pour les toboggans souhaités',
    'Réservation, billet et option de casier',
  ],
  officialNote:
    'La FAQ officielle fait foi pour l’entrée, la tenue, les serviettes, les poussettes et les casiers.',
  officialCta: 'Ouvrir la FAQ Rulantica',
};

const stayComparator: PlanningLocalePack['stayComparator'] = {
  eyebrow: 'Comparateur d’hébergements',
  title: 'Quel type d’hébergement convient à votre séjour ?',
  intro:
    'Comparez huit types d’hébergement à partir de caractéristiques vérifiables. Le filtre n’affiche ni classement ni prix non contrôlés : il cible les recherches réellement pertinentes.',
  filtersLabel: 'Filtrer les hébergements',
  scenarioLabel: 'Qu’est-ce qui compte le plus pour vous ?',
  allScenarios: 'Toutes les situations de voyage',
  prioritiesLabel: 'Caractéristiques supplémentaires',
  priorities: {
    operatorGuestBenefits: 'Avantages clients du Resort',
    selfCatering: 'Cuisine et repas en autonomie',
    ownSleepingUnitRequired: 'Équipement de couchage personnel',
    groupFormats: 'Adapté aux groupes',
    walkingAccess: 'Accès au parc à pied',
    shuttleOrTransit: 'Navette ou transports en commun',
  },
  reset: 'Réinitialiser les filtres',
  resultsLabel: 'Types d’hébergement comparables',
  resultSingular: 'type d’hébergement',
  resultPlural: 'types d’hébergement',
  operatorRelation: {
    resort_operated: 'Exploité par Europa-Park Resort',
    independent: 'Établissement indépendant',
  },
  states: {
    verified: 'Vérifié',
    available_for_this_type: 'Disponible pour ce type',
    not_applicable: 'Sans objet',
    varies_by_property: 'Variable selon l’établissement',
    must_verify: 'À vérifier avant de réserver',
  },
  verifyTitle: 'À vérifier concrètement avant de réserver',
  source: 'Ouvrir la source',
  checkedAt: 'Vérifié le',
  emptyTitle: 'Aucun type d’hébergement ne correspond à tous les filtres',
  emptyText:
    'Retirez une caractéristique ou sélectionnez de nouveau toutes les situations de voyage. Un résultat vide ne permet pas de conclure sur un établissement précis.',
  priceNoteTitle: 'Pourquoi aucun prix d’hôtel n’est affiché ici',
  priceNoteText:
    'Les prix d’hébergement évoluent selon les dates, le nombre de personnes, le tarif et les prestations. Choisissez d’abord le type adapté, puis vérifiez le prix final directement auprès de l’établissement.',
  notRanking:
    'L’ordre est neutre : il ne constitue ni un jugement de qualité ni une recommandation rémunérée.',
  noJs:
    'Sans JavaScript, tous les types d’hébergement et toutes les listes de vérification restent visibles ; seuls les filtres interactifs manquent.',
  scenarioLabels: {
    'operator-benefits-priority': 'Privilégier l’entrée anticipée et les transports du Resort',
    'park-and-rulantica-without-car': 'Combiner Europa-Park et Rulantica sans voiture',
    'own-motorhome-or-caravan': 'Venir avec son propre camping-car ou sa caravane',
    'own-tent': 'Dormir dans sa propre tente',
    'large-group-themed-stay': 'Hébergement thématique pour famille, association ou groupe',
    'self-catering-filter': 'Faire de l’autonomie un critère de choix',
    'walkability-filter': 'Filtrer selon le trajet à pied jusqu’à l’entrée principale',
  },
  typeContent: {
    'official-themed-hotel': {
      label: 'Hôtel thématique Europa-Park',
      definition:
        'L’un des six hôtels thématiques 4 étoiles (supérieur) exploités par le Resort.',
      mustVerify: [
        'les avantages applicables aux dates exactes du séjour',
        'les attractions réellement ouvertes durant l’entrée anticipée',
        'la capacité de la chambre et son accessibilité',
        'si les billets d’entrée sont inclus dans la formule choisie ou vendus séparément',
      ],
    },
    'riverside-western-lodge': {
      label: 'Riverside Western Lodge',
      definition:
        'Hébergement en chambre à Silver Lake City avec son propre profil d’avantages clients.',
      mustVerify: [
        'les horaires actuels du bus de Rust',
        'les avantages applicables aux dates exactes du séjour',
        'la capacité de la chambre et son accessibilité',
        'les éventuelles périodes de nuisances sonores liées aux événements à Silver Lake City',
      ],
    },
    'tipi-town': {
      label: 'Tipi Town',
      definition:
        'Hébergements thématiques pour groupes et familles dans des tipis, roulottes, chambres en rondins et Western Houses.',
      mustVerify: [
        'la configuration des sanitaires et des couchages de la catégorie choisie',
        'si le petit-déjeuner est obligatoire ou peut être ajouté',
        'les avantages applicables aux dates exactes du séjour',
        'les éventuelles périodes de nuisances sonores liées aux événements',
        'si la longueur des lits superposés convient aux voyageurs',
      ],
    },
    'official-caravaning': {
      label: 'Europa-Park Caravaning',
      definition:
        'Emplacements à Silver Lake City pour camping-cars et caravanes.',
      mustVerify: [
        'les dimensions du véhicule et la catégorie d’emplacement adaptée',
        'les conditions d’électricité et d’eau de la réservation précise',
        'les horaires d’arrivée, de silence et de départ',
        'les avantages actuels et les horaires du bus de Rust',
      ],
    },
    'official-tent-camping': {
      label: 'Europa-Park Camping',
      definition:
        'Terrain de camping à Silver Lake City pour les visiteurs avec leur propre tente.',
      mustVerify: [
        'les règles relatives aux tentes et aux emplacements',
        'les besoins en électricité et les conditions de branchement',
        'les options de sanitaires et de petit-déjeuner',
        'la météo, les heures de silence et les avantages clients actuels',
      ],
    },
    'independent-hotel-or-guesthouse-rust': {
      label: 'Hôtel ou pension indépendant à Rust',
      definition:
        'Hébergement exploité de façon indépendante sur le territoire de la commune de Rust.',
      mustVerify: [
        'l’ouverture actuelle de l’établissement et les disponibilités de réservation',
        'le véritable itinéraire à pied jusqu’à l’entrée nécessaire',
        'le petit-déjeuner, le parking, l’annulation et l’accessibilité',
        'ne pas supposer la présence d’avantages réservés aux hôtels du Resort',
      ],
    },
    'independent-holiday-apartment-rust': {
      label: 'Location de vacances indépendante à Rust',
      definition:
        'Hébergement indépendant répertorié comme location de vacances par la commune de Rust.',
      mustVerify: [
        'les équipements de cuisine et l’espace repas au lieu de les déduire de la catégorie',
        'le véritable itinéraire à pied jusqu’à l’entrée nécessaire',
        'le séjour minimum, le ménage final, le parking et l’annulation',
        'l’enregistrement actuel et les disponibilités',
      ],
    },
    'accommodation-nearby-municipalities': {
      label: 'Hébergement dans une commune voisine',
      definition:
        'Hébergement indépendant situé hors de Rust, dans une commune de l’Erlebnisregion Europa-Park.',
      mustVerify: [
        'la liaison le jour précis de la semaine et à la fermeture du parc',
        'le dernier trajet retour et les correspondances',
        'le stationnement à destination et sur le lieu d’hébergement',
        'l’ouverture actuelle de l’établissement et les disponibilités de réservation',
      ],
    },
  },
};

const restaurantFinder: PlanningLocalePack['restaurantFinder'] = {
  eyebrow: 'Annuaire vérifié',
  title: 'Comparer objectivement les petits restaurants de Rust',
  intro:
    'Recherchez parmi huit fiches vérifiées par la rédaction. Seules les caractéristiques sourcées sont affichées ; aucune affirmation n’est faite sur la qualité, le niveau de prix ou la disponibilité des tables.',
  filtersLabel: 'Filtrer les restaurants',
  searchLabel: 'Nom ou adresse',
  searchPlaceholder: 'Par exemple Adler ou Fischerstraße',
  statusLabel: 'Statut de vérification',
  allStatuses: 'Tous les statuts',
  statuses: {
    first_party_verified: 'Vérifié auprès de l’établissement',
    public_directory_verified: 'Vérifié dans l’annuaire municipal',
    license_page_verified: 'Vérifié sur une page de licence',
    needs_reverification: 'Nouvelle vérification nécessaire',
  },
  timeLabel: 'Créneau vérifié',
  allTimes: 'Tous les créneaux vérifiés',
  timeSlots: {
    breakfast: 'Petit-déjeuner',
    evening: 'Service du soir',
  },
  distanceLabel: 'Distance vérifiée',
  allDistances: 'Toutes les distances vérifiées',
  distanceOptions: [
    { maxMetres: 500, label: 'Jusqu’à 500 m' },
    { maxMetres: 1000, label: 'Jusqu’à 1 km' },
    { maxMetres: 2000, label: 'Jusqu’à 2 km' },
  ],
  needsLabel: 'Besoins vérifiés',
  familyFeatures: {
    kids_menu: 'Menu enfant mentionné',
  },
  dietFeatures: {
    vegetarian_evidence: 'Options végétariennes vérifiées',
    vegan_evidence: 'Options véganes vérifiées',
    gluten_free_evidence: 'Options sans gluten vérifiées',
  },
  reset: 'Réinitialiser les filtres',
  resultsLabel: 'Fiches d’annuaire vérifiées',
  resultSingular: 'restaurant',
  resultPlural: 'restaurants',
  noJs:
    'Sans JavaScript, toutes les fiches, sources et incertitudes restent lisibles ; seuls la recherche et les filtres manquent.',
  emptyTitle: 'Aucune fiche ne correspond à ces filtres',
  emptyText:
    'Retirez un filtre. L’absence de résultat peut aussi signifier que la caractéristique n’est pas encore suffisamment étayée.',
  serviceEvidence: 'Service vérifié',
  cuisineEvidence: 'Profil culinaire vérifié',
  filterEvidence: 'Justificatif du filtre',
  evidenceCheckedAt: 'Justificatif vérifié',
  source: 'Source primaire',
  operatorWebsite: 'Site de l’établissement',
  corroboratingSource: 'Source complémentaire',
  uncertaintyTitle: 'Ce qui reste à vérifier avant la visite',
  verificationNote: 'Note de vérification',
  checkedAt: 'Fiche vérifiée',
  reviewDue: 'Date de révision dépassée',
  notRecommendation: 'Pas une recommandation',
  notRecommendationTitle: 'Annuaire neutre, pas un palmarès',
  notRecommendationText:
    'La présence et l’ordre des fiches ne constituent pas un jugement de qualité. Vérifiez directement auprès de l’établissement les horaires, la carte, les allergènes et les réservations.',
  unavailableEvidenceTitle: 'Ces filtres sont volontairement masqués',
  unavailableEvidence: {
    time: 'Les créneaux ne sont pas encore documentés de manière suffisamment homogène.',
    distance: 'Les distances n’ont pas encore été mesurées selon un itinéraire cohérent.',
    family: 'Les caractéristiques familiales ne sont pas encore suffisamment étayées.',
    diet: 'Les options végétariennes, véganes et sans gluten ne sont pas encore documentées de manière assez solide.',
  },
  entryContent: {
    'gasthaus-adler-rust': {
      cuisineEvidence: ['cuisine bourgeoise traditionnelle'],
      serviceEvidence: ['service du soir selon le site de l’établissement'],
      verificationNote:
        'Le site de l’établissement et les mentions légales étaient accessibles ; l’adresse, les coordonnées, le profil culinaire et les informations actuelles d’ouverture étaient affichés le jour de la vérification.',
      uncertainties: [
        'Les ouvertures exceptionnelles et congés dépendent de la période.',
        'La disponibilité des réservations n’a pas été vérifiée.',
      ],
    },
    'hardys-rust': {
      cuisineEvidence: [
        'plats régionaux et internationaux',
        'burgers, ribs, pâtes et steaks selon l’établissement',
      ],
      serviceEvidence: [
        'petit-déjeuner selon le site de l’établissement',
        'service du soir selon le site de l’établissement',
      ],
      verificationNote:
        'Le site de l’établissement était accessible et indiquait l’adresse, le type de plats ainsi qu’une offre de petit-déjeuner.',
      uncertainties: [
        'Le statut d’ouverture en direct sur le site peut changer au dernier moment.',
        'La présentation de l’établissement et les avis intégrés n’ont pas été retenus comme preuve de qualité.',
      ],
    },
    'casa-rustica-rust': {
      cuisineEvidence: ['cuisine italienne'],
      serviceEvidence: ['service du soir selon l’annuaire municipal'],
      verificationNote:
        'Le site de l’établissement confirme son activité, son adresse et son restaurant italien ; l’annuaire municipal fournit une plage d’ouverture actuelle.',
      uncertainties: [
        'Confirmer les horaires sur le site de l’établissement ou par téléphone avant la visite.',
        'Le temps de marche jusqu’au parc indiqué par l’établissement n’a pas été mesuré de manière indépendante.',
      ],
    },
    'hotel-restaurant-mythos': {
      cuisineEvidence: ['cuisine grecque et internationale'],
      serviceEvidence: ['menu enfant selon le site de l’établissement'],
      verificationNote:
        'Le site de l’établissement était accessible et confirmait l’adresse, le profil culinaire et les coordonnées de réservation.',
      uncertainties: [
        'Le contenu lisible du site ne mentionne pas d’horaires hebdomadaires stables.',
        'La disponibilité des tables n’a pas été vérifiée.',
      ],
    },
    'kaiserstuehler-hof-rust': {
      cuisineEvidence: ['cuisine badoise', 'plats régionaux'],
      serviceEvidence: ['service du soir selon le site de l’établissement'],
      verificationNote:
        'Le site de l’établissement était accessible et indiquait l’adresse, son profil de cuisine badoise ainsi que le rythme hebdomadaire actuel.',
      uncertainties: [
        'Revérifier les congés et le jour de fermeture avant la visite.',
        'Aucune conclusion sur la prise en charge des allergies sans demande directe.',
      ],
    },
    'restaurant-fenix-rust': {
      cuisineEvidence: ['type de cuisine non clairement précisé dans la source primaire'],
      serviceEvidence: ['service du soir selon le site de l’établissement'],
      verificationNote:
        'Le site de l’établissement et la fiche municipale confirment l’activité, l’adresse et les coordonnées. Les arguments marketing n’ont pas été repris.',
      uncertainties: [
        'Vérifier manuellement le type de cuisine dans la carte actuelle avant toute catégorisation éditoriale.',
        'Le site de l’établissement indique des horaires différents de ceux des plateformes tierces ; seules les informations de l’établissement doivent être utilisées.',
      ],
    },
    'la-terrassa-rust': {
      cuisineEvidence: ['type de cuisine non indiqué dans la fiche municipale'],
      serviceEvidence: ['terrasse selon l’annuaire municipal'],
      verificationNote:
        'Le restaurant figure dans l’annuaire municipal actuel ; le site professionnel lié décrit surtout la pension et ne confirme aucun détail sur le restaurant.',
      uncertainties: [
        'Confirmer directement auprès de l’établissement son activité, le type de cuisine et les horaires.',
        'Ne pas le mettre en avant comme restaurant vérifié par la rédaction avant confirmation directe.',
      ],
    },
    'my-denis-rust': {
      cuisineEvidence: ['type de cuisine non indiqué dans la fiche municipale'],
      serviceEvidence: ['livraison selon l’annuaire municipal'],
      verificationNote:
        'L’établissement n’a été trouvé que dans l’annuaire municipal ; aucun site propre suffisamment fiable n’a été identifié le jour de la vérification.',
      uncertainties: [
        'Confirmer directement l’activité, les coordonnées, le type de cuisine et les horaires.',
        'Ne pas l’inclure dans des recommandations ou classements destinés aux utilisateurs avant une vérification de première main.',
      ],
    },
  },
};

const resortPassTool: PlanningLocalePack['resortPassTool'] = {
  eyebrow: 'Aide au choix ResortPass',
  title: 'Vérifier ensemble le statut, les prestations et le coût réel',
  intro:
    'Le statut en direct répond à la question de l’achat. Le comparatif et le calculateur vous aident ensuite à choisir entre billets journée, Silver et Gold.',
  statusTitle: 'État actuel des ventes',
  statusChecking: 'Vérification du statut…',
  statusAvailable: 'Disponible officiellement maintenant',
  statusUnavailable: 'Actuellement indisponible',
  statusUnknown: 'Statut incertain pour le moment',
  statusError: 'Impossible de charger le statut en direct',
  lastChecked: 'Dernière vérification',
  comparisonTitle: 'Silver et Gold en un coup d’œil',
  feature: 'Caractéristique',
  silver: 'Silver',
  gold: 'Gold',
  adultPrice: 'Prix adulte',
  concessionPrice: 'Enfants de 4 à 11 ans / seniors dès 60 ans',
  visitDays: 'Jours de visite',
  visitDaysSilver: 'Jours de visite définis et publiés',
  visitDaysGold: 'Flexibilité supérieure selon les conditions actuelles',
  rulanticaBenefit: 'Rulantica',
  rulanticaSilver: 'Non inclus dans les prestations standard',
  rulanticaGold: 'Deux billets journée selon les conditions actuelles',
  flexibility: 'Profil de planification',
  flexibilitySilver: 'Pour des dates planifiables à l’avance',
  flexibilityGold: 'Pour des visites plus fréquentes ou spontanées',
  calculatorTitle: 'Comparatif de coût simple pour un adulte',
  calculatorIntro:
    'Comparez les derniers prix de pass vérifiés avec un nombre de visites journée à Europa-Park et Rulantica choisi par vos soins.',
  visitsLabel: 'Visites à Europa-Park',
  rulanticaVisitsLabel: 'Journées à Rulantica',
  priceScenarioLabel: 'Scénario de billet journée',
  lowerPriceScenario: 'Bas de la fourchette vérifiée',
  upperPriceScenario: 'Haut de la fourchette vérifiée',
  calculate: 'Mettre à jour la comparaison',
  dayTicketsCost: 'Billets journée achetés séparément',
  silverCost: 'Silver plus billets Rulantica',
  goldCost: 'Gold avec deux journées Rulantica incluses',
  lowestCost: 'Montant le plus bas selon le calcul',
  estimateDisclaimer:
    'Estimation pour un adulte, sans garantie d’achat ni de disponibilité. Les jours d’exclusion, réservations, réductions, trajets et prestations inutilisées peuvent modifier la décision.',
  linksTitle: 'Répondre directement à la question suivante',
  compareLink: 'Comparer Silver et Gold',
  pricesLink: 'Vérifier les prix ResortPass',
  reservationLink: 'Comprendre la réservation',
  rulanticaLink: 'ResortPass et Rulantica',
};

export const frPlanning: PlanningLocalePack = {
  common,
  navigation,
  pages,
  visitPlanner,
  costCalculator,
  familyFinder,
  rulanticaPlanner,
  stayComparator,
  restaurantFinder,
  resortPassTool,
};
