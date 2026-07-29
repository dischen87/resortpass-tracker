import type { PlanningLocalePack } from '../planning-types';

export const enPlanning: PlanningLocalePack = {
  common: {
    skip: 'Skip to content',
    menu: 'Menu',
    language: 'Choose language',
    home: 'Home',
    plannerLabel: 'Plan your visit',
    answerLabel: 'Quick answer',
    updatedLabel: 'Checked',
    sourcePrefix: 'Source',
    onThisPage: 'On this page',
    relatedTitle: 'Useful next steps',
    sourcesTitle: 'Sources and freshness',
    sourcesIntro:
      'Details that can change are taken from operator and public-authority sources. Check prices, opening hours and rules again in the linked primary source before booking.',
    correctionLabel: 'Found something wrong?',
    correctionText:
      'Tell us about outdated information. We clearly separate verified facts, calculation assumptions and editorial guidance.',
    unofficial: 'Independent community project',
    footerText: 'Independent planning guide – not affiliated with Europa-Park.',
    overview: 'Overview',
    tool: 'Planning tool',
    decisions: 'Decision guide',
    faq: 'Frequently asked questions',
    notRecommendation: 'Directory listing, not a recommendation',
    verifyBeforeVisit: 'Check directly with the provider before your visit',
  },
  navigation: {
    parkGuide: 'Europa-Park',
    visitPlanner: '1 or 2 days',
    costCalculator: 'Costs',
    familyGuide: 'Families',
    rulanticaGuide: 'Rulantica',
    stayGuide: 'Where to stay',
    restaurantGuide: 'Eating in Rust',
    resortPassGuide: 'ResortPass',
  },
  pages: {
    parkGuide: {
      title: 'Plan Europa-Park: independent guide and calculators',
      description:
        'Plan a practical Europa-Park visit: 1 or 2 days, costs, families, Rulantica, accommodation and restaurants in Rust, with interactive tools.',
      eyebrow: 'Europa-Park planning hub',
      heading: 'Plan Europa-Park around what you actually need',
      answer:
        'For a first visit, one full day is the minimum; two days are usually more relaxed, especially with children, shows or large crowds. Base your plan on the date, group and budget instead of a generic top 10.',
      sectionTitle: 'Turn your questions into a realistic visit plan',
      sectionIntro:
        'The tools connect your situation with current facts. They do not replace an official booking, but they help prevent the most important planning mistakes before your trip.',
      points: [
        {
          title: 'Decide on time first',
          text: 'Use your arrival time, priority attractions and expected crowds to decide whether one or two park days make sense.',
          icon: 'tabler:calendar-time',
        },
        {
          title: 'Total cost, not just ticket price',
          text: 'Add park tickets, Rulantica, parking and accommodation together as a range, not a misleading fixed price.',
          icon: 'tabler:calculator',
        },
        {
          title: 'Adapt the route to your group',
          text: 'Height, age, rest needs and interests have more influence on a good order than general rankings.',
          icon: 'tabler:route',
        },
      ],
      faqs: [
        {
          question: 'How many days do you need for Europa-Park?',
          answer:
            'One full day can cover selected highlights. Two days are usually more realistic for first-time visitors, families, shows and a less rushed tour.',
        },
        {
          question: 'Is this an official website?',
          answer:
            'No. ResortPass Tracker is an independent community project. Official Europa-Park information governs admission, safety and current rules.',
        },
        {
          question: 'Why does the calculator show price ranges?',
          answer:
            'Europa-Park and Rulantica use date-based online prices. A range is more honest until you select a specific date in the official ticket shop.',
        },
      ],
    },
    visitPlanner: {
      title: 'Europa-Park in 1 or 2 days? Interactive visit planner',
      description:
        'Is one day at Europa-Park enough? Build a plan around your date, group, arrival, crowds and Rulantica, including a daily route.',
      eyebrow: '1 or 2 days',
      heading: 'How many days do you need at Europa-Park?',
      answer:
        'One day works with an early arrival and clear priorities. Two days are the safer choice for families, shows and many themed areas; with Rulantica, two to three days usually make more sense.',
      sectionTitle: 'What really changes the length of your visit',
      sectionIntro:
        'Not every group needs the same route. Plan time blocks and priorities first; actual waiting times should only determine the detailed order on the day.',
      points: [
        {
          title: 'One day: choose decisively',
          text: 'Start at opening, prioritise three to five main goals and keep alternatives ready in nearby themed areas.',
          icon: 'tabler:number-1',
        },
        {
          title: 'Two days: split the park',
          text: 'Spread major rides, family attractions and shows across two halves of the park to reduce walking and duplication.',
          icon: 'tabler:number-2',
        },
        {
          title: 'Large crowds: build in buffer time',
          text: 'Allow time for food, technical downtime and walking. Live wait times help you adjust on site.',
          icon: 'tabler:clock-hour-4',
        },
      ],
      faqs: [
        {
          question: 'Can you do Europa-Park in one day?',
          answer:
            'You can cover many highlights, but rarely everything. The planner assesses your arrival, group and expected crowds and recommends more time when conditions are less favourable.',
        },
        {
          question: 'Should you visit Rulantica on the same day?',
          answer:
            'An evening ticket can suit adults or older children who love water parks. With young children or a strong focus on the water world, a separate day is more relaxed.',
        },
        {
          question: 'Does the route guarantee waiting times?',
          answer:
            'No. Weather, downtime and actual crowds can change the day plan. Check the official app and live wait times on your visit day.',
        },
      ],
    },
    costCalculator: {
      title: 'Europa-Park cost calculator 2026: tickets, parking and hotel',
      description:
        'Calculate a realistic Europa-Park cost range for adults, children, 1 or 2 days, Rulantica, parking and accommodation.',
      eyebrow: 'Total cost',
      heading: 'How much will your Europa-Park visit cost in total?',
      answer:
        'Admission is only one part of the budget. The calculator combines date-based ticket ranges with parking, Rulantica and your accommodation budget, and deliberately shows a minimum and maximum.',
      sectionTitle: 'Turn individual prices into a useful budget',
      sectionIntro:
        'We use official price ranges but do not invent hotel prices. You enter accommodation, food and transport as your own assumptions.',
      points: [
        {
          title: 'Date-based prices as a range',
          text: 'Without a specific ticket date, a range is more reliable than a single advertised price.',
          icon: 'tabler:arrows-horizontal',
        },
        {
          title: 'Family budget per person',
          text: 'The total and per-person amount make 1- and 2-day options easier to compare.',
          icon: 'tabler:users',
        },
        {
          title: 'Assumptions stay visible',
          text: 'Accommodation and additional costs are shown separately so you can replace every assumption.',
          icon: 'tabler:list-details',
        },
      ],
      faqs: [
        {
          question: 'Are the calculator prices guaranteed?',
          answer:
            'No. They are official price ranges with a review date. Availability, visit date, processing fees and booking channel can change the final price.',
        },
        {
          question: 'Why is there no average hotel price?',
          answer:
            'Accommodation prices depend heavily on the date, occupancy and cancellation terms. You therefore enter a real price that you have checked yourself.',
        },
        {
          question: 'Are food and travel included?',
          answer:
            'Not automatically yet. These costs vary widely by origin and habits and should be planned as an additional personal buffer.',
        },
      ],
    },
    familyGuide: {
      title: 'Europa-Park with children: height finder and family plan',
      description:
        'Plan Europa-Park with a baby, toddler or school-age child: filter rides by age and height, understand adult-accompaniment rules and plan breaks.',
      eyebrow: 'Families and children',
      heading: 'Which attractions suit your child?',
      answer:
        'Many rides consider age and height together. Use the finder as a shortlist and always check the measuring station, signs and staff instructions on site.',
      sectionTitle: 'A family plan needs more than a ride list',
      sectionIntro:
        'Breaks, meals, nappy changes, siblings of different heights and possible accompaniment rules shape the route just as much as favourite attractions.',
      points: [
        {
          title: 'Combine age and height',
          text: 'The finder distinguishes minimum requirements from possible adult accompaniment using the official attraction pages.',
          icon: 'tabler:ruler-measure',
        },
        {
          title: 'Plan quieter blocks',
          text: 'Indoor rides, play areas and shows work well as buffers between more intense attractions.',
          icon: 'tabler:zzz',
        },
        {
          title: 'Check again on site',
          text: 'Safety requirements can change and the binding rules are displayed at each attraction entrance.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'Is height the only requirement?',
          answer:
            'No. Some attractions also have a minimum age or require an accompanying adult up to a particular age or height.',
        },
        {
          question: 'Can the finder guarantee that my child may ride?',
          answer:
            'No. Current rules, measurement and staff on site are decisive. Health, body shape, pregnancy or technical changes can create further restrictions.',
        },
        {
          question: 'What is Baby-Switch?',
          answer:
            'At selected attractions, carers may take turns riding one after the other. Ask directly at the attraction how the procedure works.',
        },
      ],
    },
    rulanticaGuide: {
      title: 'Plan Rulantica: full day, evening ticket or combination?',
      description:
        'Combine Rulantica with Europa-Park: interactive guide to day, evening or Moonlight tickets, children, packing and visit length.',
      eyebrow: 'Europa-Park + Rulantica',
      heading: 'How does Rulantica fit into your short break?',
      answer:
        'A full Rulantica day is the most relaxed option for families and water-park fans. Evening or Moonlight tickets work better as an addition when the group’s age and energy suit a shorter visit.',
      sectionTitle: 'Choose a ticket time around your goal',
      sectionIntro:
        'The water world normally stays open into the evening. The key question is whether Rulantica is a main goal or only an extra after the park.',
      points: [
        {
          title: 'Day ticket',
          text: 'More time for children’s areas, slides, breaks and seasonal outdoor areas, especially with a dedicated Rulantica day.',
          icon: 'tabler:sun',
        },
        {
          title: 'Evening or Moonlight',
          text: 'Less time and usually a lower price, but also less energy after a long park day.',
          icon: 'tabler:moon-stars',
        },
        {
          title: 'Take the packing list seriously',
          text: 'Bring a towel and swimwear and check current rules in advance; day visitors should not rely on last-minute towel hire.',
          icon: 'tabler:backpack',
        },
      ],
      faqs: [
        {
          question: 'Is an evening ticket enough for Rulantica?',
          answer:
            'It can be enough for selected slides or a short finish to the day. Families with young children and guests who want to use many areas usually benefit from a full day.',
        },
        {
          question: 'Can you do Europa-Park and Rulantica in one day?',
          answer:
            'Technically yes, but the combination is tiring and requires strict priorities. The decision tool considers park days, children and your preferred pace.',
        },
        {
          question: 'Can you hire towels at Rulantica?',
          answer:
            'According to the official FAQ, there is no regular towel hire for day visitors. Bring your own towel and check the FAQ again before your visit.',
        },
      ],
    },
    stayGuide: {
      title: 'Where to stay near Europa-Park: compare hotels, Rust and nearby towns',
      description:
        'Compare places to stay near Europa-Park: themed hotel, guest house, holiday apartment, camping and nearby towns by time saved, self-catering and transport.',
      eyebrow: 'Where to stay',
      heading: 'Which accommodation fits your visit plan?',
      answer:
        'The best accommodation depends on more than the room price. Compare early access, distances, transport, self-catering, cancellation and the total cost for your group.',
      sectionTitle: 'Scenarios instead of an arbitrary hotel ranking',
      sectionIntro:
        'The comparison shows accommodation types and questions that remain to be checked. It deliberately avoids unverified prices and rankings of individual businesses.',
      points: [
        {
          title: 'Resort benefits',
          text: 'Official themed hotels may offer early entry and a shuttle; check whether these apply on your date and which attractions are open.',
          icon: 'tabler:sparkles',
        },
        {
          title: 'Rust and self-catering',
          text: 'Guest houses and holiday apartments may offer short journeys or a kitchen, but check every facility with the specific property.',
          icon: 'tabler:building-cottage',
        },
        {
          title: 'Nearby towns and transport',
          text: 'A lower room price can be offset by parking, last bus times and additional journeys.',
          icon: 'tabler:bus',
        },
      ],
      faqs: [
        {
          question: 'Are official Europa-Park hotels always the best choice?',
          answer:
            'No. They are strong when resort benefits and convenience matter. Independent accommodation can suit self-catering, larger groups or a different budget better.',
        },
        {
          question: 'Does the comparison show current hotel prices?',
          answer:
            'No. Reliable prices require travel dates, occupancy and booking conditions. The cost calculator therefore uses an accommodation price that you have checked.',
        },
        {
          question: 'Which places besides Rust are relevant?',
          answer:
            'Ringsheim, Herbolzheim and other municipalities in the Erlebnisregion are among the options. The specific connection and last return service on your visit day are decisive.',
        },
      ],
    },
    restaurantGuide: {
      title: 'Restaurants in Rust after Europa-Park: verified directory',
      description:
        'Find restaurants in Rust for the evening: neutral, source-checked listings with cuisine, service notes, uncertainties and direct provider links.',
      eyebrow: 'Eating in Rust',
      heading: 'Where can you eat in Rust after the park closes?',
      answer:
        'The directory is not a best-of list. It shows businesses with a traceable primary or municipal source and makes clear which opening hours, reservations and dietary needs you still need to check directly.',
      sectionTitle: 'More useful than an unverified restaurant ranking',
      sectionIntro:
        'Opening hours and closing days change. We therefore separate verified cuisine, service information and open questions for every listing.',
      points: [
        {
          title: 'Sources instead of stars',
          text: 'We do not use platform ratings as proof of quality; we link to operator and municipal websites.',
          icon: 'tabler:source-code',
        },
        {
          title: 'Evening service made visible',
          text: 'A filter only uses documented service information. You must still confirm actual kitchen hours on your visit day.',
          icon: 'tabler:clock',
        },
        {
          title: 'No invented dietary filters',
          text: 'We only offer vegan, gluten-free or allergy-friendly filters when reliable current information is available.',
          icon: 'tabler:salad',
        },
      ],
      faqs: [
        {
          question: 'Are the listed restaurants recommendations?',
          answer:
            'No. A listing only means that the business was found in a traceable source. Taste, quality and table availability have not been assessed.',
        },
        {
          question: 'Are the opening hours guaranteed?',
          answer:
            'No. Special openings, holidays and kitchen hours can change at short notice. Use the provider link or call before your visit.',
        },
        {
          question: 'Why are distances missing?',
          answer:
            'A reliable walking time depends on the actual starting point and route. We will only add such figures after consistent map or on-site checks.',
        },
      ],
    },
    resortPassGuide: {
      title: 'Europa-Park ResortPass 2026: availability, prices and rules',
      description:
        'Understand ResortPass Silver and Gold: current sales status, prices, visit days, reservations, Rulantica and an independent availability alert.',
      eyebrow: 'ResortPass guide',
      heading: 'Everything you need to know about Europa-Park ResortPass',
      answer:
        'Silver and Gold are not currently available through regular sales, and no new sales date has been announced. Silver is cheaper and tied to defined visit days; Gold is more flexible and includes additional Rulantica benefits.',
      sectionTitle: 'Choose an annual pass around how you will use it',
      sectionIntro:
        'Price alone should not decide. Possible visit days, flexibility, Rulantica use and whether the pass is actually available matter more.',
      points: [
        {
          title: 'Availability first',
          text: 'The tracker regularly checks the official ticket shop and separates actual purchase availability from announcements or queues.',
          icon: 'tabler:bell-ringing',
        },
        {
          title: 'Silver or Gold',
          text: 'Silver has defined visit days; Gold offers greater flexibility and includes two Rulantica day tickets.',
          icon: 'tabler:scale',
        },
        {
          title: 'Check the rules in the portal',
          text: 'Reservations, excluded days and contract details can change and should be checked in the official source before purchase.',
          icon: 'tabler:shield-check',
        },
      ],
      faqs: [
        {
          question: 'When will ResortPasses be available again?',
          answer:
            'No new sales date is currently announced. The tracker alerts you when the official shop genuinely shows Silver or Gold as available to buy again.',
        },
        {
          question: 'How much does ResortPass cost?',
          answer:
            'According to the latest official check, Silver costs 325 euros for adults and 275 euros for children/seniors; Gold costs 495 and 430 euros respectively.',
        },
        {
          question: 'Is the tracker affiliated with Europa-Park?',
          answer:
            'No. It is an independent community project. Purchase, contract and binding benefits are provided exclusively through official providers.',
        },
      ],
    },
    resortPassCompare: {
      title: 'ResortPass Silver or Gold? Comparison and decision guide',
      description:
        'Compare ResortPass Silver and Gold by price, visit days, flexibility, Rulantica and suitable use cases.',
      eyebrow: 'Silver vs Gold',
      heading: 'Which ResortPass fits your visit pattern?',
      answer:
        'Silver is more suitable when the defined visit days work for you and the lower price matters. Gold is more worthwhile for maximum flexibility and genuine use of the included Rulantica days.',
      sectionTitle: 'The more expensive pass is not automatically better',
      sectionIntro:
        'Compare your actual visit days and additional benefits. Unused flexibility or Rulantica tickets provide no value.',
      points: [
        {
          title: 'Silver: cheaper with planning',
          text: 'Suitable if you can plan dates early and the published visit days fit your calendar.',
          icon: 'tabler:calendar-check',
        },
        {
          title: 'Gold: more flexibility',
          text: 'Suitable for more frequent spontaneous visits and guests who will actually use the two included Rulantica day tickets.',
          icon: 'tabler:crown',
        },
        {
          title: 'Compare against day tickets',
          text: 'Use the number of visits you genuinely expect and compare it with date-based day-ticket prices.',
          icon: 'tabler:calculator',
        },
      ],
      faqs: [
        {
          question: 'Does Silver have excluded days?',
          answer:
            'Silver is valid on predefined opening days. The current list on the official detail page and in the ResortPass portal is authoritative.',
        },
        {
          question: 'Does Gold include Rulantica tickets?',
          answer:
            'According to current operator information, Gold includes two Rulantica day tickets. Check the conditions and reservation requirements officially before use.',
        },
        {
          question: 'After how many visits is a pass worthwhile?',
          answer:
            'That depends on your actual visit dates, day-ticket prices and additional benefits used. A universal number of visits would be misleading.',
        },
      ],
    },
    resortPassPrices: {
      title: 'ResortPass prices 2026: Silver, Gold and day-ticket comparison',
      description:
        'Current ResortPass prices for adults, children and seniors, with context against date-based Europa-Park day tickets.',
      eyebrow: '2026 prices',
      heading: 'How much do ResortPass Silver and Gold cost?',
      answer:
        'Last officially checked: Silver 325 euros for adults and 275 euros for children/seniors; Gold 495 and 430 euros respectively. Neither pass is currently available through regular sales.',
      sectionTitle: 'Assess price together with actual use',
      sectionIntro:
        'Day tickets have date-based price ranges. An annual pass therefore does not pay off at one universal number, but according to your actual dates.',
      points: [
        {
          title: 'Silver',
          text: '325 euros for adults; 275 euros for children aged 4–11 and seniors aged 60 or over – note the date of the primary source.',
          icon: 'tabler:circle-letter-s',
        },
        {
          title: 'Gold',
          text: '495 euros for adults; 430 euros for children and seniors, including additional benefits such as two Rulantica days.',
          icon: 'tabler:circle-letter-g',
        },
        {
          title: 'Availability comes first',
          text: 'A price comparison only helps when the desired pass is actually on sale. Use the live status for that.',
          icon: 'tabler:shopping-cart',
        },
      ],
      faqs: [
        {
          question: 'Are these the 2026 prices?',
          answer:
            'The figures were taken from the official ticket page on the stated review date. The operator can change prices and conditions.',
        },
        {
          question: 'Are concessionary rates available?',
          answer:
            'The official page lists reduced prices for children, seniors and certain eligible groups. Proof and current conditions are binding.',
        },
        {
          question: 'Can I buy ResortPass now?',
          answer:
            'Silver and Gold are currently listed as unavailable. The live tracker shows when the actual shop status changes.',
        },
      ],
    },
    resortPassReservation: {
      title: 'ResortPass reservations: visit days, portal and hotel guests',
      description:
        'How ResortPass reservations work: register a visit day, allocations, hotel bookings and current rules in the ResortPass portal.',
      eyebrow: 'Reservation',
      heading: 'Do you need to reserve your visit with ResortPass?',
      answer:
        'The specific reservation requirement depends on the pass, visit day and possible allocations. The ResortPass portal and official FAQ are authoritative; a hotel booking does not automatically replace every required step in every case.',
      sectionTitle: 'Check three things before travelling',
      sectionIntro:
        'A valid pass, an eligible visit day and any required reservation are separate conditions.',
      points: [
        {
          title: 'Open the pass portal',
          text: 'Check validity, registered visit days and current allocation information there.',
          icon: 'tabler:login-2',
        },
        {
          title: 'Match your hotel booking',
          text: 'Read the current FAQ to see whether and how visit days connect to your specific resort accommodation.',
          icon: 'tabler:hotel-service',
        },
        {
          title: 'Keep the confirmation',
          text: 'Have your pass and reservation proof ready in the official app or required format on the visit day.',
          icon: 'tabler:ticket',
        },
      ],
      faqs: [
        {
          question: 'Do I need a reservation for every visit?',
          answer:
            'There is no universal answer for all pass types and periods. Check the current rule in the ResortPass portal before every visit.',
        },
        {
          question: 'Is a hotel booking automatically a park reservation?',
          answer:
            'The official FAQ describes special rules for overnight guests. Do not rely on an assumption; match your specific booking in the portal.',
        },
        {
          question: 'What happens when the allocation is full?',
          answer:
            'The current operator rule applies. The availability tracker monitors sales, not personal visit-day allocations in your portal.',
        },
      ],
    },
    resortPassRulantica: {
      title: 'ResortPass and Rulantica: Gold benefits and reservations',
      description:
        'What Rulantica benefits does ResortPass Gold include? Two day tickets, planning, reservations and the difference from Silver explained.',
      eyebrow: 'ResortPass + Rulantica',
      heading: 'What does ResortPass include for Rulantica?',
      answer:
        'According to current operator information, ResortPass Gold includes two Rulantica day tickets; Silver does not. Reservation, validity and possible allocations must be checked officially before your visit.',
      sectionTitle: 'Make real use of the two Rulantica days',
      sectionIntro:
        'The benefit only has value if the included days fit your trip and can be reserved in time.',
      points: [
        {
          title: 'Plan the Gold benefit',
          text: 'Treat the two days as their own part of your annual plan, not a spontaneous extra after an evening in the park.',
          icon: 'tabler:droplet-filled',
        },
        {
          title: 'Calculate Silver separately',
          text: 'With Silver, Rulantica tickets must be budgeted separately and booked subject to availability.',
          icon: 'tabler:receipt-euro',
        },
        {
          title: 'Check the time block',
          text: 'A full Rulantica day is usually more valuable for families than a rushed transfer after a full park day.',
          icon: 'tabler:clock-hour-8',
        },
      ],
      faqs: [
        {
          question: 'How many Rulantica days does Gold include?',
          answer:
            'The current official benefits include two Rulantica day tickets. Current operator conditions apply when you use them.',
        },
        {
          question: 'Does Silver include Rulantica?',
          answer:
            'The current comparison does not list it as an included standard benefit. Budget separately for any Rulantica tickets you need.',
        },
        {
          question: 'Do the included days need to be reserved?',
          answer:
            'Check the current reservation rule in the ResortPass portal. Rulantica has limited daily allocations.',
        },
      ],
    },
  },
  visitPlanner: {
    eyebrow: 'Interactive visit planner',
    title: 'Your realistic day outline',
    intro:
      'Choose visit length, group and conditions. You receive a robust order, not falsely precise minute-by-minute scheduling.',
    dateLabel: 'Visit date',
    daysLabel: 'Planned park days',
    days: ['1 day', '2 days', '3 days'],
    groupLabel: 'Focus',
    groups: {
      balanced: 'Balanced',
      family: 'Family and children',
      thrill: 'Roller coasters and action',
      shows: 'Shows and a relaxed pace',
    },
    arrivalLabel: 'Arrival',
    arrivals: {
      early: 'On site before opening',
      opening: 'At opening',
      late: 'After 10:30',
    },
    crowdLabel: 'Expected crowds',
    crowds: {
      low: 'Rather low',
      medium: 'Medium',
      high: 'High',
    },
    rulanticaLabel: 'Include Rulantica',
    submit: 'Create plan',
    resultTitle: 'Your recommendation',
    resultLead: 'Plan with clear priorities',
    resultDays: 'recommended days in total',
    routeLabel: 'Day outline',
    morning: 'Morning',
    midday: 'Midday',
    afternoon: 'Afternoon',
    evening: 'Evening',
    notes: {
      early: 'Be at the entrance before official opening and set three main goals.',
      late: 'With a late arrival, a second day is more robust than an overloaded sprint.',
      busy: 'When crowds are high, use live wait times and keep alternatives ready in each area.',
      rulantica: 'With young children or a strong water focus, treat Rulantica as a separate day.',
      family: 'Plan fixed meal and rest blocks plus at least one indoor alternative.',
      thrill: 'Use Single Rider and VirtualLine only when they are actually offered on your visit day.',
      shows: 'Check show times first and build your route around those fixed appointments.',
    },
    routes: {
      balanced: [
        'Start with two important attractions while staying in one area of the park.',
        'Eat early or late, then use an indoor attraction or show as a quieter block.',
        'Work through neighbouring themed areas and compare live wait times before moving.',
        'Catch a remaining priority, allow time for souvenirs and check for extended park opening.',
      ],
      family: [
        'Start with a suitable family attraction and check height at the entrance in advance.',
        'Plan an early break, food and a quiet indoor ride or show.',
        'Combine a play area with two more age-appropriate attractions in the same half of the park.',
        'Let the children’s energy decide; one highlight is better than an exhausted final sprint.',
      ],
      thrill: [
        'Prioritise top coasters at opening and do not cross the park for individual rides.',
        'Check VirtualLine and Single Rider; use midday for a nearby alternative.',
        'Choose the second coaster group using live wait times and allow for technical downtime.',
        'Plan the final ride strategically near the area where you want to finish.',
      ],
      shows: [
        'Check the show schedule and choose a relaxed attraction on the way to the first time slot.',
        'Combine an early meal with an indoor show or themed ride.',
        'Set a second fixed show time and only plan nearby attractions between them.',
        'Enjoy the atmosphere, food and one last ride without unnecessary park crossings.',
      ],
    },
    disclaimer:
      'Planning help without a guarantee. Opening hours, wait times, VirtualLine and attraction availability can change at short notice.',
    forecastCta: 'Check crowd forecast',
  },
  costCalculator: {
    eyebrow: '2026 budget planner',
    title: 'Calculate a realistic cost range',
    intro:
      'Official ticket ranges plus your accommodation assumption. Food, travel and optional extras are deliberately excluded from the automatic total.',
    adults: 'Adults aged 12 and over',
    children: 'Children aged 4–11',
    days: 'Europa-Park',
    oneDay: '1 day',
    twoDays: '2 days',
    rulantica: 'Rulantica',
    rulanticaOptions: {
      none: 'Do not include',
      day: 'Day ticket',
      evening: 'Evening ticket from 17:00',
      moonlight: 'Moonlight from 19:00',
    },
    parking: 'Regular parking at Europa-Park',
    nights: 'Nights',
    lodgingPerNight: 'Total accommodation per night',
    calculate: 'Update budget',
    resultEyebrow: 'Your cost range',
    total: 'Estimated total cost',
    rangeConnector: 'to',
    perPerson: 'per person',
    breakdown: 'Breakdown',
    europaParkTickets: 'Europa-Park tickets',
    rulanticaTickets: 'Rulantica tickets',
    parkingCost: 'Parking',
    lodgingCost: 'Accommodation',
    variableNote: 'Ticket prices depend on the date; the range is not a price guarantee.',
    assumptionNote: 'Allow extra for food, travel and fees.',
    currency: 'EUR',
  },
  familyFinder: {
    eyebrow: 'Family finder',
    title: 'Filter attractions by age and height',
    intro:
      'The finder deliberately uses a small, officially verified selection. Staff on site always make the binding decision.',
    age: 'Child’s age',
    height: 'Height',
    interest: 'Interest',
    interests: {
      all: 'All verified examples',
      calm: 'Calm',
      family: 'Family adventure',
      thrill: 'Action',
      indoor: 'Indoor',
    },
    submit: 'Show suitable examples',
    resultTitle: 'Verified selection',
    resultCount: 'attractions shown',
    eligible: 'Requirements met',
    accompanied: 'Adult accompaniment required',
    notYet: 'Requirements not met',
    minimum: 'Minimum',
    years: 'years',
    centimeters: 'cm',
    indoor: 'Indoor',
    source: 'Official source',
    noResults: 'No verified example attraction has been added for this filter yet.',
    disclaimer:
      'No ride guarantee. On-site signs, measuring stations, health and safety rules and staff instructions apply.',
    officialFilter: 'Check all attractions in the official filter',
  },
  rulanticaPlanner: {
    eyebrow: 'Combination guide',
    title: 'Which Rulantica ticket fits your trip?',
    intro:
      'The guide weighs park days, children, water priority and energy level. Check prices and availability officially afterwards.',
    parkDays: 'Europa-Park days',
    parkDayOptions: ['1 park day', '2 park days', '3 or more days'],
    children: 'Children in the group',
    childOptions: ['No children', 'Children under 8', 'Older children/teenagers'],
    waterPriority: 'Importance of Rulantica',
    priorityOptions: ['Just try it', 'Important addition', 'Main goal'],
    energy: 'Preferred pace',
    energyOptions: ['Relaxed', 'Balanced', 'Full programme'],
    submit: 'Assess ticket type',
    resultLabel: 'Planning recommendation',
    recommendations: {
      day: {
        title: 'A full Rulantica day',
        text: 'With young children or a strong water focus, a separate day provides enough time for breaks, changing and several areas.',
      },
      evening: {
        title: 'Evening ticket as an addition',
        text: 'Works at a normal pace with a clear selection, but plan a real break and travel time after Europa-Park.',
      },
      moonlight: {
        title: 'Moonlight for a short finish',
        text: 'Three hours suit experienced, energetic guests with few priorities better than a complete first visit.',
      },
      separate: {
        title: 'Plan Rulantica separately',
        text: 'At a relaxed pace or on a longer trip, a separate block is more robust than moving over after a full park day.',
      },
    },
    checklistTitle: 'Pack and check in advance',
    checklist: [
      'Your own towel for day visitors',
      'Swimwear and dry clothes to change into',
      'Current opening and maintenance times',
      'Age and height rules for your chosen slides',
      'Reservation, ticket and locker option',
    ],
    officialNote:
      'The official FAQ remains authoritative for admission, clothing, towels, pushchairs and lockers.',
    officialCta: 'Open the Rulantica FAQ',
  },
  stayComparator: {
    eyebrow: 'Accommodation comparison',
    title: 'Which type of accommodation fits your trip?',
    intro:
      'Compare eight accommodation types using documented features. The finder shows no ranking and no unverified prices; it narrows down useful research.',
    filtersLabel: 'Filter accommodation',
    scenarioLabel: 'What matters most to you?',
    allScenarios: 'All travel situations',
    prioritiesLabel: 'Additional features',
    priorities: {
      operatorGuestBenefits: 'Resort guest benefits',
      selfCatering: 'Self-catering',
      ownSleepingUnitRequired: 'Your own sleeping equipment',
      groupFormats: 'Suitable for groups',
      walkingAccess: 'Walk to the park',
      shuttleOrTransit: 'Shuttle or public transport',
    },
    reset: 'Reset filters',
    resultsLabel: 'Comparable accommodation types',
    resultSingular: 'accommodation type',
    resultPlural: 'accommodation types',
    operatorRelation: {
      resort_operated: 'Operated by Europa-Park Resort',
      independent: 'Independent operator',
    },
    states: {
      verified: 'Verified',
      available_for_this_type: 'Available for this type',
      not_applicable: 'Not applicable',
      varies_by_property: 'Varies by property',
      must_verify: 'Check before booking',
    },
    verifyTitle: 'Check these details before booking',
    source: 'Open source',
    checkedAt: 'Checked on',
    emptyTitle: 'No accommodation type matches every filter',
    emptyText:
      'Remove a feature or select all travel situations again. An empty result says nothing about individual properties.',
    priceNoteTitle: 'Why there are no hotel prices here',
    priceNoteText:
      'Accommodation prices change with date, occupancy, rate and included services. Compare the suitable type first, then check the final price directly with the provider.',
    notRanking:
      'The order is neutral. It is neither a quality judgement nor a paid recommendation.',
    noJs:
      'Without JavaScript, all accommodation types and checklists remain visible; only the interactive filters are missing.',
    scenarioLabels: {
      'operator-benefits-priority': 'Prioritise early entry and resort transport',
      'park-and-rulantica-without-car': 'Combine Europa-Park and Rulantica without your own car',
      'own-motorhome-or-caravan': 'Travel with your own motorhome or caravan',
      'own-tent': 'Stay in your own tent',
      'large-group-themed-stay': 'Themed accommodation for a family, club or group',
      'self-catering-filter': 'Use self-catering as a selection criterion',
      'walkability-filter': 'Filter accommodation by walking route to the main entrance',
    },
    typeContent: {
      'official-themed-hotel': {
        label: 'Europa-Park themed hotel',
        definition:
          'One of the six resort-operated 4-star (superior) themed hotels.',
        mustVerify: [
          'benefits for your specific travel date',
          'which attractions are actually open during early entry',
          'room occupancy and accessibility',
          'whether admission tickets are included in the selected package or sold separately',
        ],
      },
      'riverside-western-lodge': {
        label: 'Riverside Western Lodge',
        definition:
          'Room accommodation in Silver Lake City with its own guest-benefit profile.',
        mustVerify: [
          'current Rust bus timetable',
          'benefits for your specific travel date',
          'room occupancy and accessibility',
          'possible periods of event noise in Silver Lake City',
        ],
      },
      'tipi-town': {
        label: 'Tipi Town',
        definition:
          'Themed group and family accommodation in tipis, covered wagons, log-cabin rooms and Western Houses.',
        mustVerify: [
          'bathroom and sleeping-room layout for the selected category',
          'whether breakfast is compulsory or can be added',
          'benefits for your specific travel date',
          'possible periods of event noise',
          'whether bunk-bed lengths suit the travellers',
        ],
      },
      'official-caravaning': {
        label: 'Europa-Park Caravaning',
        definition:
          'Pitches in Silver Lake City for motorhomes and caravans.',
        mustVerify: [
          'vehicle dimensions and a suitable pitch category',
          'electricity and water conditions for the specific booking',
          'arrival, quiet-time and departure rules',
          'current benefits and Rust bus timetable',
        ],
      },
      'official-tent-camping': {
        label: 'Europa-Park Camping',
        definition:
          'Campsite in Silver Lake City for guests with their own tent.',
        mustVerify: [
          'tent and pitch rules',
          'electricity needs and connection conditions',
          'bathroom facilities and breakfast options',
          'weather, quiet hours and current guest benefits',
        ],
      },
      'independent-hotel-or-guesthouse-rust': {
        label: 'Independent hotel or guest house in Rust',
        definition:
          'Accommodation operated by an independent business within the municipality of Rust.',
        mustVerify: [
          'current operating and booking availability',
          'actual walking route to the entrance you need',
          'breakfast, parking, cancellation and accessibility',
          'do not assume resort-hotel benefits',
        ],
      },
      'independent-holiday-apartment-rust': {
        label: 'Independent holiday apartment in Rust',
        definition:
          'Independent accommodation listed by the municipality of Rust as a holiday apartment.',
        mustVerify: [
          'kitchen and dining equipment rather than inferring it from the category',
          'actual walking route to the entrance you need',
          'minimum stay, final cleaning, parking and cancellation',
          'current registration and availability',
        ],
      },
      'accommodation-nearby-municipalities': {
        label: 'Accommodation in a nearby municipality',
        definition:
          'Independent accommodation outside Rust in a municipality within the Europa-Park Erlebnisregion.',
        mustVerify: [
          'connections on the specific weekday and at park closing time',
          'last return service and changes',
          'parking at the destination and accommodation',
          'current operating and booking availability',
        ],
      },
    },
  },
  restaurantFinder: {
    eyebrow: 'Verified directory',
    title: 'Compare smaller restaurants in Rust objectively',
    intro:
      'Search eight editorially checked directory listings. Only documented features are shown; no claims are made about quality, price level or table availability.',
    filtersLabel: 'Filter restaurants',
    searchLabel: 'Name or address',
    searchPlaceholder: 'For example, Adler or Fischerstraße',
    statusLabel: 'Verification status',
    allStatuses: 'All verification statuses',
    statuses: {
      first_party_verified: 'Verified by an operator source',
      public_directory_verified: 'Verified in the municipal directory',
      license_page_verified: 'Verified through a licence page',
      needs_reverification: 'Needs rechecking',
    },
    timeLabel: 'Documented time slot',
    allTimes: 'All documented time slots',
    timeSlots: {
      breakfast: 'Breakfast',
      evening: 'Evening service',
    },
    distanceLabel: 'Documented distance',
    allDistances: 'All documented distances',
    distanceOptions: [
      { maxMetres: 500, label: 'Up to 500 m' },
      { maxMetres: 1000, label: 'Up to 1 km' },
      { maxMetres: 2000, label: 'Up to 2 km' },
    ],
    needsLabel: 'Documented needs',
    familyFeatures: {
      kids_menu: 'Children’s menu mentioned',
    },
    dietFeatures: {
      vegetarian_evidence: 'Vegetarian options documented',
      vegan_evidence: 'Vegan options documented',
      gluten_free_evidence: 'Gluten-free options documented',
    },
    reset: 'Reset filters',
    resultsLabel: 'Checked directory listings',
    resultSingular: 'restaurant',
    resultPlural: 'restaurants',
    noJs:
      'Without JavaScript, all listings, sources and uncertainties remain readable; only search and filters are missing.',
    emptyTitle: 'No listing matches these filters',
    emptyText:
      'Remove a filter. No matches can also mean that the feature is not yet reliably documented.',
    serviceEvidence: 'Documented service',
    cuisineEvidence: 'Documented cuisine',
    filterEvidence: 'Filter evidence',
    evidenceCheckedAt: 'Filter evidence checked',
    source: 'Primary source',
    operatorWebsite: 'Operator website',
    corroboratingSource: 'Additional source',
    uncertaintyTitle: 'What remains to be checked before your visit',
    verificationNote: 'Verification note',
    checkedAt: 'Listing checked',
    reviewDue: 'Review date passed',
    notRecommendation: 'Not a recommendation',
    notRecommendationTitle: 'Neutral directory, not a best-of list',
    notRecommendationText:
      'Inclusion and order are not a quality judgement. Check opening hours, menu, allergens and reservations directly with the business.',
    unavailableEvidenceTitle: 'Filters we deliberately do not show',
    unavailableEvidence: {
      time: 'Time slots are not yet documented consistently enough.',
      distance: 'Distances have not yet been measured using one consistent route.',
      family: 'Family features are not yet documented sufficiently.',
      diet: 'Vegetarian, vegan and gluten-free options are not yet recorded reliably enough.',
    },
    entryContent: {
      'gasthaus-adler-rust': {
        cuisineEvidence: ['traditional home-style cooking'],
        serviceEvidence: ['evening service according to the operator website'],
        verificationNote:
          'The operator website and legal notice were accessible; the address, contact details, cuisine and current opening information were displayed on the review date.',
        uncertainties: [
          'Special openings and business holidays depend on the date.',
          'Reservation availability was not checked.',
        ],
      },
      'hardys-rust': {
        cuisineEvidence: [
          'regional and international dishes',
          'burgers, ribs, pasta and steak according to the operator',
        ],
        serviceEvidence: [
          'breakfast according to the operator website',
          'evening service according to the operator website',
        ],
        verificationNote:
          'The operator website was accessible and listed the address, food profile and breakfast service.',
        uncertainties: [
          'Live opening status on the website can change at short notice.',
          'Self-description and embedded reviews were not used as evidence of quality.',
        ],
      },
      'casa-rustica-rust': {
        cuisineEvidence: ['Italian cuisine'],
        serviceEvidence: ['evening service according to the municipal directory'],
        verificationNote:
          'The operator website confirms the business, address and Italian restaurant; the municipal directory provides a current opening-hours framework.',
        uncertainties: [
          'Confirm opening hours on the operator website or by phone before your visit.',
          'The walking time to the park stated by the operator was not independently measured.',
        ],
      },
      'hotel-restaurant-mythos': {
        cuisineEvidence: ['Greek and international cuisine'],
        serviceEvidence: ['children’s menu according to the operator website'],
        verificationNote:
          'The operator website was accessible and confirmed the address, cuisine and reservation contact.',
        uncertainties: [
          'The readable website content does not state stable weekly opening hours.',
          'Table availability was not checked.',
        ],
      },
      'kaiserstuehler-hof-rust': {
        cuisineEvidence: ['Baden cuisine', 'regional dishes'],
        serviceEvidence: ['evening service according to the operator website'],
        verificationNote:
          'The operator website was accessible and listed the address, Baden cuisine and current weekly schedule.',
        uncertainties: [
          'Check business holidays and the closing day again before your visit.',
          'No claims about suitability for allergies without asking directly.',
        ],
      },
      'restaurant-fenix-rust': {
        cuisineEvidence: ['the primary source does not clearly name the cuisine'],
        serviceEvidence: ['evening service according to the operator website'],
        verificationNote:
          'The operator website and municipal listing confirm the business, address and contact details. Marketing claims were not included.',
        uncertainties: [
          'Manually check the cuisine against the current menu before editorial categorisation.',
          'The operator website lists different opening hours from third-party platforms; use operator information only.',
        ],
      },
      'la-terrassa-rust': {
        cuisineEvidence: ['the municipal listing does not state the cuisine'],
        serviceEvidence: ['terrace according to the municipal directory'],
        verificationNote:
          'The restaurant is listed in the current municipal directory; the linked business website mainly describes the guest house and does not confirm restaurant details.',
        uncertainties: [
          'Confirm operating status, cuisine and opening hours directly with the business.',
          'Do not highlight it as an editorially checked restaurant option until it is directly confirmed.',
        ],
      },
      'my-denis-rust': {
        cuisineEvidence: ['the municipal listing does not state the cuisine'],
        serviceEvidence: ['delivery according to the municipal directory'],
        verificationNote:
          'Only found in the municipal directory; no reliable first-party website was found on the review date.',
        uncertainties: [
          'Confirm operating status, contact details, cuisine and opening hours directly.',
          'Do not include it in user recommendations or rankings until a first-party source has been checked.',
        ],
      },
    },
  },
  resortPassTool: {
    eyebrow: 'ResortPass decision guide',
    title: 'Check status, benefits and real costs together',
    intro:
      'The live status answers whether the pass is available to buy. The comparison and calculator then help you choose between day tickets, Silver and Gold.',
    statusTitle: 'Current sales status',
    statusChecking: 'Checking status…',
    statusAvailable: 'Officially available now',
    statusUnavailable: 'Currently unavailable',
    statusUnknown: 'Status currently unclear',
    statusError: 'Live status could not be loaded',
    lastChecked: 'Last checked',
    comparisonTitle: 'Silver and Gold at a glance',
    feature: 'Feature',
    silver: 'Silver',
    gold: 'Gold',
    adultPrice: 'Adult price',
    concessionPrice: 'Children 4–11 / seniors aged 60 and over',
    visitDays: 'Visit days',
    visitDaysSilver: 'Defined, published visit days',
    visitDaysGold: 'Greater flexibility under current conditions',
    rulanticaBenefit: 'Rulantica',
    rulanticaSilver: 'Not included as a standard benefit',
    rulanticaGold: 'Two day tickets under current conditions',
    flexibility: 'Planning profile',
    flexibilitySilver: 'For dates that can be planned early',
    flexibilityGold: 'For more frequent or spontaneous visits',
    calculatorTitle: 'Simple adult cost comparison',
    calculatorIntro:
      'Compare the latest verified pass prices with your chosen number of Europa-Park and Rulantica day visits.',
    visitsLabel: 'Europa-Park visits',
    rulanticaVisitsLabel: 'Rulantica day visits',
    priceScenarioLabel: 'Day-ticket price scenario',
    lowerPriceScenario: 'Lower verified price range',
    upperPriceScenario: 'Upper verified price range',
    calculate: 'Update comparison',
    dayTicketsCost: 'Individual day tickets',
    silverCost: 'Silver plus Rulantica tickets',
    goldCost: 'Gold with two included Rulantica days',
    lowestCost: 'Lowest calculated amount',
    estimateDisclaimer:
      'Guidance for one adult, not a purchase or availability guarantee. Excluded days, reservations, concessions, travel and unused benefits can change the decision.',
    linksTitle: 'Answer your next question directly',
    compareLink: 'Compare Silver and Gold',
    pricesLink: 'Check ResortPass prices',
    reservationLink: 'Understand reservations',
    rulanticaLink: 'ResortPass and Rulantica',
  },
};
