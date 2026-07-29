import type { PlanningLocalePack } from '../planning-types';

export const ptPlanning = {
  common: {
    skip: 'Saltar para o conteúdo',
    menu: 'Menu',
    language: 'Escolher idioma',
    home: 'Página inicial',
    plannerLabel: 'Planear a visita',
    answerLabel: 'Resposta rápida',
    updatedLabel: 'Verificado',
    sourcePrefix: 'Fonte',
    onThisPage: 'Nesta página',
    relatedTitle: 'Próximos passos úteis',
    sourcesTitle: 'Fontes e atualidade',
    sourcesIntro:
      'Os dados sujeitos a alterações provêm de fontes do operador e de entidades públicas. Antes de reservar, confirme novamente preços, horários e regras na fonte primária indicada.',
    correctionLabel: 'Encontrou algum erro?',
    correctionText:
      'Avise-nos se encontrar informações desatualizadas. Distinguimos claramente factos comprovados, pressupostos de cálculo e avaliação editorial.',
    unofficial: 'Projeto comunitário independente',
    footerText: 'Guia de planeamento independente — sem ligação ao Europa-Park.',
    overview: 'Visão geral',
    tool: 'Ferramenta de planeamento',
    decisions: 'Ajuda à decisão',
    faq: 'Perguntas frequentes',
    notRecommendation: 'Entrada de diretório, não uma recomendação',
    verifyBeforeVisit: 'Confirmar diretamente com o fornecedor antes da visita',
  },
  navigation: {
    parkGuide: 'Europa-Park',
    visitPlanner: '1 ou 2 dias',
    costCalculator: 'Custos',
    familyGuide: 'Famílias',
    rulanticaGuide: 'Rulantica',
    stayGuide: 'Alojamento',
    restaurantGuide: 'Comer em Rust',
    resortPassGuide: 'ResortPass',
  },
  pages: {
    parkGuide: {
      title: 'Planear o Europa-Park: guia independente com calculadoras',
      description:
        'Planeie a visita ao Europa-Park de forma prática: 1 ou 2 dias, custos, família, Rulantica, alojamento e restaurantes em Rust — com ferramentas interativas.',
      eyebrow: 'Centro de planeamento do Europa-Park',
      heading: 'Planeie o Europa-Park de acordo com as suas necessidades reais',
      answer:
        'Para uma primeira visita, um dia completo é o mínimo; dois dias costumam ser mais tranquilos, sobretudo com crianças, espetáculos ou muita afluência. Baseie o plano na data, no tipo de grupo e no orçamento, em vez de numa lista genérica das 10 melhores atrações.',
      sectionTitle: 'Da pergunta a um plano de visita realista',
      sectionIntro:
        'As ferramentas relacionam a sua situação com dados atuais. Não substituem uma reserva oficial, mas ajudam a evitar as decisões erradas mais importantes antes da viagem.',
      points: [
        {
          title: 'Definir primeiro o tempo disponível',
          text: 'Considere a hora de chegada, as atrações prioritárias e a afluência prevista para decidir se faz sentido passar um ou dois dias no parque.',
          icon: 'tabler:calendar-time',
        },
        {
          title: 'Custo total, não apenas o bilhete',
          text: 'Some os bilhetes do parque e do Rulantica, o estacionamento e o alojamento — como intervalo, não como um falso preço fixo.',
          icon: 'tabler:calculator',
        },
        {
          title: 'Adaptar o percurso ao grupo',
          text: 'A altura, a idade, a necessidade de pausas e os interesses determinam uma boa sequência mais do que qualquer classificação geral.',
          icon: 'tabler:route',
        },
      ],
      faqs: [
        {
          question: 'Quantos dias devo reservar para o Europa-Park?',
          answer:
            'Um dia completo pode chegar para alguns destaques selecionados. Para uma primeira visita, famílias, espetáculos e um percurso menos apressado, dois dias costumam ser mais realistas.',
        },
        {
          question: 'Este site é oficial?',
          answer:
            'Não. O ResortPass Tracker é um projeto comunitário independente. Para entradas, segurança e regras atualizadas, prevalecem sempre as informações oficiais do Europa-Park.',
        },
        {
          question: 'Porque é que a calculadora mostra intervalos de preços?',
          answer:
            'O Europa-Park e o Rulantica utilizam preços online dependentes da data. Enquanto não for escolhida uma data concreta na bilheteira oficial, um intervalo é mais honesto.',
        },
      ],
    },
    visitPlanner: {
      title: 'Europa-Park em 1 ou 2 dias? Planeador interativo da visita',
      description:
        'Um dia no Europa-Park é suficiente? Crie um plano com base na data, no grupo, na chegada, na afluência e no Rulantica — incluindo um percurso diário.',
      eyebrow: '1 ou 2 dias',
      heading: 'De quantos dias precisa no Europa-Park?',
      answer:
        'Um dia pode resultar se chegar cedo e tiver prioridades claras. Dois dias são a opção mais segura para famílias, espetáculos e muitas áreas temáticas; com o Rulantica, dois a três dias costumam fazer mais sentido.',
      sectionTitle: 'O que realmente altera a duração da visita',
      sectionIntro:
        'Nem todos os grupos precisam do mesmo percurso. Planeie primeiro blocos de tempo e prioridades; os tempos de espera reais só definirão a ordem exata no próprio dia.',
      points: [
        {
          title: 'Um dia: escolher com rigor',
          text: 'Comece à hora de abertura, dê prioridade a três a cinco objetivos principais e tenha alternativas em áreas temáticas próximas.',
          icon: 'tabler:number-1',
        },
        {
          title: 'Dois dias: dividir por zonas',
          text: 'Distribua as grandes atrações, as opções familiares e os espetáculos por duas metades do parque para reduzir deslocações e repetições.',
          icon: 'tabler:number-2',
        },
        {
          title: 'Muita afluência: deixar margem',
          text: 'Reserve tempo para refeições, avarias técnicas e deslocações. Os tempos de espera em direto ajudam a ajustar o plano no local.',
          icon: 'tabler:clock-hour-4',
        },
      ],
      faqs: [
        {
          question: 'É possível conhecer o Europa-Park num só dia?',
          answer:
            'É possível fazer muitas das atrações principais, mas raramente todas. O planeador avalia a chegada, o grupo e a afluência e aumenta a duração recomendada quando as condições são desfavoráveis.',
        },
        {
          question: 'Devo visitar o Rulantica no mesmo dia?',
          answer:
            'Um bilhete de final de tarde pode adequar-se a adultos ou crianças mais velhas que gostam muito de água. Com crianças pequenas ou se o parque aquático for prioritário, um dia separado é mais tranquilo.',
        },
        {
          question: 'O percurso garante tempos de espera?',
          answer:
            'Não. O tempo, as avarias e a afluência real podem alterar o plano do dia. Consulte a aplicação oficial e os tempos de espera em direto no dia da visita.',
        },
      ],
    },
    costCalculator: {
      title: 'Calculadora de custos do Europa-Park 2026: bilhetes, estacionamento e hotel',
      description:
        'Calcule um intervalo de custos realista para o Europa-Park com adultos, crianças, 1 ou 2 dias, Rulantica, estacionamento e alojamento.',
      eyebrow: 'Custo total',
      heading: 'Quanto custa, no total, a sua visita ao Europa-Park?',
      answer:
        'A entrada é apenas uma parte do orçamento. A calculadora combina intervalos de preços dependentes da data com estacionamento, Rulantica e o seu orçamento de alojamento, apresentando deliberadamente um valor mínimo e máximo.',
      sectionTitle: 'Como transformar preços num orçamento útil',
      sectionIntro:
        'Utilizamos intervalos de preços oficiais, mas não inventamos preços de hotel. O alojamento, a alimentação e a viagem são introduzidos como pressupostos próprios.',
      points: [
        {
          title: 'Preços por data como intervalo',
          text: 'Sem uma data concreta, um intervalo é mais fiável do que um único preço promocional.',
          icon: 'tabler:arrows-horizontal',
        },
        {
          title: 'Orçamento familiar por pessoa',
          text: 'O total e o valor por pessoa facilitam a comparação entre as opções de 1 e 2 dias.',
          icon: 'tabler:users',
        },
        {
          title: 'Pressupostos sempre visíveis',
          text: 'O alojamento e os custos adicionais são apresentados em separado para que possa substituir cada pressuposto.',
          icon: 'tabler:list-details',
        },
      ],
      faqs: [
        {
          question: 'Os preços da calculadora são garantidos?',
          answer:
            'Não. São intervalos de preços oficiais com uma data de verificação. A disponibilidade, a data da visita, as taxas de processamento e o canal de reserva podem alterar o preço final.',
        },
        {
          question: 'Porque não é utilizado um preço médio de hotel?',
          answer:
            'Os preços de alojamento dependem muito da data, da ocupação e das condições de cancelamento. Por isso, deve introduzir um preço real que tenha verificado.',
        },
        {
          question: 'A alimentação e a viagem estão incluídas?',
          answer:
            'Ainda não são incluídas automaticamente. Estes custos variam muito conforme a origem e os hábitos e devem ser considerados como uma margem pessoal adicional.',
        },
      ],
    },
    familyGuide: {
      title: 'Europa-Park com crianças: filtro de altura e plano familiar',
      description:
        'Planeie o Europa-Park com bebé, criança pequena ou criança em idade escolar: filtre atrações por idade e altura, identifique regras de acompanhamento e organize pausas.',
      eyebrow: 'Famílias e crianças',
      heading: 'Que atrações são adequadas para a sua criança?',
      answer:
        'Nas atrações, muitas vezes contam em conjunto a idade e a altura. Use o filtro como pré-seleção e confirme sempre no local a régua de medição, a sinalização e as instruções da equipa.',
      sectionTitle: 'Um plano familiar precisa de mais do que uma lista de atrações',
      sectionIntro:
        'As pausas, a alimentação, a troca de fraldas, irmãos de alturas diferentes e possíveis regras de acompanhamento influenciam o percurso tanto como as atrações preferidas.',
      points: [
        {
          title: 'Combinar idade e altura',
          text: 'O filtro distingue os requisitos mínimos de uma possível necessidade de acompanhamento por um adulto, com base nas páginas oficiais de cada atração.',
          icon: 'tabler:ruler-measure',
        },
        {
          title: 'Planear blocos tranquilos',
          text: 'Atrações interiores, zonas de brincar e espetáculos são boas pausas entre experiências mais intensas.',
          icon: 'tabler:zzz',
        },
        {
          title: 'Confirmar novamente no local',
          text: 'As regras de segurança podem mudar e são apresentadas de forma vinculativa à entrada de cada atração.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'A altura, por si só, é suficiente?',
          answer:
            'Não. Algumas atrações têm também uma idade mínima ou exigem um adulto acompanhante até determinada idade ou altura.',
        },
        {
          question: 'O filtro pode garantir a entrada na atração?',
          answer:
            'Não. As regras atuais, a medição e a equipa no local são determinantes. Saúde, constituição física, gravidez ou alterações técnicas podem implicar outras limitações.',
        },
        {
          question: 'O que é o Baby-Switch?',
          answer:
            'Em atrações selecionadas, os acompanhantes podem alternar-se para tomar conta da criança. O procedimento concreto deve ser confirmado diretamente na atração.',
        },
      ],
    },
    rulanticaGuide: {
      title: 'Planear o Rulantica: dia completo, bilhete de tarde ou combinação?',
      description:
        'Combine o Rulantica com o Europa-Park: ferramenta interativa para escolher bilhete diário, de tarde ou Moonlight, com crianças, lista de bagagem e duração da visita.',
      eyebrow: 'Europa-Park + Rulantica',
      heading: 'Como encaixar o Rulantica na sua escapadinha?',
      answer:
        'Um dia inteiro no Rulantica é a opção mais tranquila para famílias e fãs de parques aquáticos. Os bilhetes de tarde ou Moonlight funcionam melhor como complemento quando a idade e a energia do grupo o permitem.',
      sectionTitle: 'Escolher o horário do bilhete de acordo com o objetivo',
      sectionIntro:
        'O parque aquático está normalmente aberto até à noite. A questão principal é saber se o Rulantica é um objetivo central ou apenas um complemento depois do parque.',
      points: [
        {
          title: 'Bilhete diário',
          text: 'Mais tempo para zonas infantis, escorregas, pausas e áreas exteriores sazonais — sobretudo num dia dedicado ao Rulantica.',
          icon: 'tabler:sun',
        },
        {
          title: 'Tarde ou Moonlight',
          text: 'Menos tempo e, geralmente, um preço inferior, mas também menos energia disponível depois de um longo dia no parque.',
          icon: 'tabler:moon-stars',
        },
        {
          title: 'Levar a lista de bagagem a sério',
          text: 'Confirme antecipadamente toalha, roupa de banho e regras atuais; visitantes diários não devem contar com aluguer espontâneo de toalhas.',
          icon: 'tabler:backpack',
        },
      ],
      faqs: [
        {
          question: 'Um bilhete de tarde é suficiente para o Rulantica?',
          answer:
            'Pode ser suficiente para alguns escorregas ou para terminar o dia. Famílias com crianças pequenas e visitantes que pretendam conhecer muitas áreas beneficiam geralmente de um dia inteiro.',
        },
        {
          question: 'É possível fazer o Europa-Park e o Rulantica no mesmo dia?',
          answer:
            'Tecnicamente sim, mas a combinação é exigente e requer prioridades muito claras. A ferramenta considera os dias de parque, as crianças e o ritmo pretendido.',
        },
        {
          question: 'É possível alugar toalhas no Rulantica?',
          answer:
            'Segundo as perguntas frequentes oficiais, não existe aluguer regular de toalhas para visitantes diários. Leve a sua própria toalha e volte a confirmar a informação antes da visita.',
        },
      ],
    },
    stayGuide: {
      title: 'Alojamento no Europa-Park: comparar hotel, Rust e arredores',
      description:
        'Compare alojamentos junto ao Europa-Park: hotel temático, pensão, apartamento, campismo e arredores por tempo poupado, refeições próprias e transporte.',
      eyebrow: 'Alojamento',
      heading: 'Que alojamento se adequa ao seu plano de visita?',
      answer:
        'O melhor alojamento não depende apenas do preço do quarto. Compare entrada antecipada, percursos, transporte, refeições próprias, cancelamento e o custo total do grupo.',
      sectionTitle: 'Cenários em vez de uma classificação arbitrária de hotéis',
      sectionIntro:
        'A comparação mostra tipos de alojamento e questões que ainda precisam de confirmação. Deliberadamente, não apresenta preços não verificados nem classifica estabelecimentos.',
      points: [
        {
          title: 'Vantagens do resort',
          text: 'Os hotéis temáticos oficiais podem oferecer entrada antecipada e serviço de transporte; confirme a validade e as atrações abertas para a data escolhida.',
          icon: 'tabler:sparkles',
        },
        {
          title: 'Rust e refeições próprias',
          text: 'Pensões e apartamentos podem oferecer percursos curtos ou cozinha — cada equipamento deve ser confirmado no alojamento concreto.',
          icon: 'tabler:building-cottage',
        },
        {
          title: 'Arredores e transporte',
          text: 'Um preço de quarto inferior pode ser anulado pelo estacionamento, pelo horário do último autocarro e por deslocações adicionais.',
          icon: 'tabler:bus',
        },
      ],
      faqs: [
        {
          question: 'Os hotéis oficiais do Europa-Park são sempre a melhor opção?',
          answer:
            'Não. São uma boa escolha quando as vantagens do resort e o conforto são prioritários. Para refeições próprias, grupos maiores ou outro orçamento, um alojamento independente pode ser mais adequado.',
        },
        {
          question: 'A comparação mostra preços atuais de hotéis?',
          answer:
            'Não. Preços fiáveis exigem datas, ocupação e condições de reserva. Por isso, a calculadora de custos utiliza um preço por noite que o utilizador tenha confirmado.',
        },
        {
          question: 'Que localidades, além de Rust, são relevantes?',
          answer:
            'Entre outras, Ringsheim, Herbolzheim e outros municípios da Erlebnisregion. O que importa é a ligação concreta e a última viagem de regresso no dia da visita.',
        },
      ],
    },
    restaurantGuide: {
      title: 'Restaurantes em Rust depois do Europa-Park: diretório verificado',
      description:
        'Encontre restaurantes em Rust para o jantar: entradas neutras e verificadas em fontes, com tipo de cozinha, indicações de serviço, incertezas e ligações diretas.',
      eyebrow: 'Comer em Rust',
      heading: 'Onde comer em Rust depois do fecho do parque?',
      answer:
        'O diretório não é uma lista dos melhores. Mostra estabelecimentos com uma fonte primária ou municipal rastreável e indica que horários, reservas e necessidades alimentares ainda devem ser confirmados diretamente.',
      sectionTitle: 'Mais útil do que uma classificação de restaurantes não verificada',
      sectionIntro:
        'Os horários e dias de descanso mudam. Por isso, distinguimos o perfil culinário comprovado, as indicações de serviço e as questões em aberto de cada entrada.',
      points: [
        {
          title: 'Fontes em vez de estrelas',
          text: 'Não usamos avaliações de plataformas como prova de qualidade; ligamos às páginas dos operadores e do município.',
          icon: 'tabler:source-code',
        },
        {
          title: 'Serviço ao jantar visível',
          text: 'Um filtro utiliza apenas indicações de serviço comprovadas. Mesmo assim, o horário real da cozinha deve ser confirmado no dia da visita.',
          icon: 'tabler:clock',
        },
        {
          title: 'Sem filtros alimentares inventados',
          text: 'As opções veganas, sem glúten ou adequadas a alergias só são indicadas quando existem informações atuais e fiáveis.',
          icon: 'tabler:salad',
        },
      ],
      faqs: [
        {
          question: 'Os restaurantes listados são recomendações?',
          answer:
            'Não. Uma entrada significa apenas que o estabelecimento foi encontrado numa fonte rastreável. O sabor, a qualidade e a disponibilidade de mesas não foram avaliados.',
        },
        {
          question: 'Os horários estão garantidos?',
          answer:
            'Não. Aberturas especiais, férias e horários da cozinha podem mudar com pouca antecedência. Use a ligação do operador ou telefone antes da visita.',
        },
        {
          question: 'Porque faltam informações sobre distâncias?',
          answer:
            'Um tempo de caminhada fiável depende do ponto de partida real e do percurso. Esses valores só serão acrescentados após uma verificação consistente no mapa ou no local.',
        },
      ],
    },
    resortPassGuide: {
      title: 'Europa-Park ResortPass 2026: disponibilidade, preços e regras',
      description:
        'Compreenda o ResortPass Silver e Gold: estado atual das vendas, preços, dias de visita, reserva, Rulantica e alerta independente de disponibilidade.',
      eyebrow: 'Guia ResortPass',
      heading: 'Tudo o que precisa de saber sobre o Europa-Park ResortPass',
      answer:
        'Atualmente, Silver e Gold não estão regularmente disponíveis e não foi anunciada uma nova data de venda. Silver é mais barato e está limitado a dias de visita definidos; Gold é mais flexível e inclui benefícios adicionais no Rulantica.',
      sectionTitle: 'Escolher o passe anual conforme a utilização',
      sectionIntro:
        'O preço, por si só, não decide. Os dias de visita possíveis, a flexibilidade, a utilização do Rulantica e a disponibilidade real do passe são mais relevantes.',
      points: [
        {
          title: 'Começar pela disponibilidade',
          text: 'O monitor verifica regularmente a bilheteira oficial e distingue a possibilidade real de compra de anúncios ou filas de espera.',
          icon: 'tabler:bell-ringing',
        },
        {
          title: 'Silver ou Gold',
          text: 'Silver tem dias de visita definidos; Gold oferece mais flexibilidade e inclui dois bilhetes diários para o Rulantica.',
          icon: 'tabler:scale',
        },
        {
          title: 'Confirmar regras no portal',
          text: 'Reservas, dias excluídos e condições contratuais podem mudar e devem ser confirmados na fonte oficial antes da compra.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Quando voltarão a estar disponíveis os passes ResortPass?',
          answer:
            'Atualmente não foi anunciada uma nova data de venda. O monitor avisa quando a loja oficial mostrar que Silver ou Gold podem realmente ser comprados.',
        },
        {
          question: 'Quanto custa o ResortPass?',
          answer:
            'Segundo a última informação oficial verificada, Silver custa 325 euros para adultos e 275 euros para crianças/seniores; Gold custa 495 e 430 euros, respetivamente.',
        },
        {
          question: 'O monitor está ligado ao Europa-Park?',
          answer:
            'Não. É um projeto comunitário independente. A compra, o contrato e as prestações vinculativas são tratados exclusivamente pelos fornecedores oficiais.',
        },
      ],
    },
    resortPassCompare: {
      title: 'ResortPass Silver ou Gold? Comparação e ajuda à decisão',
      description:
        'Compare o ResortPass Silver e Gold: preço, dias de visita, flexibilidade, Rulantica e cenários de utilização adequados.',
      eyebrow: 'Silver ou Gold',
      heading: 'Que ResortPass se adequa ao seu padrão de visitas?',
      answer:
        'Silver é mais adequado se os dias definidos forem compatíveis consigo e o preço inferior for importante. Gold compensa mais quando precisa da máxima flexibilidade e utiliza realmente os dias de Rulantica incluídos.',
      sectionTitle: 'O passe mais caro não é automaticamente o melhor',
      sectionIntro:
        'Compare os seus dias de visita reais e os serviços adicionais. Flexibilidade ou bilhetes para o Rulantica que não utiliza não geram valor.',
      points: [
        {
          title: 'Silver: mais económico com planeamento',
          text: 'Adequado se puder planear as datas com antecedência e os dias publicados forem compatíveis com o seu calendário.',
          icon: 'tabler:calendar-check',
        },
        {
          title: 'Gold: mais flexibilidade',
          text: 'Adequado para visitas espontâneas mais frequentes e para quem vai realmente utilizar os dois bilhetes diários de Rulantica incluídos.',
          icon: 'tabler:crown',
        },
        {
          title: 'Comparar com bilhetes diários',
          text: 'Utilize o número esperado de visitas reais e compare-o com os preços dos bilhetes diários dependentes da data.',
          icon: 'tabler:calculator',
        },
      ],
      faqs: [
        {
          question: 'Silver tem dias excluídos?',
          answer:
            'Silver é válido em dias de abertura definidos antecipadamente. A lista atual na página oficial e no portal ResortPass é determinante.',
        },
        {
          question: 'Gold inclui bilhetes para o Rulantica?',
          answer:
            'Segundo a informação atual do operador, Gold inclui dois bilhetes diários para o Rulantica. Confirme novamente as condições e a reserva antes de os utilizar.',
        },
        {
          question: 'A partir de quantas visitas compensa um passe?',
          answer:
            'Depende das datas efetivas, dos preços dos bilhetes diários e dos benefícios adicionais utilizados. Indicar um número universal de visitas seria enganador.',
        },
      ],
    },
    resortPassPrices: {
      title: 'Preços ResortPass 2026: comparação Silver, Gold e bilhetes diários',
      description:
        'Preços atuais do ResortPass para adultos, crianças e seniores, comparados com os bilhetes diários do Europa-Park dependentes da data.',
      eyebrow: 'Preços 2026',
      heading: 'Quanto custam o ResortPass Silver e Gold?',
      answer:
        'Última verificação oficial: Silver 325 euros para adultos e 275 euros para crianças/seniores; Gold 495 e 430 euros, respetivamente. Atualmente, nenhum dos passes está regularmente disponível.',
      sectionTitle: 'Avaliar o preço sempre em conjunto com a utilização',
      sectionIntro:
        'Os bilhetes diários têm intervalos de preços dependentes da data. Por isso, um passe anual não compensa a partir de um número universal, mas sim em função das suas datas reais.',
      points: [
        {
          title: 'Silver',
          text: '325 euros para adultos; 275 euros para crianças dos 4–11 anos e seniores a partir dos 60 anos — consulte a data da fonte primária.',
          icon: 'tabler:circle-letter-s',
        },
        {
          title: 'Gold',
          text: '495 euros para adultos; 430 euros para crianças e seniores, incluindo benefícios adicionais como dois dias no Rulantica.',
          icon: 'tabler:circle-letter-g',
        },
        {
          title: 'A disponibilidade é um requisito',
          text: 'Uma comparação de preços só é útil quando o passe pretendido está realmente à venda. Consulte o estado em direto.',
          icon: 'tabler:shopping-cart',
        },
      ],
      faqs: [
        {
          question: 'Os preços são válidos para 2026?',
          answer:
            'Os valores foram recolhidos da página oficial de bilhetes na data de verificação indicada. O operador pode alterar preços e condições.',
        },
        {
          question: 'Existem tarifas especiais?',
          answer:
            'A página oficial indica preços reduzidos para crianças, seniores e determinadas condições. Os comprovativos e as condições atuais são vinculativos.',
        },
        {
          question: 'Posso comprar o ResortPass agora?',
          answer:
            'Silver e Gold aparecem atualmente como indisponíveis. O monitor em direto mostra quando o estado real da loja mudar.',
        },
      ],
    },
    resortPassReservation: {
      title: 'Reserva ResortPass: dias de visita, portal e hóspedes de hotel',
      description:
        'Como funcionam as reservas ResortPass: registar o dia de visita, contingentes, reserva de hotel e regras atuais no portal ResortPass.',
      eyebrow: 'Reserva',
      heading: 'É necessário reservar a visita com o ResortPass?',
      answer:
        'A reserva concreta depende do passe, do dia de visita e de eventuais contingentes. O portal ResortPass e as perguntas frequentes oficiais são determinantes; uma reserva de hotel nem sempre substitui automaticamente todos os passos necessários.',
      sectionTitle: 'Três pontos a confirmar antes da viagem',
      sectionIntro:
        'Um passe válido, um dia de visita permitido e uma eventual reserva obrigatória são condições distintas.',
      points: [
        {
          title: 'Abrir o portal do passe',
          text: 'Confirme aí a validade, os dias de visita registados e as informações atuais sobre contingentes.',
          icon: 'tabler:login-2',
        },
        {
          title: 'Conferir a reserva do hotel',
          text: 'Leia nas perguntas frequentes atuais se e como os dias de visita estão ligados ao alojamento concreto no resort.',
          icon: 'tabler:hotel-service',
        },
        {
          title: 'Guardar o comprovativo',
          text: 'Tenha o passe e o comprovativo de reserva disponíveis na aplicação oficial ou no formato previsto no dia da visita.',
          icon: 'tabler:ticket',
        },
      ],
      faqs: [
        {
          question: 'Preciso de uma reserva para cada visita?',
          answer:
            'Não existe uma resposta universal para todos os passes e períodos. Confirme a regra atual no portal ResortPass antes de cada visita.',
        },
        {
          question: 'Uma reserva de hotel inclui automaticamente a reserva do parque?',
          answer:
            'As perguntas frequentes oficiais descrevem regras especiais para hóspedes. Não parta de pressupostos; confira a reserva concreta no portal.',
        },
        {
          question: 'O que acontece quando o contingente está esgotado?',
          answer:
            'Aplica-se a regra atual do operador. O monitor de disponibilidade controla as vendas, não os contingentes individuais de dias de visita no portal pessoal.',
        },
      ],
    },
    resortPassRulantica: {
      title: 'ResortPass e Rulantica: benefícios Gold e reserva',
      description:
        'Que benefícios do Rulantica inclui o ResortPass Gold? Explicação sobre dois bilhetes diários, planeamento, reserva e diferença face ao Silver.',
      eyebrow: 'ResortPass + Rulantica',
      heading: 'O que inclui o ResortPass no Rulantica?',
      answer:
        'Segundo a informação atual do operador, o ResortPass Gold inclui dois bilhetes diários para o Rulantica; Silver não. A reserva, a validade e possíveis contingentes devem ser confirmados oficialmente antes da visita.',
      sectionTitle: 'Utilizar realmente os dois dias de Rulantica',
      sectionIntro:
        'O benefício só tem valor se os dias incluídos forem compatíveis com a sua viagem e puderem ser reservados a tempo.',
      points: [
        {
          title: 'Planear o benefício Gold',
          text: 'Trate os dois dias como parte própria do seu plano anual, não como um extra espontâneo ao fim de um dia no parque.',
          icon: 'tabler:droplet-filled',
        },
        {
          title: 'Calcular Silver em separado',
          text: 'Com Silver, os bilhetes para o Rulantica devem ser calculados em separado e reservados mediante disponibilidade.',
          icon: 'tabler:receipt-euro',
        },
        {
          title: 'Confirmar a janela horária',
          text: 'Para famílias, um dia inteiro no Rulantica costuma valer mais do que uma mudança apressada depois de um dia completo no parque.',
          icon: 'tabler:clock-hour-8',
        },
      ],
      faqs: [
        {
          question: 'Quantos dias de Rulantica inclui Gold?',
          answer:
            'Segundo os benefícios oficiais atuais, inclui dois bilhetes diários para o Rulantica. Antes da utilização, aplicam-se as condições atuais do operador.',
        },
        {
          question: 'Silver inclui Rulantica?',
          answer:
            'Segundo a comparação atual, não como benefício padrão incluído. Os bilhetes necessários para o Rulantica devem ser calculados em separado.',
        },
        {
          question: 'É necessário reservar os dias incluídos?',
          answer:
            'Confirme a regra de reserva atual no portal ResortPass. O Rulantica tem contingentes diários limitados.',
        },
      ],
    },
  },
  visitPlanner: {
    eyebrow: 'Planeador interativo da visita',
    title: 'Um plano diário realista',
    intro:
      'Escolha a duração, o grupo e as condições da visita. Receberá uma sequência robusta — não uma falsa precisão ao minuto.',
    dateLabel: 'Data da visita',
    daysLabel: 'Dias de parque planeados',
    days: ['1 dia', '2 dias', '3 dias'],
    groupLabel: 'Prioridade',
    groups: {
      balanced: 'Equilibrado',
      family: 'Família e crianças',
      thrill: 'Montanhas-russas e ação',
      shows: 'Espetáculos e ritmo tranquilo',
    },
    arrivalLabel: 'Chegada',
    arrivals: {
      early: 'No local antes da abertura',
      opening: 'À hora de abertura',
      late: 'Depois das 10:30',
    },
    crowdLabel: 'Afluência prevista',
    crowds: {
      low: 'Mais baixa',
      medium: 'Média',
      high: 'Alta',
    },
    rulanticaLabel: 'Incluir o Rulantica',
    submit: 'Criar plano',
    resultTitle: 'A sua recomendação',
    resultLead: 'Planear com prioridades claras',
    resultDays: 'dias recomendados no total',
    routeLabel: 'Plano do dia',
    morning: 'Manhã',
    midday: 'Meio-dia',
    afternoon: 'Tarde',
    evening: 'Noite',
    notes: {
      early: 'Esteja à entrada antes da abertura oficial e defina três objetivos principais.',
      late: 'Com uma chegada tardia, um segundo dia é mais seguro do que um sprint sobrecarregado.',
      busy: 'Com muita afluência, use os tempos de espera em direto e tenha alternativas por área.',
      rulantica: 'Com crianças pequenas ou elevada prioridade à água, é melhor tratar o Rulantica como um dia próprio.',
      family: 'Planeie blocos fixos para refeições e descanso, além de pelo menos uma alternativa interior.',
      thrill: 'Use Single Rider e VirtualLine apenas se estiverem realmente disponíveis no dia da visita.',
      shows: 'Consulte primeiro os horários dos espetáculos e organize o percurso em torno dessas horas fixas.',
    },
    routes: {
      balanced: [
        'Comece por duas atrações importantes e permaneça na mesma área do parque.',
        'Coma cedo ou tarde e use depois uma atração interior ou um espetáculo como bloco tranquilo.',
        'Percorra áreas temáticas próximas e compare os tempos de espera em direto antes de mudar.',
        'Conclua uma prioridade em falta e confirme compras e um possível prolongamento do horário do parque.',
      ],
      family: [
        'Comece por uma atração familiar adequada e confirme previamente a altura à entrada.',
        'Planeie uma pausa cedo, uma refeição e uma atração interior ou espetáculo tranquilo.',
        'Combine uma zona de brincar e mais duas atrações adequadas à idade na mesma metade do parque.',
        'Deixe a energia das crianças decidir; é melhor um destaque do que um fim de dia exausto.',
      ],
      thrill: [
        'Dê prioridade às montanhas-russas principais à abertura e não atravesse o parque por uma única atração.',
        'Confirme VirtualLine e Single Rider; use o meio-dia para uma alternativa próxima.',
        'Escolha o segundo grupo de montanhas-russas de acordo com os tempos de espera em direto e conte com possíveis avarias técnicas.',
        'Planeie estrategicamente a última volta perto da área onde pretende terminar.',
      ],
      shows: [
        'Consulte o programa e escolha uma atração tranquila no caminho para o primeiro espetáculo.',
        'Combine uma refeição cedo com um espetáculo interior ou uma atração temática.',
        'Defina um segundo espetáculo e, entre ambos, planeie apenas atrações próximas.',
        'Desfrute do ambiente, da gastronomia e de uma última atração sem mudanças desnecessárias de zona.',
      ],
    },
    disclaimer:
      'Ferramenta de planeamento sem garantia. Horários, tempos de espera, VirtualLine e funcionamento das atrações podem mudar com pouca antecedência.',
    forecastCta: 'Consultar previsão de afluência',
  },
  costCalculator: {
    eyebrow: 'Planeador de orçamento 2026',
    title: 'Calcular um intervalo de custos realista',
    intro:
      'Intervalos oficiais de bilhetes mais o seu pressuposto de alojamento. Alimentação, viagem e extras opcionais ficam deliberadamente fora da soma automática.',
    adults: 'Adultos a partir dos 12',
    children: 'Crianças dos 4–11',
    days: 'Europa-Park',
    oneDay: '1 dia',
    twoDays: '2 dias',
    rulantica: 'Rulantica',
    rulanticaOptions: {
      none: 'Não incluir',
      day: 'Bilhete diário',
      evening: 'Bilhete de tarde a partir das 17 h',
      moonlight: 'Moonlight a partir das 19 h',
    },
    parking: 'Estacionamento normal no Europa-Park',
    nights: 'Noites',
    lodgingPerNight: 'Alojamento total por noite',
    calculate: 'Atualizar orçamento',
    resultEyebrow: 'O seu intervalo de custos',
    total: 'Custo total estimado',
    rangeConnector: 'a',
    perPerson: 'por pessoa',
    breakdown: 'Discriminação',
    europaParkTickets: 'Bilhetes do Europa-Park',
    rulanticaTickets: 'Bilhetes do Rulantica',
    parkingCost: 'Estacionamento',
    lodgingCost: 'Alojamento',
    variableNote: 'Os preços dos bilhetes dependem da data; o intervalo não é uma garantia de preço.',
    assumptionNote: 'Considere adicionalmente alimentação, viagem e taxas.',
    currency: 'EUR',
  },
  familyFinder: {
    eyebrow: 'Filtro para famílias',
    title: 'Filtrar atrações por idade e altura',
    intro:
      'O filtro utiliza uma seleção deliberadamente pequena e oficialmente verificada. A decisão vinculativa cabe sempre à equipa no local.',
    age: 'Idade da criança',
    height: 'Altura',
    interest: 'Interesse',
    interests: {
      all: 'Todos os exemplos verificados',
      calm: 'Tranquilo',
      family: 'Aventura em família',
      thrill: 'Ação',
      indoor: 'Interior',
    },
    submit: 'Mostrar exemplos adequados',
    resultTitle: 'Seleção verificada',
    resultCount: 'atrações apresentadas',
    eligible: 'Requisito cumprido',
    accompanied: 'É necessário um adulto acompanhante',
    notYet: 'Requisito ainda não cumprido',
    minimum: 'Mínimo',
    years: 'anos',
    centimeters: 'cm',
    indoor: 'Interior',
    source: 'Fonte oficial',
    noResults: 'Ainda não existe uma atração de exemplo verificada para este filtro.',
    disclaimer:
      'Não garante a utilização. No local, prevalecem a sinalização, a régua de medição, as regras de saúde e segurança e as instruções da equipa.',
    officialFilter: 'Consultar todas as atrações no filtro oficial',
  },
  rulanticaPlanner: {
    eyebrow: 'Ajuda para combinar',
    title: 'Que bilhete do Rulantica se adequa à sua viagem?',
    intro:
      'A ferramenta pondera os dias de parque, as crianças, a prioridade da água e o nível de energia. Depois, confirme oficialmente os preços e a disponibilidade.',
    parkDays: 'Dias no Europa-Park',
    parkDayOptions: ['1 dia de parque', '2 dias de parque', '3 ou mais dias'],
    children: 'Crianças no grupo',
    childOptions: ['Sem crianças', 'Crianças com menos de 8 anos', 'Crianças mais velhas/adolescentes'],
    waterPriority: 'Importância do Rulantica',
    priorityOptions: ['Apenas experimentar', 'Complemento importante', 'Objetivo principal'],
    energy: 'Ritmo pretendido',
    energyOptions: ['Tranquilo', 'Equilibrado', 'Programa completo'],
    submit: 'Avaliar o tipo de bilhete',
    resultLabel: 'Recomendação de planeamento',
    recommendations: {
      day: {
        title: 'Um dia inteiro no Rulantica',
        text: 'Com crianças pequenas ou alta prioridade à água, um dia próprio oferece tempo suficiente para pausas, mudanças de roupa e várias áreas.',
      },
      evening: {
        title: 'Bilhete de tarde como complemento',
        text: 'Adequado a um ritmo normal e a uma seleção clara — mas planeie uma verdadeira pausa e o tempo de deslocação depois do Europa-Park.',
      },
      moonlight: {
        title: 'Moonlight para um final curto',
        text: 'Três horas adequam-se mais a visitantes experientes e enérgicos, com poucas prioridades, do que a uma primeira visita completa.',
      },
      separate: {
        title: 'Planear o Rulantica em separado',
        text: 'Com um ritmo tranquilo ou numa viagem mais longa, um bloco separado é mais seguro do que mudar depois de um dia completo no parque.',
      },
    },
    checklistTitle: 'Levar e confirmar antes da visita',
    checklist: [
      'Toalha própria para visitantes diários',
      'Roupa de banho e roupa seca para mudar',
      'Horários atuais de abertura e manutenção',
      'Regras de idade e altura para os escorregas pretendidos',
      'Reserva, bilhete e opção de cacifo',
    ],
    officialNote:
      'As perguntas frequentes oficiais são determinantes para entrada, vestuário, toalhas, carrinhos de bebé e cacifos.',
    officialCta: 'Abrir as perguntas frequentes do Rulantica',
  },
  stayComparator: {
    eyebrow: 'Comparação de alojamentos',
    title: 'Que tipo de alojamento se adequa à sua viagem?',
    intro:
      'Compare oito tipos de alojamento por características comprováveis. O filtro não mostra classificações nem preços não verificados — apenas restringe a pesquisa útil.',
    filtersLabel: 'Filtrar alojamentos',
    scenarioLabel: 'O que é especialmente importante para si?',
    allScenarios: 'Todas as situações de viagem',
    prioritiesLabel: 'Características adicionais',
    priorities: {
      operatorGuestBenefits: 'Vantagens para hóspedes do resort',
      selfCatering: 'Refeições próprias',
      ownSleepingUnitRequired: 'Equipamento próprio para dormir',
      groupFormats: 'Adequado a grupos',
      walkingAccess: 'Acesso a pé ao parque',
      shuttleOrTransit: 'Serviço de transporte ou transportes públicos',
    },
    reset: 'Repor filtros',
    resultsLabel: 'Tipos de alojamento comparáveis',
    resultSingular: 'tipo de alojamento',
    resultPlural: 'tipos de alojamento',
    operatorRelation: {
      resort_operated: 'Gerido pelo Europa-Park Resort',
      independent: 'Operador independente',
    },
    states: {
      verified: 'Comprovado',
      available_for_this_type: 'Disponível para este tipo',
      not_applicable: 'Não aplicável',
      varies_by_property: 'Varia consoante o alojamento',
      must_verify: 'Confirmar antes da reserva',
    },
    verifyTitle: 'Confirmar concretamente antes da reserva',
    source: 'Abrir fonte',
    checkedAt: 'Verificado em',
    emptyTitle: 'Nenhum tipo de alojamento corresponde a todos os filtros',
    emptyText:
      'Retire uma característica ou volte a escolher todas as situações de viagem. Um resultado vazio não é uma afirmação sobre estabelecimentos individuais.',
    priceNoteTitle: 'Porque não aparecem preços de hotel',
    priceNoteText:
      'Os preços de alojamento mudam conforme a data, a ocupação, a tarifa e os serviços. Compare primeiro o tipo adequado e confirme depois o preço final diretamente com o fornecedor.',
    notRanking:
      'A ordem é neutra. Não constitui uma avaliação de qualidade nem uma recomendação paga.',
    noJs:
      'Sem JavaScript, todos os tipos de alojamento e listas de verificação continuam visíveis; apenas faltam os filtros interativos.',
    scenarioLabels: {
      'operator-benefits-priority': 'Dar prioridade à entrada antecipada e ao transporte do resort',
      'park-and-rulantica-without-car': 'Combinar Europa-Park e Rulantica sem carro próprio',
      'own-motorhome-or-caravan': 'Viajar em autocaravana ou caravana própria',
      'own-tent': 'Dormir em tenda própria',
      'large-group-themed-stay': 'Alojamento temático para família, associação ou grupo',
      'self-catering-filter': 'Refeições próprias como critério de seleção',
      'walkability-filter': 'Filtrar alojamentos pela distância a pé até à entrada principal',
    },
    typeContent: {
      'official-themed-hotel': {
        label: 'Hotel temático do Europa-Park',
        definition:
          'Um dos seis hotéis temáticos de 4 estrelas (Superior) geridos pelo resort.',
        mustVerify: [
          'vantagens válidas para a data concreta da viagem',
          'que atrações estão efetivamente abertas durante a entrada antecipada',
          'ocupação do quarto e acessibilidade',
          'se os bilhetes de entrada estão incluídos no pacote escolhido ou são comprados em separado',
        ],
      },
      'riverside-western-lodge': {
        label: 'Riverside Western Lodge',
        definition:
          'Alojamento em quartos na Silver Lake City com um perfil próprio de vantagens para hóspedes.',
        mustVerify: [
          'horário atual do autocarro de Rust',
          'vantagens válidas para a data concreta da viagem',
          'ocupação do quarto e acessibilidade',
          'possíveis períodos de ruído de eventos na Silver Lake City',
        ],
      },
      'tipi-town': {
        label: 'Tipi Town',
        definition:
          'Alojamentos temáticos para grupos e famílias em tipis, carroças cobertas, quartos em casas de madeira e Western Houses.',
        mustVerify: [
          'configuração das instalações sanitárias e dos espaços de dormir na categoria escolhida',
          'se o pequeno-almoço é obrigatório ou opcional',
          'vantagens válidas para a data concreta da viagem',
          'possíveis períodos de ruído de eventos',
          'adequação do comprimento dos beliches aos viajantes',
        ],
      },
      'official-caravaning': {
        label: 'Europa-Park Caravaning',
        definition:
          'Lugares na Silver Lake City para autocaravanas e caravanas.',
        mustVerify: [
          'dimensões do veículo e categoria de lugar adequada',
          'condições de eletricidade e água da reserva concreta',
          'horários de chegada, silêncio e partida',
          'vantagens atuais e horário do autocarro de Rust',
        ],
      },
      'official-tent-camping': {
        label: 'Europa-Park Camping',
        definition:
          'Parque de campismo na Silver Lake City para visitantes com tenda própria.',
        mustVerify: [
          'regras para tendas e parcelas',
          'necessidades de eletricidade e condições de ligação',
          'opções de instalações sanitárias e pequeno-almoço',
          'meteorologia, horas de silêncio e vantagens atuais para hóspedes',
        ],
      },
      'independent-hotel-or-guesthouse-rust': {
        label: 'Hotel ou pensão independente em Rust',
        definition:
          'Alojamento de um operador independente dentro do município de Rust.',
        mustVerify: [
          'disponibilidade atual do estabelecimento e para reserva',
          'percurso real a pé até à entrada necessária',
          'pequeno-almoço, estacionamento, cancelamento e acessibilidade',
          'não pressupor vantagens dos hotéis do resort',
        ],
      },
      'independent-holiday-apartment-rust': {
        label: 'Apartamento de férias independente em Rust',
        definition:
          'Alojamento independente registado pelo município de Rust como apartamento de férias.',
        mustVerify: [
          'equipamento de cozinha e zona de refeições, em vez de o deduzir da categoria',
          'percurso real a pé até à entrada necessária',
          'estadia mínima, limpeza final, estacionamento e cancelamento',
          'registo e disponibilidade atuais',
        ],
      },
      'accommodation-nearby-municipalities': {
        label: 'Alojamento num município vizinho',
        definition:
          'Alojamento independente num município da Erlebnisregion Europa-Park fora de Rust.',
        mustVerify: [
          'ligação no dia concreto da semana e à hora de fecho do parque',
          'última viagem de regresso e transbordos',
          'estacionamento no destino e no alojamento',
          'disponibilidade atual do estabelecimento e para reserva',
        ],
      },
    },
  },
  restaurantFinder: {
    eyebrow: 'Diretório verificado',
    title: 'Comparar de forma objetiva restaurantes mais pequenos em Rust',
    intro:
      'Pesquise oito entradas de diretório verificadas editorialmente. Só são apresentadas características comprovadas; não fazemos afirmações sobre qualidade, nível de preços ou mesas disponíveis.',
    filtersLabel: 'Filtrar restaurantes',
    searchLabel: 'Nome ou morada',
    searchPlaceholder: 'Por exemplo Adler ou Fischerstraße',
    statusLabel: 'Estado da verificação',
    allStatuses: 'Todos os estados de verificação',
    statuses: {
      first_party_verified: 'Comprovado por fonte do operador',
      public_directory_verified: 'Comprovado no diretório municipal',
      license_page_verified: 'Comprovado por página de licença',
      needs_reverification: 'É necessária nova verificação',
    },
    timeLabel: 'Período comprovado',
    allTimes: 'Todos os períodos comprovados',
    timeSlots: {
      breakfast: 'Pequeno-almoço',
      evening: 'Serviço ao jantar',
    },
    distanceLabel: 'Distância comprovada',
    allDistances: 'Todas as distâncias comprovadas',
    distanceOptions: [
      { maxMetres: 500, label: 'Até 500 m' },
      { maxMetres: 1000, label: 'Até 1 km' },
      { maxMetres: 2000, label: 'Até 2 km' },
    ],
    needsLabel: 'Necessidades comprovadas',
    familyFeatures: {
      kids_menu: 'Menu infantil mencionado',
    },
    dietFeatures: {
      vegetarian_evidence: 'Opções vegetarianas comprovadas',
      vegan_evidence: 'Opções veganas comprovadas',
      gluten_free_evidence: 'Opções sem glúten comprovadas',
    },
    reset: 'Repor filtros',
    resultsLabel: 'Entradas de diretório verificadas',
    resultSingular: 'restaurante',
    resultPlural: 'restaurantes',
    noJs:
      'Sem JavaScript, todas as entradas, fontes e incertezas continuam legíveis; apenas faltam a pesquisa e os filtros.',
    emptyTitle: 'Nenhuma entrada corresponde a estes filtros',
    emptyText:
      'Retire um filtro. A ausência de resultados também pode significar que a característica ainda não está suficientemente comprovada.',
    serviceEvidence: 'Oferta comprovada',
    cuisineEvidence: 'Perfil culinário comprovado',
    filterEvidence: 'Prova para o filtro',
    evidenceCheckedAt: 'Prova para o filtro verificada',
    source: 'Fonte primária',
    operatorWebsite: 'Site do operador',
    corroboratingSource: 'Fonte adicional',
    uncertaintyTitle: 'O que deve ser confirmado antes da visita',
    verificationNote: 'Nota de verificação',
    checkedAt: 'Entrada verificada',
    reviewDue: 'Prazo de revisão ultrapassado',
    notRecommendation: 'Não é uma recomendação',
    notRecommendationTitle: 'Diretório neutro, não uma lista dos melhores',
    notRecommendationText:
      'A inclusão e a ordem não constituem uma avaliação da qualidade. Confirme diretamente com o estabelecimento os horários, a ementa, os alergénios e as reservas.',
    unavailableEvidenceTitle: 'Filtros que deliberadamente não apresentamos',
    unavailableEvidence: {
      time: 'Os períodos ainda não estão documentados de forma suficientemente uniforme.',
      distance: 'As distâncias ainda não foram medidas com um percurso consistente.',
      family: 'As características para famílias ainda não estão suficientemente comprovadas.',
      diet: 'As opções vegetarianas, veganas e sem glúten ainda não estão documentadas de forma suficientemente fiável.',
    },
    entryContent: {
      'gasthaus-adler-rust': {
        cuisineEvidence: ['cozinha tradicional alemã'],
        serviceEvidence: ['serviço ao jantar segundo o site do operador'],
        verificationNote:
          'O site e a ficha legal do operador estavam acessíveis; a morada, o contacto, o perfil culinário e as informações atuais de abertura eram apresentados na data da verificação.',
        uncertainties: [
          'Aberturas especiais e férias dependem da data.',
          'A disponibilidade de reservas não foi verificada.',
        ],
      },
      'hardys-rust': {
        cuisineEvidence: [
          'pratos regionais e internacionais',
          'hambúrgueres, entrecosto, massa e bife segundo o operador',
        ],
        serviceEvidence: [
          'pequeno-almoço segundo o site do operador',
          'serviço ao jantar segundo o site do operador',
        ],
        verificationNote:
          'O site do operador estava acessível e indicava a morada, o perfil das refeições e a oferta de pequeno-almoço.',
        uncertainties: [
          'O estado de abertura em direto no site pode mudar com pouca antecedência.',
          'A descrição promocional e as avaliações incorporadas não foram utilizadas como prova de qualidade.',
        ],
      },
      'casa-rustica-rust': {
        cuisineEvidence: ['cozinha italiana'],
        serviceEvidence: ['serviço ao jantar segundo o diretório municipal'],
        verificationNote:
          'O site do operador confirma o estabelecimento, a morada e o restaurante italiano; o diretório municipal fornece um horário atual de referência.',
        uncertainties: [
          'Confirme os horários no site do operador ou por telefone antes da visita.',
          'O tempo a pé até ao parque indicado pelo operador não foi medido de forma independente.',
        ],
      },
      'hotel-restaurant-mythos': {
        cuisineEvidence: ['cozinha grega e internacional'],
        serviceEvidence: ['menu infantil segundo o site do operador'],
        verificationNote:
          'O site do operador estava acessível e confirmou a morada, o perfil culinário e o contacto para reservas.',
        uncertainties: [
          'O conteúdo legível do site do operador não apresenta horários semanais estáveis.',
          'A disponibilidade de mesas não foi verificada.',
        ],
      },
      'kaiserstuehler-hof-rust': {
        cuisineEvidence: ['cozinha de Baden', 'pratos regionais'],
        serviceEvidence: ['serviço ao jantar segundo o site do operador'],
        verificationNote:
          'O site do operador estava acessível e indicava a morada, o perfil da cozinha de Baden e o ritmo semanal atual.',
        uncertainties: [
          'Volte a confirmar as férias e o dia de descanso antes da visita.',
          'Não fazemos afirmações sobre adequação a alergias sem consulta direta.',
        ],
      },
      'restaurant-fenix-rust': {
        cuisineEvidence: ['tipo de cozinha não indicado de forma clara na fonte primária'],
        serviceEvidence: ['serviço ao jantar segundo o site do operador'],
        verificationNote:
          'O site do operador e a entrada municipal confirmam o estabelecimento, a morada e o contacto. As afirmações promocionais não foram utilizadas.',
        uncertainties: [
          'Antes de uma categorização editorial, confirme manualmente o tipo de cozinha na ementa atual.',
          'O site do operador apresenta horários diferentes dos de plataformas de terceiros; utilize apenas os dados do operador.',
        ],
      },
      'la-terrassa-rust': {
        cuisineEvidence: ['tipo de cozinha não indicado na entrada municipal'],
        serviceEvidence: ['esplanada segundo o diretório municipal'],
        verificationNote:
          'O restaurante consta do diretório municipal atual; a página do estabelecimento ligada descreve sobretudo a pensão e não confirma detalhes do restaurante.',
        uncertainties: [
          'Confirme diretamente com o estabelecimento o estado da atividade, o tipo de cozinha e os horários.',
          'Até existir confirmação direta, não o destaque como opção de restaurante verificada editorialmente.',
        ],
      },
      'my-denis-rust': {
        cuisineEvidence: ['tipo de cozinha não indicado na entrada municipal'],
        serviceEvidence: ['entrega segundo o diretório municipal'],
        verificationNote:
          'Foi encontrado apenas no diretório municipal; na data da verificação não foi localizado um site próprio fiável.',
        uncertainties: [
          'Confirme diretamente o estado da atividade, o contacto, o tipo de cozinha e os horários.',
          'Não incluir em recomendações ou classificações para utilizadores antes de uma verificação em fonte própria.',
        ],
      },
    },
  },
  resortPassTool: {
    eyebrow: 'Ajuda à decisão ResortPass',
    title: 'Verificar em conjunto o estado, os benefícios e os custos reais',
    intro:
      'O estado em direto responde à questão da compra. Depois, a comparação e a calculadora ajudam a decidir entre bilhetes diários, Silver e Gold.',
    statusTitle: 'Estado atual das vendas',
    statusChecking: 'A verificar o estado…',
    statusAvailable: 'Oficialmente disponível agora',
    statusUnavailable: 'Atualmente indisponível',
    statusUnknown: 'Estado atualmente incerto',
    statusError: 'Não foi possível carregar o estado em direto',
    lastChecked: 'Última verificação',
    comparisonTitle: 'Silver e Gold em resumo',
    feature: 'Característica',
    silver: 'Silver',
    gold: 'Gold',
    adultPrice: 'Preço para adultos',
    concessionPrice: 'Crianças 4–11 / seniores a partir dos 60',
    visitDays: 'Dias de visita',
    visitDaysSilver: 'Dias de visita definidos e publicados',
    visitDaysGold: 'Maior flexibilidade segundo as condições atuais',
    rulanticaBenefit: 'Rulantica',
    rulanticaSilver: 'Não incluído como benefício padrão',
    rulanticaGold: 'Dois bilhetes diários segundo as condições atuais',
    flexibility: 'Perfil de planeamento',
    flexibilitySilver: 'Para datas que podem ser planeadas com antecedência',
    flexibilityGold: 'Para visitas mais frequentes ou espontâneas',
    calculatorTitle: 'Comparação simples de custos para adultos',
    calculatorIntro:
      'Compare os últimos preços comprovados dos passes com um número escolhido por si de visitas diárias ao Europa-Park e ao Rulantica.',
    visitsLabel: 'Visitas ao Europa-Park',
    rulanticaVisitsLabel: 'Visitas diárias ao Rulantica',
    priceScenarioLabel: 'Cenário de bilhetes diários',
    lowerPriceScenario: 'Limite inferior do intervalo comprovado',
    upperPriceScenario: 'Limite superior do intervalo comprovado',
    calculate: 'Atualizar comparação',
    dayTicketsCost: 'Bilhetes diários individuais',
    silverCost: 'Silver mais bilhetes para o Rulantica',
    goldCost: 'Gold com dois dias de Rulantica incluídos',
    lowestCost: 'Valor matematicamente mais baixo',
    estimateDisclaimer:
      'Estimativa para uma pessoa adulta, sem garantia de compra ou disponibilidade. Dias excluídos, reservas, descontos, viagem e benefícios não utilizados podem alterar a decisão.',
    linksTitle: 'Esclarecer diretamente a próxima questão',
    compareLink: 'Comparar Silver e Gold',
    pricesLink: 'Consultar preços do ResortPass',
    reservationLink: 'Compreender a reserva',
    rulanticaLink: 'ResortPass e Rulantica',
  },
} satisfies PlanningLocalePack;
