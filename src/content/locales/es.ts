import type { PlanningLocalePack } from '../planning-types';

export const esPlanning: PlanningLocalePack = {
  common: {
    skip: 'Ir al contenido',
    menu: 'Menú',
    language: 'Elegir idioma',
    home: 'Inicio',
    plannerLabel: 'Planifica tu visita',
    answerLabel: 'Respuesta breve',
    updatedLabel: 'Revisado',
    sourcePrefix: 'Fuente',
    onThisPage: 'En esta página',
    relatedTitle: 'Siguientes pasos recomendados',
    sourcesTitle: 'Fuentes y actualidad',
    sourcesIntro:
      'Los datos que pueden cambiar proceden de fuentes del operador y de organismos públicos. Antes de reservar, vuelve a comprobar precios, horarios y normas en la fuente primaria enlazada.',
    correctionLabel: '¿Hay algún dato incorrecto?',
    correctionText:
      'Avísanos si encuentras información desactualizada. Distinguimos claramente entre hechos documentados, supuestos de cálculo y valoración editorial.',
    unofficial: 'Proyecto comunitario independiente',
    footerText: 'Guía de planificación independiente, sin relación con Europa-Park.',
    overview: 'Resumen',
    tool: 'Herramienta de planificación',
    decisions: 'Ayuda para decidir',
    faq: 'Preguntas frecuentes',
    notRecommendation: 'Ficha informativa, no recomendación',
    verifyBeforeVisit: 'Confírmalo directamente con el proveedor antes de la visita',
  },
  navigation: {
    parkGuide: 'Europa-Park',
    visitPlanner: '1 o 2 días',
    costCalculator: 'Costes',
    familyGuide: 'Familias',
    rulanticaGuide: 'Rulantica',
    stayGuide: 'Alojamiento',
    restaurantGuide: 'Comer en Rust',
    resortPassGuide: 'ResortPass',
  },
  pages: {
    parkGuide: {
      title: 'Planificar Europa-Park: guía independiente con calculadoras',
      description:
        'Planifica tu visita a Europa-Park de forma práctica: 1 o 2 días, costes, familias, Rulantica, alojamiento y restaurantes en Rust, con herramientas interactivas.',
      eyebrow: 'Centro de planificación de Europa-Park',
      heading: 'Planifica Europa-Park según tus necesidades reales',
      answer:
        'Para una primera visita, un día completo es el mínimo; dos días suelen resultar más tranquilos, sobre todo con niños, espectáculos o mucha afluencia. Basa el plan en la fecha, el tipo de grupo y el presupuesto, no en una lista genérica de las 10 mejores atracciones.',
      sectionTitle: 'De una duda a un plan de visita realista',
      sectionIntro:
        'Las herramientas relacionan tu situación con datos actuales. No sustituyen la reserva oficial, pero ayudan a evitar las decisiones equivocadas más importantes antes del viaje.',
      points: [
        {
          title: 'Decide primero el tiempo',
          text: 'Valora la hora de llegada, las atracciones prioritarias y la afluencia prevista para decidir si conviene uno o dos días de parque.',
          icon: 'tabler:calendar-time',
        },
        {
          title: 'Coste total, no solo la entrada',
          text: 'Suma las entradas del parque y Rulantica, el aparcamiento y el alojamiento como un intervalo, no como un falso precio fijo.',
          icon: 'tabler:calculator',
        },
        {
          title: 'Adapta la ruta al grupo',
          text: 'La altura, la edad, la necesidad de pausas y los intereses influyen más en un buen recorrido que los rankings generales.',
          icon: 'tabler:route',
        },
      ],
      faqs: [
        {
          question: '¿Cuántos días hacen falta para visitar Europa-Park?',
          answer:
            'Un día completo puede bastar para una selección de atracciones destacadas. Para quienes van por primera vez, familias, espectáculos y una visita menos apresurada, dos días suelen ser más realistas.',
        },
        {
          question: '¿Esta web es oficial?',
          answer:
            'No. ResortPass Tracker es un proyecto comunitario independiente. Para el acceso, la seguridad y las normas vigentes, consulta siempre la información oficial de Europa-Park.',
        },
        {
          question: '¿Por qué la calculadora muestra intervalos de precios?',
          answer:
            'Europa-Park y Rulantica aplican precios en línea según la fecha. Mientras no elijas un día concreto en la tienda oficial, un intervalo es más honesto.',
        },
      ],
    },
    visitPlanner: {
      title: '¿Europa-Park en 1 o 2 días? Planificador interactivo',
      description:
        '¿Basta un día en Europa-Park? Crea un plan según la fecha, el grupo, la llegada, la afluencia y Rulantica, con un itinerario diario.',
      eyebrow: '1 o 2 días',
      heading: '¿Cuántos días necesitas en Europa-Park?',
      answer:
        'Un día funciona si llegas pronto y tienes prioridades claras. Dos días son la opción más segura para familias, espectáculos y muchas áreas temáticas; con Rulantica, normalmente conviene reservar entre dos y tres días.',
      sectionTitle: 'Qué cambia realmente la duración de la visita',
      sectionIntro:
        'No todos los grupos necesitan la misma ruta. Planifica primero bloques de tiempo y prioridades; las esperas reales definirán el orden exacto el día de la visita.',
      points: [
        {
          title: 'Un día: selecciona bien',
          text: 'Empieza a la hora de apertura, prioriza entre tres y cinco objetivos principales y prepara alternativas en áreas temáticas cercanas.',
          icon: 'tabler:number-1',
        },
        {
          title: 'Dos días: divide el parque',
          text: 'Reparte las grandes atracciones, la oferta familiar y los espectáculos entre dos zonas del parque para reducir trayectos y repeticiones.',
          icon: 'tabler:number-2',
        },
        {
          title: 'Mucha afluencia: deja margen',
          text: 'Reserva tiempo para comer, averías técnicas y desplazamientos. Los tiempos de espera en directo ayudan a reajustar el plan allí mismo.',
          icon: 'tabler:clock-hour-4',
        },
      ],
      faqs: [
        {
          question: '¿Se puede ver Europa-Park en un día?',
          answer:
            'Puedes disfrutar de muchas atracciones destacadas, pero rara vez de todo. El planificador valora la llegada, el grupo y la afluencia y recomienda más tiempo si las condiciones son desfavorables.',
        },
        {
          question: '¿Conviene visitar Rulantica el mismo día?',
          answer:
            'Una entrada de tarde puede encajar con adultos o niños mayores aficionados al agua. Con niños pequeños o si la zona acuática es prioritaria, un día separado resulta más relajado.',
        },
        {
          question: '¿La ruta garantiza los tiempos de espera?',
          answer:
            'No. El tiempo, las averías y la afluencia real pueden cambiar el plan. Consulta la aplicación oficial y los tiempos de espera en directo el día de la visita.',
        },
      ],
    },
    costCalculator: {
      title: 'Calculadora de costes de Europa-Park 2026: entradas, parking y hotel',
      description:
        'Calcula un intervalo realista para Europa-Park con adultos, niños, 1 o 2 días, Rulantica, aparcamiento y alojamiento.',
      eyebrow: 'Coste total',
      heading: '¿Cuánto cuesta en total tu visita a Europa-Park?',
      answer:
        'La entrada es solo una parte del presupuesto. La calculadora combina intervalos de entradas según la fecha con el aparcamiento, Rulantica y tu presupuesto de alojamiento, y muestra deliberadamente un mínimo y un máximo.',
      sectionTitle: 'Cómo convertir los precios en un presupuesto útil',
      sectionIntro:
        'Utilizamos intervalos de precios oficiales, pero no inventamos precios de hotel. El alojamiento, la comida y el viaje se introducen como estimaciones propias.',
      points: [
        {
          title: 'Precios por fecha como intervalo',
          text: 'Sin una fecha concreta de entrada, un intervalo es más fiable que un único precio promocional.',
          icon: 'tabler:arrows-horizontal',
        },
        {
          title: 'Presupuesto familiar por persona',
          text: 'El total y el importe por persona facilitan la comparación entre las opciones de 1 y 2 días.',
          icon: 'tabler:users',
        },
        {
          title: 'Supuestos siempre visibles',
          text: 'El alojamiento y los gastos adicionales aparecen por separado para que puedas sustituir cada supuesto.',
          icon: 'tabler:list-details',
        },
      ],
      faqs: [
        {
          question: '¿Están garantizados los precios de la calculadora?',
          answer:
            'No. Son intervalos de precios oficiales con fecha de revisión. La disponibilidad, la fecha, los gastos de gestión y el canal de reserva pueden cambiar el precio final.',
        },
        {
          question: '¿Por qué no se utiliza un precio medio de hotel?',
          answer:
            'Los precios del alojamiento dependen mucho de la fecha, la ocupación y las condiciones de cancelación. Por eso introduces tú mismo un precio real que hayas comprobado.',
        },
        {
          question: '¿Están incluidas la comida y el viaje?',
          answer:
            'Todavía no se añaden automáticamente. Estos costes varían mucho según el origen y los hábitos, por lo que conviene reservar un margen personal adicional.',
        },
      ],
    },
    familyGuide: {
      title: 'Europa-Park con niños: buscador por altura y plan familiar',
      description:
        'Planifica Europa-Park con bebés, niños pequeños o escolares: filtra atracciones por edad y altura, identifica cuándo necesitan acompañante y organiza pausas.',
      eyebrow: 'Familias y niños',
      heading: '¿Qué atracciones son adecuadas para tu hijo?',
      answer:
        'En muchas atracciones cuentan a la vez la edad y la altura. Usa el buscador como preselección y comprueba siempre allí el medidor, los carteles y las indicaciones del personal.',
      sectionTitle: 'Un plan familiar es más que una lista de atracciones',
      sectionIntro:
        'Las pausas, la comida, los cambios de pañal, hermanos con distinta altura y las posibles normas de acompañamiento influyen en la ruta tanto como las atracciones favoritas.',
      points: [
        {
          title: 'Combina edad y altura',
          text: 'El buscador distingue entre el requisito mínimo y la posible necesidad de un adulto acompañante según las páginas oficiales de cada atracción.',
          icon: 'tabler:ruler-measure',
        },
        {
          title: 'Planifica bloques tranquilos',
          text: 'Las atracciones cubiertas, zonas de juego y espectáculos sirven de descanso entre experiencias más intensas.',
          icon: 'tabler:zzz',
        },
        {
          title: 'Vuelve a comprobarlo allí',
          text: 'Las normas de seguridad pueden cambiar y las indicaciones vinculantes se muestran en la entrada de cada atracción.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: '¿Basta con cumplir la altura?',
          answer:
            'No. Algunas atracciones también exigen una edad mínima o un adulto acompañante hasta determinada edad o altura.',
        },
        {
          question: '¿El buscador garantiza que puede subir?',
          answer:
            'No. Mandan las normas vigentes, la medición y el personal del parque. La salud, la constitución física, el embarazo o cambios técnicos pueden suponer otras limitaciones.',
        },
        {
          question: '¿Qué es Baby-Switch?',
          answer:
            'En determinadas atracciones, las personas responsables del niño pueden turnarse para subir. Pregunta directamente en la atracción cómo funciona en cada caso.',
        },
      ],
    },
    rulanticaGuide: {
      title: 'Planificar Rulantica: ¿día completo, entrada de tarde o combinación?',
      description:
        'Combina Rulantica y Europa-Park: ayuda interactiva para elegir entrada de día, de tarde o Moonlight según los niños, la lista de equipaje y la duración.',
      eyebrow: 'Europa-Park + Rulantica',
      heading: '¿Cómo encaja Rulantica en tu escapada?',
      answer:
        'Un día completo en Rulantica es la opción más relajada para familias y aficionados a los parques acuáticos. Las entradas de tarde o Moonlight encajan mejor como complemento si la edad y la energía del grupo lo permiten.',
      sectionTitle: 'Elige el horario de la entrada según tu objetivo',
      sectionIntro:
        'El parque acuático abre normalmente hasta la tarde-noche. Lo decisivo es si Rulantica es un objetivo principal o solo un extra después del parque.',
      points: [
        {
          title: 'Entrada de día',
          text: 'Más tiempo para zonas infantiles, toboganes, pausas y áreas exteriores de temporada, sobre todo si dedicas un día entero a Rulantica.',
          icon: 'tabler:sun',
        },
        {
          title: 'Tarde o Moonlight',
          text: 'Menos tiempo y normalmente un precio inferior, pero también menos energía disponible después de un día largo en el parque.',
          icon: 'tabler:moon-stars',
        },
        {
          title: 'Presta atención a la lista de equipaje',
          text: 'Lleva toalla y bañador y comprueba con antelación las normas vigentes; los visitantes de un día no deben contar con alquilar una toalla de forma improvisada.',
          icon: 'tabler:backpack',
        },
      ],
      faqs: [
        {
          question: '¿Basta una entrada de tarde para Rulantica?',
          answer:
            'Puede bastar para algunos toboganes o como cierre breve del día. Las familias con niños pequeños y quienes quieran disfrutar de muchas zonas suelen aprovechar mejor un día completo.',
        },
        {
          question: '¿Se pueden visitar Europa-Park y Rulantica el mismo día?',
          answer:
            'Técnicamente sí, pero la combinación es exigente y requiere priorizar mucho. La herramienta tiene en cuenta los días de parque, los niños y el ritmo deseado.',
        },
        {
          question: '¿Se pueden alquilar toallas en Rulantica?',
          answer:
            'Según las preguntas frecuentes oficiales, no existe un servicio habitual de alquiler de toallas para visitantes de un día. Lleva la tuya y vuelve a consultar la información antes de ir.',
        },
      ],
    },
    stayGuide: {
      title: 'Alojamiento cerca de Europa-Park: comparar hotel, Rust y alrededores',
      description:
        'Compara dónde dormir cerca de Europa-Park: hotel temático, pensión, apartamento, camping y alrededores según ahorro de tiempo, cocina y transporte.',
      eyebrow: 'Alojamiento',
      heading: '¿Qué alojamiento encaja con tu plan de visita?',
      answer:
        'El mejor alojamiento no depende solo del precio de la habitación. Compara acceso temprano, distancias, transporte, cocina propia, cancelación y coste total del grupo.',
      sectionTitle: 'Escenarios en vez de un ranking arbitrario de hoteles',
      sectionIntro:
        'La comparativa muestra tipos de alojamiento y aspectos pendientes de comprobar. Evita deliberadamente precios sin confirmar y clasificaciones de establecimientos concretos.',
      points: [
        {
          title: 'Ventajas del resort',
          text: 'Los hoteles temáticos oficiales pueden ofrecer acceso temprano y transporte; comprueba para tu fecha si se aplica y qué atracciones estarán abiertas.',
          icon: 'tabler:sparkles',
        },
        {
          title: 'Rust y alojamiento con cocina',
          text: 'Las pensiones y los apartamentos pueden ofrecer distancias cortas o cocina, pero debes confirmar cada servicio con el establecimiento concreto.',
          icon: 'tabler:building-cottage',
        },
        {
          title: 'Alrededores y transporte',
          text: 'Un precio de habitación inferior puede dejar de compensar al sumar aparcamiento, el último autobús y los trayectos adicionales.',
          icon: 'tabler:bus',
        },
      ],
      faqs: [
        {
          question: '¿Los hoteles oficiales de Europa-Park son siempre la mejor opción?',
          answer:
            'No. Son una buena opción cuando importan las ventajas del resort y la comodidad. Para cocinar, grupos grandes u otro presupuesto, un alojamiento independiente puede encajar mejor.',
        },
        {
          question: '¿La comparativa muestra precios actuales de hoteles?',
          answer:
            'No. Un precio fiable requiere fechas, ocupación y condiciones de reserva. Por eso la calculadora de costes usa el precio de alojamiento que tú hayas comprobado.',
        },
        {
          question: '¿Qué localidades además de Rust conviene considerar?',
          answer:
            'Entre otras, Ringsheim, Herbolzheim y más municipios de la Erlebnisregion. Lo decisivo es la conexión concreta y la última opción de regreso el día de la visita.',
        },
      ],
    },
    restaurantGuide: {
      title: 'Restaurantes en Rust después de Europa-Park: directorio revisado',
      description:
        'Encuentra restaurantes en Rust para cenar: fichas neutrales verificadas con fuentes, tipo de cocina, servicio, incertidumbres y enlaces directos.',
      eyebrow: 'Comer en Rust',
      heading: '¿Dónde puedes cenar en Rust al cerrar el parque?',
      answer:
        'El directorio no es una lista de los mejores. Muestra establecimientos con una fuente primaria o municipal trazable y señala qué horarios, reservas y necesidades alimentarias debes confirmar directamente.',
      sectionTitle: 'Más útil que un ranking de restaurantes sin verificar',
      sectionIntro:
        'Los horarios y días de descanso cambian. Por eso separamos para cada ficha el tipo de cocina documentado, la información de servicio y las cuestiones pendientes.',
      points: [
        {
          title: 'Fuentes en vez de estrellas',
          text: 'No usamos las valoraciones de plataformas como prueba de calidad, sino que enlazamos las páginas del establecimiento y del municipio.',
          icon: 'tabler:source-code',
        },
        {
          title: 'Servicio de cenas visible',
          text: 'El filtro solo usa información de servicio documentada. Aun así, debes confirmar el horario real de cocina el día de la visita.',
          icon: 'tabler:clock',
        },
        {
          title: 'Sin filtros alimentarios inventados',
          text: 'Solo indicamos opciones veganas, sin gluten o aptas para alergias cuando existen datos actuales y fiables.',
          icon: 'tabler:salad',
        },
      ],
      faqs: [
        {
          question: '¿Los restaurantes del directorio son recomendaciones?',
          answer:
            'No. Una ficha solo significa que el establecimiento aparece en una fuente trazable. No hemos valorado el sabor, la calidad ni la disponibilidad de mesas.',
        },
        {
          question: '¿Están garantizados los horarios?',
          answer:
            'No. Las aperturas especiales, vacaciones y horarios de cocina pueden cambiar con poca antelación. Usa el enlace del establecimiento o llama antes de ir.',
        },
        {
          question: '¿Por qué no aparecen las distancias?',
          answer:
            'Un tiempo a pie fiable depende del punto de partida real y de la ruta. Añadiremos esos datos cuando exista una comprobación coherente mediante mapas o sobre el terreno.',
        },
      ],
    },
    resortPassGuide: {
      title: 'Europa-Park ResortPass 2026: disponibilidad, precios y normas',
      description:
        'Entiende ResortPass Silver y Gold: estado de venta, precios, días de visita, reserva, Rulantica y alerta independiente de disponibilidad.',
      eyebrow: 'Guía ResortPass',
      heading: 'Todo lo importante sobre Europa-Park ResortPass',
      answer:
        'Silver y Gold no están disponibles actualmente para la venta habitual y no se ha anunciado una nueva fecha. Silver es más barato y está vinculado a días definidos; Gold es más flexible e incluye ventajas adicionales en Rulantica.',
      sectionTitle: 'Elige el pase anual según el uso',
      sectionIntro:
        'El precio no es lo único que importa. Son más relevantes los posibles días de visita, la flexibilidad, el uso de Rulantica y la disponibilidad real del pase.',
      points: [
        {
          title: 'Primero, la disponibilidad',
          text: 'El rastreador comprueba periódicamente la tienda oficial y distingue la venta real de anuncios o colas de espera.',
          icon: 'tabler:bell-ringing',
        },
        {
          title: 'Silver o Gold',
          text: 'Silver tiene días de visita definidos; Gold ofrece más flexibilidad e incluye dos entradas de día para Rulantica.',
          icon: 'tabler:scale',
        },
        {
          title: 'Comprueba las normas en el portal',
          text: 'Las reservas, los días excluidos y las condiciones pueden cambiar, así que revísalos en la fuente oficial antes de comprar.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: '¿Cuándo volverán a venderse los ResortPass?',
          answer:
            'Actualmente no se ha anunciado una nueva fecha de venta. El rastreador avisa cuando Silver o Gold aparecen realmente disponibles en la tienda oficial.',
        },
        {
          question: '¿Cuánto cuesta ResortPass?',
          answer:
            'Según la última comprobación oficial, Silver cuesta 325 euros para adultos y 275 euros para niños y mayores; Gold cuesta 495 y 430 euros, respectivamente.',
        },
        {
          question: '¿El rastreador está vinculado a Europa-Park?',
          answer:
            'No. Es un proyecto comunitario independiente. La compra, el contrato y las prestaciones vinculantes se gestionan exclusivamente con los proveedores oficiales.',
        },
      ],
    },
    resortPassCompare: {
      title: '¿ResortPass Silver o Gold? Comparativa y ayuda para elegir',
      description:
        'Compara ResortPass Silver y Gold por precio, días de visita, flexibilidad, Rulantica y situaciones de uso.',
      eyebrow: 'Silver frente a Gold',
      heading: '¿Qué ResortPass encaja con tu forma de visitar el parque?',
      answer:
        'Silver encaja mejor si los días definidos te sirven y prima el precio más bajo. Gold compensa más si buscas máxima flexibilidad y vas a utilizar realmente los días de Rulantica incluidos.',
      sectionTitle: 'El pase más caro no es automáticamente mejor',
      sectionIntro:
        'Compara tus días de visita reales y las ventajas adicionales. La flexibilidad o las entradas de Rulantica que no utilices no aportan valor.',
      points: [
        {
          title: 'Silver: menor precio con planificación',
          text: 'Adecuado si puedes fijar las fechas con antelación y los días publicados encajan en tu calendario.',
          icon: 'tabler:calendar-check',
        },
        {
          title: 'Gold: más flexibilidad',
          text: 'Adecuado para visitas espontáneas más frecuentes y para quien vaya a usar las dos entradas de día de Rulantica incluidas.',
          icon: 'tabler:crown',
        },
        {
          title: 'Compara con entradas de día',
          text: 'Calcula el número de visitas que harás realmente y compáralo con los precios de las entradas según la fecha.',
          icon: 'tabler:calculator',
        },
      ],
      faqs: [
        {
          question: '¿Silver tiene días excluidos?',
          answer:
            'Silver es válido en días de apertura definidos previamente. La lista actual de la página oficial y del portal ResortPass es la que cuenta.',
        },
        {
          question: '¿Gold incluye entradas para Rulantica?',
          answer:
            'Según la información actual del operador, Gold incluye dos entradas de día para Rulantica. Confirma oficialmente las condiciones y la reserva antes de usarlas.',
        },
        {
          question: '¿A partir de cuántas visitas compensa un pase?',
          answer:
            'Depende de las fechas reales, los precios de las entradas de día y las ventajas adicionales que utilices. Dar una cifra única sería engañoso.',
        },
      ],
    },
    resortPassPrices: {
      title: 'Precios de ResortPass 2026: Silver, Gold y entradas de día',
      description:
        'Precios actuales de ResortPass para adultos, niños y mayores, comparados con las entradas de día de Europa-Park según la fecha.',
      eyebrow: 'Precios 2026',
      heading: '¿Cuánto cuestan ResortPass Silver y Gold?',
      answer:
        'Última comprobación oficial: Silver, 325 euros para adultos y 275 euros para niños y mayores; Gold, 495 y 430 euros, respectivamente. Ninguno está disponible actualmente para la venta habitual.',
      sectionTitle: 'Valora el precio junto con el uso',
      sectionIntro:
        'Las entradas de día tienen intervalos de precios según la fecha. Por eso un pase anual no compensa a partir de una cifra universal, sino en función de tus fechas reales.',
      points: [
        {
          title: 'Silver',
          text: '325 euros para adultos; 275 euros para niños de 4 a 11 años y personas de 60 años o más. Ten en cuenta la fecha de la fuente primaria.',
          icon: 'tabler:circle-letter-s',
        },
        {
          title: 'Gold',
          text: '495 euros para adultos; 430 euros para niños y mayores, con ventajas adicionales como dos días de Rulantica.',
          icon: 'tabler:circle-letter-g',
        },
        {
          title: 'La disponibilidad es imprescindible',
          text: 'La comparación de precios solo sirve si el pase deseado se vende realmente. Consulta para ello el estado en directo.',
          icon: 'tabler:shopping-cart',
        },
      ],
      faqs: [
        {
          question: '¿Son precios de 2026?',
          answer:
            'Los importes se tomaron de la página oficial de entradas en la fecha de revisión indicada. El operador puede modificar precios y condiciones.',
        },
        {
          question: '¿Hay tarifas especiales?',
          answer:
            'La página oficial indica precios reducidos para niños, mayores y determinadas acreditaciones. Los justificantes y las condiciones vigentes son vinculantes.',
        },
        {
          question: '¿Puedo comprar ResortPass ahora?',
          answer:
            'Silver y Gold figuran actualmente como no disponibles. El rastreador en directo muestra cuándo cambia el estado real de la tienda.',
        },
      ],
    },
    resortPassReservation: {
      title: 'Reservas de visita con ResortPass: días, portal y huéspedes de hotel',
      description:
        'Cómo funcionan las reservas con ResortPass: registrar el día, cupos, reserva de hotel y normas vigentes en el portal.',
      eyebrow: 'Reserva',
      heading: '¿Necesitas reservar tu visita con ResortPass?',
      answer:
        'La reserva concreta depende del pase, el día de visita y los posibles cupos. El portal ResortPass y las preguntas frecuentes oficiales son la referencia; una reserva de hotel no sustituye automáticamente todos los pasos necesarios en todos los casos.',
      sectionTitle: 'Comprueba tres cosas antes de salir',
      sectionIntro:
        'Tener un pase válido, elegir un día permitido y disponer de una reserva cuando sea obligatoria son requisitos distintos.',
      points: [
        {
          title: 'Abre el portal del pase',
          text: 'Comprueba allí la validez, los días de visita registrados y la información actual sobre cupos.',
          icon: 'tabler:login-2',
        },
        {
          title: 'Contrasta la reserva de hotel',
          text: 'Lee en las preguntas frecuentes actuales si los días de visita se vinculan a tu alojamiento concreto en el resort y cómo hacerlo.',
          icon: 'tabler:hotel-service',
        },
        {
          title: 'Guarda la confirmación',
          text: 'Ten preparados el pase y el justificante de reserva en la aplicación oficial o en el formato indicado el día de la visita.',
          icon: 'tabler:ticket',
        },
      ],
      faqs: [
        {
          question: '¿Necesito reservar cada visita?',
          answer:
            'No se puede dar una respuesta general para todos los tipos de pase y periodos. Comprueba la norma vigente en el portal ResortPass antes de cada visita.',
        },
        {
          question: '¿Una reserva de hotel incluye automáticamente la reserva del parque?',
          answer:
            'Las preguntas frecuentes oficiales describen reglas especiales para huéspedes. No te bases en una suposición: contrasta tu reserva concreta en el portal.',
        },
        {
          question: '¿Qué ocurre si se agota el cupo?',
          answer:
            'Se aplica la norma vigente del operador. El rastreador de disponibilidad controla la venta, no los cupos de días de visita en el portal personal.',
        },
      ],
    },
    resortPassRulantica: {
      title: 'ResortPass y Rulantica: ventajas Gold y reserva',
      description:
        '¿Qué ventajas de Rulantica incluye ResortPass Gold? Dos entradas de día, planificación, reserva y diferencias con Silver.',
      eyebrow: 'ResortPass + Rulantica',
      heading: '¿Qué incluye ResortPass para Rulantica?',
      answer:
        'Según la información actual del operador, ResortPass Gold incluye dos entradas de día para Rulantica; Silver no. Debes confirmar oficialmente la reserva, la validez y los posibles cupos antes de la visita.',
      sectionTitle: 'Aprovecha de verdad los dos días de Rulantica',
      sectionIntro:
        'La ventaja solo aporta valor si los días incluidos encajan con tu viaje y puedes reservarlos a tiempo.',
      points: [
        {
          title: 'Planifica la ventaja Gold',
          text: 'Trata los dos días como una parte propia de tu planificación anual, no como un extra improvisado al terminar una jornada de parque.',
          icon: 'tabler:droplet-filled',
        },
        {
          title: 'Calcula Silver por separado',
          text: 'Con Silver, las entradas de Rulantica deben presupuestarse aparte y reservarse según disponibilidad.',
          icon: 'tabler:receipt-euro',
        },
        {
          title: 'Comprueba el tiempo disponible',
          text: 'Para las familias, un día completo en Rulantica suele aportar más que un traslado apresurado después de una jornada entera en el parque.',
          icon: 'tabler:clock-hour-8',
        },
      ],
      faqs: [
        {
          question: '¿Cuántos días de Rulantica incluye Gold?',
          answer:
            'Según las prestaciones oficiales actuales, dos entradas de día para Rulantica. Al utilizarlas se aplican las condiciones vigentes del operador.',
        },
        {
          question: '¿Silver incluye Rulantica?',
          answer:
            'Según la comparativa actual, no como prestación estándar incluida. Debes presupuestar por separado las entradas que necesites.',
        },
        {
          question: '¿Hay que reservar los días incluidos?',
          answer:
            'Consulta la norma de reserva vigente en el portal ResortPass. Rulantica tiene cupos diarios limitados.',
        },
      ],
    },
  },
  visitPlanner: {
    eyebrow: 'Planificador interactivo',
    title: 'Tu jornada realista',
    intro:
      'Elige la duración, el grupo y las condiciones. Obtendrás un orden sólido, no una falsa precisión minuto a minuto.',
    dateLabel: 'Fecha de visita',
    daysLabel: 'Días previstos en el parque',
    days: ['1 día', '2 días', '3 días'],
    groupLabel: 'Prioridad',
    groups: {
      balanced: 'Equilibrado',
      family: 'Familia y niños',
      thrill: 'Montañas rusas y acción',
      shows: 'Espectáculos y ritmo tranquilo',
    },
    arrivalLabel: 'Llegada',
    arrivals: {
      early: 'Antes de la apertura',
      opening: 'A la hora de apertura',
      late: 'Después de las 10:30',
    },
    crowdLabel: 'Afluencia prevista',
    crowds: {
      low: 'Más bien baja',
      medium: 'Media',
      high: 'Alta',
    },
    rulanticaLabel: 'Incluir Rulantica',
    submit: 'Crear plan',
    resultTitle: 'Tu recomendación',
    resultLead: 'Planifica con prioridades claras',
    resultDays: 'días recomendados en total',
    routeLabel: 'Plan del día',
    morning: 'Mañana',
    midday: 'Mediodía',
    afternoon: 'Tarde',
    evening: 'Noche',
    notes: {
      early: 'Llega a la entrada antes de la apertura oficial y define tres objetivos principales.',
      late: 'Si llegas tarde, un segundo día es más seguro que intentar abarcar demasiado deprisa.',
      busy: 'Con mucha afluencia, usa los tiempos de espera en directo y prepara alternativas por zona.',
      rulantica: 'Con niños pequeños o si el agua es prioritaria, trata Rulantica como un día independiente.',
      family: 'Planifica bloques fijos para comer y descansar, además de al menos una alternativa cubierta.',
      thrill: 'Usa Single Rider y VirtualLine solo si están realmente disponibles el día de la visita.',
      shows: 'Consulta primero los horarios de los espectáculos y organiza la ruta alrededor de esas citas.',
    },
    routes: {
      balanced: [
        'Empieza por dos atracciones importantes y permanece en la misma zona del parque.',
        'Come pronto o tarde y usa después una atracción cubierta o un espectáculo como bloque tranquilo.',
        'Recorre áreas temáticas contiguas y compara los tiempos de espera en directo antes de cambiar.',
        'Completa una prioridad pendiente, deja tiempo para recuerdos y comprueba si se amplía el horario del parque.',
      ],
      family: [
        'Empieza por una atracción familiar adecuada y comprueba antes la altura en la entrada.',
        'Planifica una pausa temprana, comida y una atracción cubierta o espectáculo tranquilo.',
        'Combina una zona de juego y otras dos atracciones apropiadas para la edad en la misma mitad del parque.',
        'Deja que mande la energía de los niños: mejor una atracción destacada que un final agotador.',
      ],
      thrill: [
        'Prioriza las montañas rusas principales al abrir y no cruces todo el parque por una sola atracción.',
        'Comprueba VirtualLine y Single Rider; utiliza el mediodía para una alternativa cercana.',
        'Elige el segundo grupo de montañas rusas según las esperas en directo y prevé averías técnicas.',
        'Planifica estratégicamente la última vuelta cerca de la zona donde quieras terminar.',
      ],
      shows: [
        'Consulta el programa y elige una atracción tranquila de camino al primer espectáculo.',
        'Combina una comida temprana con un espectáculo cubierto o una atracción temática.',
        'Fija un segundo espectáculo y, entre ambos, incluye solo atracciones cercanas.',
        'Disfruta del ambiente, la gastronomía y una última atracción sin cambios innecesarios de zona.',
      ],
    },
    disclaimer:
      'Ayuda de planificación sin garantía. Los horarios, las esperas, VirtualLine y el funcionamiento de las atracciones pueden cambiar con poca antelación.',
    forecastCta: 'Consultar previsión de afluencia',
  },
  costCalculator: {
    eyebrow: 'Planificador de presupuesto 2026',
    title: 'Calcula un intervalo de costes realista',
    intro:
      'Intervalos oficiales de entradas más tu estimación de alojamiento. La comida, el viaje y los extras opcionales quedan deliberadamente fuera de la suma automática.',
    adults: 'Adultos desde 12 años',
    children: 'Niños de 4 a 11 años',
    days: 'Europa-Park',
    oneDay: '1 día',
    twoDays: '2 días',
    rulantica: 'Rulantica',
    rulanticaOptions: {
      none: 'No incluir',
      day: 'Entrada de día',
      evening: 'Entrada de tarde desde las 17 h',
      moonlight: 'Moonlight desde las 19 h',
    },
    parking: 'Aparcamiento habitual de Europa-Park',
    nights: 'Noches',
    lodgingPerNight: 'Alojamiento total por noche',
    calculate: 'Actualizar presupuesto',
    resultEyebrow: 'Tu intervalo de costes',
    total: 'Coste total estimado',
    rangeConnector: 'a',
    perPerson: 'por persona',
    breakdown: 'Desglose',
    europaParkTickets: 'Entradas de Europa-Park',
    rulanticaTickets: 'Entradas de Rulantica',
    parkingCost: 'Aparcamiento',
    lodgingCost: 'Alojamiento',
    variableNote: 'Los precios dependen de la fecha; el intervalo no garantiza el precio.',
    assumptionNote: 'Añade también comida, viaje y posibles gastos de gestión.',
    currency: 'EUR',
  },
  familyFinder: {
    eyebrow: 'Buscador familiar',
    title: 'Filtra atracciones por edad y altura',
    intro:
      'El buscador utiliza una selección pequeña y verificada oficialmente. La decisión vinculante corresponde siempre al personal del parque.',
    age: 'Edad del niño',
    height: 'Altura',
    interest: 'Interés',
    interests: {
      all: 'Todos los ejemplos verificados',
      calm: 'Tranquilo',
      family: 'Aventura familiar',
      thrill: 'Acción',
      indoor: 'Cubierto',
    },
    submit: 'Mostrar ejemplos adecuados',
    resultTitle: 'Selección verificada',
    resultCount: 'atracciones mostradas',
    eligible: 'Cumple los requisitos',
    accompanied: 'Necesita un adulto acompañante',
    notYet: 'Todavía no cumple los requisitos',
    minimum: 'Mínimo',
    years: 'años',
    centimeters: 'cm',
    indoor: 'Cubierto',
    source: 'Fuente oficial',
    noResults: 'Todavía no hay una atracción de ejemplo verificada para este filtro.',
    disclaimer:
      'No garantiza el acceso. En el parque mandan el cartel, el medidor, las normas de salud y seguridad y las indicaciones del personal.',
    officialFilter: 'Consulta todas las atracciones en el filtro oficial',
  },
  rulanticaPlanner: {
    eyebrow: 'Ayuda para combinar',
    title: '¿Qué entrada de Rulantica encaja en tu viaje?',
    intro:
      'La herramienta valora los días de parque, los niños, la prioridad del agua y el nivel de energía. Después debes comprobar oficialmente precios y disponibilidad.',
    parkDays: 'Días de Europa-Park',
    parkDayOptions: ['1 día de parque', '2 días de parque', '3 días o más'],
    children: 'Niños en el grupo',
    childOptions: ['Sin niños', 'Niños menores de 8 años', 'Niños mayores/adolescentes'],
    waterPriority: 'Importancia de Rulantica',
    priorityOptions: ['Solo probarlo', 'Complemento importante', 'Objetivo principal'],
    energy: 'Ritmo deseado',
    energyOptions: ['Tranquilo', 'Equilibrado', 'Programa intenso'],
    submit: 'Evaluar el tipo de entrada',
    resultLabel: 'Recomendación de planificación',
    recommendations: {
      day: {
        title: 'Un día completo en Rulantica',
        text: 'Con niños pequeños o si el agua es prioritaria, un día aparte deja tiempo suficiente para pausas, cambiarse y visitar varias zonas.',
      },
      evening: {
        title: 'Entrada de tarde como complemento',
        text: 'Encaja con un ritmo normal y una selección clara, pero reserva una pausa real y tiempo de traslado después de Europa-Park.',
      },
      moonlight: {
        title: 'Moonlight para un cierre breve',
        text: 'Tres horas encajan mejor con visitantes experimentados, enérgicos y con pocas prioridades que con una primera visita completa.',
      },
      separate: {
        title: 'Planifica Rulantica por separado',
        text: 'Con un ritmo tranquilo o un viaje más largo, un bloque independiente es más seguro que ir después de un día completo de parque.',
      },
    },
    checklistTitle: 'Qué llevar y comprobar antes',
    checklist: [
      'Toalla propia para visitantes de un día',
      'Bañador y ropa seca de recambio',
      'Horarios actuales de apertura y mantenimiento',
      'Normas de edad y altura de los toboganes deseados',
      'Reserva, entrada y opción de taquilla',
    ],
    officialNote:
      'Las preguntas frecuentes oficiales son la referencia para el acceso, la ropa, las toallas, los cochecitos y las taquillas.',
    officialCta: 'Abrir las preguntas frecuentes de Rulantica',
  },
  stayComparator: {
    eyebrow: 'Comparador de alojamientos',
    title: '¿Qué tipo de alojamiento encaja con tu viaje?',
    intro:
      'Compara ocho tipos de alojamiento según características documentadas. El buscador no muestra rankings ni precios sin verificar: te ayuda a acotar la búsqueda.',
    filtersLabel: 'Filtrar alojamientos',
    scenarioLabel: '¿Qué es especialmente importante para ti?',
    allScenarios: 'Todas las situaciones de viaje',
    prioritiesLabel: 'Características adicionales',
    priorities: {
      operatorGuestBenefits: 'Ventajas para huéspedes del resort',
      selfCatering: 'Alojamiento con cocina',
      ownSleepingUnitRequired: 'Equipo propio para dormir',
      groupFormats: 'Adecuado para grupos',
      walkingAccess: 'Ir al parque a pie',
      shuttleOrTransit: 'Traslado o transporte público',
    },
    reset: 'Restablecer filtros',
    resultsLabel: 'Tipos de alojamiento comparables',
    resultSingular: 'tipo de alojamiento',
    resultPlural: 'tipos de alojamiento',
    operatorRelation: {
      resort_operated: 'Gestionado por Europa-Park Resort',
      independent: 'Establecimiento independiente',
    },
    states: {
      verified: 'Documentado',
      available_for_this_type: 'Disponible para este tipo',
      not_applicable: 'No corresponde',
      varies_by_property: 'Varía según el alojamiento',
      must_verify: 'Comprobar antes de reservar',
    },
    verifyTitle: 'Qué debes comprobar antes de reservar',
    source: 'Abrir fuente',
    checkedAt: 'Revisado el',
    emptyTitle: 'Ningún tipo de alojamiento cumple todos los filtros',
    emptyText:
      'Quita una característica o vuelve a elegir todas las situaciones de viaje. Un resultado vacío no dice nada sobre establecimientos concretos.',
    priceNoteTitle: 'Por qué no mostramos precios de hotel',
    priceNoteText:
      'Los precios cambian según la fecha, la ocupación, la tarifa y los servicios. Compara primero el tipo adecuado y confirma después el precio final directamente con el proveedor.',
    notRanking:
      'El orden es neutral: no supone una valoración de calidad ni una recomendación pagada.',
    noJs:
      'Sin JavaScript siguen visibles todos los tipos de alojamiento y las listas de comprobación; solo faltan los filtros interactivos.',
    scenarioLabels: {
      'operator-benefits-priority': 'Priorizar el acceso temprano y el transporte del resort',
      'park-and-rulantica-without-car': 'Combinar Europa-Park y Rulantica sin coche propio',
      'own-motorhome-or-caravan': 'Viajar con autocaravana o caravana propia',
      'own-tent': 'Dormir en una tienda propia',
      'large-group-themed-stay': 'Alojamiento temático para familia, asociación o grupo',
      'self-catering-filter': 'Disponer de cocina como criterio de selección',
      'walkability-filter': 'Filtrar por recorrido a pie hasta la entrada principal',
    },
    typeContent: {
      'official-themed-hotel': {
        label: 'Hotel temático de Europa-Park',
        definition:
          'Uno de los seis hoteles temáticos de 4 estrellas (superior) gestionados por el resort.',
        mustVerify: [
          'ventajas disponibles en las fechas concretas del viaje',
          'qué atracciones abren realmente durante el acceso temprano',
          'ocupación de la habitación y accesibilidad',
          'si las entradas están incluidas en el paquete elegido o se compran aparte',
        ],
      },
      'riverside-western-lodge': {
        label: 'Riverside Western Lodge',
        definition:
          'Alojamiento en habitaciones de Silver Lake City con su propio conjunto de ventajas para huéspedes.',
        mustVerify: [
          'horario vigente del autobús de Rust',
          'ventajas disponibles en las fechas concretas del viaje',
          'ocupación de la habitación y accesibilidad',
          'posibles periodos de ruido por eventos en Silver Lake City',
        ],
      },
      'tipi-town': {
        label: 'Tipi Town',
        definition:
          'Alojamientos temáticos para grupos y familias en tipis, carromatos, habitaciones de cabaña y Western Houses.',
        mustVerify: [
          'configuración de baños y dormitorios de la categoría elegida',
          'si el desayuno es obligatorio o se puede añadir',
          'ventajas disponibles en las fechas concretas del viaje',
          'posibles periodos de ruido por eventos',
          'si la longitud de las literas es adecuada para los viajeros',
        ],
      },
      'official-caravaning': {
        label: 'Europa-Park Caravaning',
        definition:
          'Parcelas en Silver Lake City para autocaravanas y caravanas.',
        mustVerify: [
          'dimensiones del vehículo y categoría de parcela adecuada',
          'condiciones de electricidad y agua de la reserva concreta',
          'horarios de llegada, descanso y salida',
          'ventajas actuales y horario del autobús de Rust',
        ],
      },
      'official-tent-camping': {
        label: 'Europa-Park Camping',
        definition:
          'Zona de acampada en Silver Lake City para huéspedes con tienda propia.',
        mustVerify: [
          'normas para tiendas y parcelas',
          'necesidades eléctricas y condiciones de conexión',
          'instalaciones sanitarias y opciones de desayuno',
          'tiempo, horas de descanso y ventajas actuales para huéspedes',
        ],
      },
      'independent-hotel-or-guesthouse-rust': {
        label: 'Hotel o pensión independiente en Rust',
        definition:
          'Alojamiento de un establecimiento independiente dentro del municipio de Rust.',
        mustVerify: [
          'actividad y disponibilidad de reserva actuales',
          'recorrido real a pie hasta la entrada que necesitas',
          'desayuno, aparcamiento, cancelación y accesibilidad',
          'no dar por supuestas las ventajas de los hoteles del resort',
        ],
      },
      'independent-holiday-apartment-rust': {
        label: 'Apartamento turístico independiente en Rust',
        definition:
          'Alojamiento independiente que el municipio de Rust clasifica como apartamento turístico.',
        mustVerify: [
          'equipamiento real de cocina y comedor, sin deducirlo solo de la categoría',
          'recorrido real a pie hasta la entrada que necesitas',
          'estancia mínima, limpieza final, aparcamiento y cancelación',
          'registro y disponibilidad actuales',
        ],
      },
      'accommodation-nearby-municipalities': {
        label: 'Alojamiento en un municipio cercano',
        definition:
          'Alojamiento independiente fuera de Rust, en un municipio de la Erlebnisregion Europa-Park.',
        mustVerify: [
          'conexión el día concreto de la semana y al cerrar el parque',
          'último servicio de vuelta y transbordos',
          'aparcamiento en el destino y el alojamiento',
          'actividad y disponibilidad de reserva actuales',
        ],
      },
    },
  },
  restaurantFinder: {
    eyebrow: 'Directorio verificado',
    title: 'Compara de forma objetiva pequeños restaurantes en Rust',
    intro:
      'Busca entre ocho fichas revisadas editorialmente. Solo mostramos características documentadas; no afirmamos nada sobre calidad, nivel de precios o disponibilidad de mesas.',
    filtersLabel: 'Filtrar restaurantes',
    searchLabel: 'Nombre o dirección',
    searchPlaceholder: 'Por ejemplo, Adler o Fischerstraße',
    statusLabel: 'Estado de verificación',
    allStatuses: 'Todos los estados',
    statuses: {
      first_party_verified: 'Documentado por una fuente del establecimiento',
      public_directory_verified: 'Documentado en el directorio municipal',
      license_page_verified: 'Documentado mediante una página de licencia',
      needs_reverification: 'Necesita una nueva comprobación',
    },
    timeLabel: 'Horario documentado',
    allTimes: 'Todos los horarios documentados',
    timeSlots: {
      breakfast: 'Desayuno',
      evening: 'Servicio de cenas',
    },
    distanceLabel: 'Distancia documentada',
    allDistances: 'Todas las distancias documentadas',
    distanceOptions: [
      { maxMetres: 500, label: 'Hasta 500 m' },
      { maxMetres: 1000, label: 'Hasta 1 km' },
      { maxMetres: 2000, label: 'Hasta 2 km' },
    ],
    needsLabel: 'Necesidades documentadas',
    familyFeatures: {
      kids_menu: 'Menú infantil mencionado',
    },
    dietFeatures: {
      vegetarian_evidence: 'Opciones vegetarianas documentadas',
      vegan_evidence: 'Opciones veganas documentadas',
      gluten_free_evidence: 'Opciones sin gluten documentadas',
    },
    reset: 'Restablecer filtros',
    resultsLabel: 'Fichas revisadas',
    resultSingular: 'restaurante',
    resultPlural: 'restaurantes',
    noJs:
      'Sin JavaScript siguen legibles todas las fichas, fuentes e incertidumbres; solo faltan la búsqueda y los filtros.',
    emptyTitle: 'Ninguna ficha coincide con estos filtros',
    emptyText:
      'Quita un filtro. La ausencia de resultados también puede significar que la característica aún no está suficientemente documentada.',
    serviceEvidence: 'Oferta documentada',
    cuisineEvidence: 'Tipo de cocina documentado',
    filterEvidence: 'Evidencia del filtro',
    evidenceCheckedAt: 'Evidencia del filtro revisada',
    source: 'Fuente primaria',
    operatorWebsite: 'Web del establecimiento',
    corroboratingSource: 'Fuente adicional',
    uncertaintyTitle: 'Qué queda por comprobar antes de ir',
    verificationNote: 'Nota de verificación',
    checkedAt: 'Ficha revisada',
    reviewDue: 'Fecha de revisión vencida',
    notRecommendation: 'No es una recomendación',
    notRecommendationTitle: 'Directorio neutral, no lista de los mejores',
    notRecommendationText:
      'La inclusión y el orden no valoran la calidad. Confirma directamente con el establecimiento los horarios, la carta, los alérgenos y la reserva.',
    unavailableEvidenceTitle: 'Filtros que omitimos de forma deliberada',
    unavailableEvidence: {
      time: 'Los horarios todavía no están documentados de forma suficientemente uniforme.',
      distance: 'Las distancias todavía no se han medido con una ruta coherente.',
      family: 'Las características familiares todavía no están suficientemente documentadas.',
      diet: 'Las opciones vegetarianas, veganas y sin gluten todavía no están registradas con suficiente fiabilidad.',
    },
    entryContent: {
      'gasthaus-adler-rust': {
        cuisineEvidence: ['cocina tradicional casera'],
        serviceEvidence: ['servicio de cenas según la web del establecimiento'],
        verificationNote:
          'La web y el aviso legal del establecimiento eran accesibles; mostraban dirección, contacto, tipo de cocina e información actual de apertura en la fecha de revisión.',
        uncertainties: [
          'Las aperturas especiales y vacaciones dependen de la fecha.',
          'No se comprobó la disponibilidad de reservas.',
        ],
      },
      'hardys-rust': {
        cuisineEvidence: [
          'platos regionales e internacionales',
          'hamburguesas, costillas, pasta y bistec según el establecimiento',
        ],
        serviceEvidence: [
          'desayuno según la web del establecimiento',
          'servicio de cenas según la web del establecimiento',
        ],
        verificationNote:
          'La web del establecimiento era accesible y mencionaba la dirección, el tipo de comida y la oferta de desayuno.',
        uncertainties: [
          'El estado de apertura en directo de la web puede cambiar con poca antelación.',
          'La autopresentación y las reseñas insertadas no se utilizaron como prueba de calidad.',
        ],
      },
      'casa-rustica-rust': {
        cuisineEvidence: ['cocina italiana'],
        serviceEvidence: ['servicio de cenas según el directorio municipal'],
        verificationNote:
          'La web del establecimiento confirma la actividad, la dirección y el restaurante italiano; el directorio municipal ofrece un marco actual de horarios.',
        uncertainties: [
          'Confirma los horarios en la web del establecimiento o por teléfono antes de ir.',
          'El tiempo a pie hasta el parque indicado por el establecimiento no se midió de forma independiente.',
        ],
      },
      'hotel-restaurant-mythos': {
        cuisineEvidence: ['cocina griega e internacional'],
        serviceEvidence: ['menú infantil según la web del establecimiento'],
        verificationNote:
          'La web del establecimiento era accesible y confirmó la dirección, el tipo de cocina y el contacto para reservas.',
        uncertainties: [
          'El contenido legible de la web no indica horarios semanales estables.',
          'No se comprobó la disponibilidad de mesas.',
        ],
      },
      'kaiserstuehler-hof-rust': {
        cuisineEvidence: ['cocina de Baden', 'platos regionales'],
        serviceEvidence: ['servicio de cenas según la web del establecimiento'],
        verificationNote:
          'La web del establecimiento era accesible e indicaba la dirección, el perfil de cocina de Baden y el horario semanal actual.',
        uncertainties: [
          'Vuelve a comprobar las vacaciones y el día de descanso antes de ir.',
          'No afirmamos que sea apto para alergias sin consultarlo directamente.',
        ],
      },
      'restaurant-fenix-rust': {
        cuisineEvidence: ['la fuente primaria no define con claridad el tipo de cocina'],
        serviceEvidence: ['servicio de cenas según la web del establecimiento'],
        verificationNote:
          'La web del establecimiento y la ficha municipal confirman la actividad, la dirección y el contacto. No se han adoptado afirmaciones publicitarias.',
        uncertainties: [
          'Comprueba manualmente el tipo de cocina en la carta actual antes de clasificarlo editorialmente.',
          'La web del establecimiento muestra horarios distintos a los de plataformas externas; utiliza solo los datos del establecimiento.',
        ],
      },
      'la-terrassa-rust': {
        cuisineEvidence: ['el directorio municipal no indica el tipo de cocina'],
        serviceEvidence: ['terraza según el directorio municipal'],
        verificationNote:
          'El restaurante figura en el directorio municipal actual; la web enlazada describe principalmente la pensión y no confirma detalles del restaurante.',
        uncertainties: [
          'Confirma directamente la actividad, el tipo de cocina y los horarios.',
          'No lo destaques como restaurante revisado editorialmente hasta obtener una confirmación directa.',
        ],
      },
      'my-denis-rust': {
        cuisineEvidence: ['el directorio municipal no indica el tipo de cocina'],
        serviceEvidence: ['reparto según el directorio municipal'],
        verificationNote:
          'Solo aparece en el directorio municipal; en la fecha de revisión no se encontró una web propia fiable.',
        uncertainties: [
          'Confirma directamente la actividad, el contacto, el tipo de cocina y los horarios.',
          'No lo incluyas en recomendaciones o rankings para usuarios hasta verificar una fuente directa.',
        ],
      },
    },
  },
  resortPassTool: {
    eyebrow: 'Ayuda para elegir ResortPass',
    title: 'Comprueba a la vez el estado, las ventajas y el coste real',
    intro:
      'El estado en directo responde a la pregunta de si se puede comprar. Después, la comparativa y la calculadora ayudan a decidir entre entradas de día, Silver y Gold.',
    statusTitle: 'Estado actual de venta',
    statusChecking: 'Comprobando el estado…',
    statusAvailable: 'Disponible oficialmente ahora',
    statusUnavailable: 'No disponible actualmente',
    statusUnknown: 'Estado incierto en este momento',
    statusError: 'No se pudo cargar el estado en directo',
    lastChecked: 'Última comprobación',
    comparisonTitle: 'Silver y Gold de un vistazo',
    feature: 'Característica',
    silver: 'Silver',
    gold: 'Gold',
    adultPrice: 'Precio para adultos',
    concessionPrice: 'Niños de 4 a 11 / personas a partir de 60 años',
    visitDays: 'Días de visita',
    visitDaysSilver: 'Días de visita definidos y publicados',
    visitDaysGold: 'Mayor flexibilidad según las condiciones vigentes',
    rulanticaBenefit: 'Rulantica',
    rulanticaSilver: 'No incluido como prestación estándar',
    rulanticaGold: 'Dos entradas de día según las condiciones vigentes',
    flexibility: 'Perfil de planificación',
    flexibilitySilver: 'Para fechas que puedes planificar con antelación',
    flexibilityGold: 'Para visitas más frecuentes o espontáneas',
    calculatorTitle: 'Comparativa sencilla de costes para adultos',
    calculatorIntro:
      'Compara los últimos precios documentados de los pases con el número de visitas de día a Europa-Park y Rulantica que tú elijas.',
    visitsLabel: 'Visitas a Europa-Park',
    rulanticaVisitsLabel: 'Visitas de día a Rulantica',
    priceScenarioLabel: 'Escenario de precio de entradas de día',
    lowerPriceScenario: 'Extremo inferior del intervalo documentado',
    upperPriceScenario: 'Extremo superior del intervalo documentado',
    calculate: 'Actualizar comparativa',
    dayTicketsCost: 'Entradas de día individuales',
    silverCost: 'Silver más entradas para Rulantica',
    goldCost: 'Gold con dos días de Rulantica incluidos',
    lowestCost: 'Importe mínimo calculado',
    estimateDisclaimer:
      'Orientación para una persona adulta, sin garantía de compra ni disponibilidad. Los días excluidos, las reservas, los descuentos, el viaje y las prestaciones no utilizadas pueden cambiar la decisión.',
    linksTitle: 'Resuelve directamente la siguiente duda',
    compareLink: 'Comparar Silver y Gold',
    pricesLink: 'Consultar precios de ResortPass',
    reservationLink: 'Entender la reserva',
    rulanticaLink: 'ResortPass y Rulantica',
  },
};
