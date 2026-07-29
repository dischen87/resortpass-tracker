export type PlanningPageKey =
  | 'parkGuide'
  | 'visitPlanner'
  | 'costCalculator'
  | 'familyGuide'
  | 'rulanticaGuide'
  | 'stayGuide'
  | 'restaurantGuide'
  | 'resortPassGuide'
  | 'resortPassCompare'
  | 'resortPassPrices'
  | 'resortPassReservation'
  | 'resortPassRulantica';

export interface PlanningPoint {
  title: string;
  text: string;
  icon: string;
}

export interface PlanningFaqCopy {
  question: string;
  answer: string;
}

export interface PlanningPageContent {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  answer: string;
  sectionTitle: string;
  sectionIntro: string;
  points: [PlanningPoint, PlanningPoint, PlanningPoint];
  faqs: [PlanningFaqCopy, PlanningFaqCopy, PlanningFaqCopy];
}

export interface PlanningCommonCopy {
  skip: string;
  menu: string;
  language: string;
  home: string;
  plannerLabel: string;
  answerLabel: string;
  updatedLabel: string;
  sourcePrefix: string;
  onThisPage: string;
  relatedTitle: string;
  sourcesTitle: string;
  sourcesIntro: string;
  correctionLabel: string;
  correctionText: string;
  unofficial: string;
  footerText: string;
  overview: string;
  tool: string;
  decisions: string;
  faq: string;
  notRecommendation: string;
  verifyBeforeVisit: string;
}

export interface PlanningNavigationCopy {
  parkGuide: string;
  visitPlanner: string;
  costCalculator: string;
  familyGuide: string;
  rulanticaGuide: string;
  stayGuide: string;
  restaurantGuide: string;
  resortPassGuide: string;
}

export interface VisitPlannerLocaleCopy {
  eyebrow: string;
  title: string;
  intro: string;
  dateLabel: string;
  daysLabel: string;
  days: [string, string, string];
  groupLabel: string;
  groups: {
    balanced: string;
    family: string;
    thrill: string;
    shows: string;
  };
  arrivalLabel: string;
  arrivals: {
    early: string;
    opening: string;
    late: string;
  };
  crowdLabel: string;
  crowds: {
    low: string;
    medium: string;
    high: string;
  };
  rulanticaLabel: string;
  submit: string;
  resultTitle: string;
  resultLead: string;
  resultDays: string;
  routeLabel: string;
  morning: string;
  midday: string;
  afternoon: string;
  evening: string;
  notes: {
    early: string;
    late: string;
    busy: string;
    rulantica: string;
    family: string;
    thrill: string;
    shows: string;
  };
  routes: {
    balanced: [string, string, string, string];
    family: [string, string, string, string];
    thrill: [string, string, string, string];
    shows: [string, string, string, string];
  };
  disclaimer: string;
  forecastCta: string;
}

export interface CostCalculatorLocaleCopy {
  eyebrow: string;
  title: string;
  intro: string;
  adults: string;
  children: string;
  days: string;
  oneDay: string;
  twoDays: string;
  rulantica: string;
  rulanticaOptions: {
    none: string;
    day: string;
    evening: string;
    moonlight: string;
  };
  parking: string;
  nights: string;
  lodgingPerNight: string;
  calculate: string;
  resultEyebrow: string;
  total: string;
  rangeConnector: string;
  perPerson: string;
  breakdown: string;
  europaParkTickets: string;
  rulanticaTickets: string;
  parkingCost: string;
  lodgingCost: string;
  variableNote: string;
  assumptionNote: string;
  currency: string;
}

export interface FamilyFinderLocaleCopy {
  eyebrow: string;
  title: string;
  intro: string;
  age: string;
  height: string;
  interest: string;
  interests: {
    all: string;
    calm: string;
    family: string;
    thrill: string;
    indoor: string;
  };
  submit: string;
  resultTitle: string;
  resultCount: string;
  eligible: string;
  accompanied: string;
  notYet: string;
  minimum: string;
  years: string;
  centimeters: string;
  indoor: string;
  source: string;
  noResults: string;
  disclaimer: string;
  officialFilter: string;
}

export interface RulanticaPlannerLocaleCopy {
  eyebrow: string;
  title: string;
  intro: string;
  parkDays: string;
  parkDayOptions: [string, string, string];
  children: string;
  childOptions: [string, string, string];
  waterPriority: string;
  priorityOptions: [string, string, string];
  energy: string;
  energyOptions: [string, string, string];
  submit: string;
  resultLabel: string;
  recommendations: {
    day: { title: string; text: string };
    evening: { title: string; text: string };
    moonlight: { title: string; text: string };
    separate: { title: string; text: string };
  };
  checklistTitle: string;
  checklist: [string, string, string, string, string];
  officialNote: string;
  officialCta: string;
}

export type StayComparisonState =
  | 'verified'
  | 'available_for_this_type'
  | 'not_applicable'
  | 'varies_by_property'
  | 'must_verify';

export type StayPriority =
  | 'operatorGuestBenefits'
  | 'selfCatering'
  | 'ownSleepingUnitRequired'
  | 'groupFormats'
  | 'walkingAccess'
  | 'shuttleOrTransit';

export interface StayComparatorLocaleCopy {
  eyebrow: string;
  title: string;
  intro: string;
  filtersLabel: string;
  scenarioLabel: string;
  allScenarios: string;
  prioritiesLabel: string;
  priorities: Record<StayPriority, string>;
  reset: string;
  resultsLabel: string;
  resultSingular: string;
  resultPlural: string;
  operatorRelation: {
    resort_operated: string;
    independent: string;
  };
  states: Record<StayComparisonState, string>;
  verifyTitle: string;
  source: string;
  checkedAt: string;
  emptyTitle: string;
  emptyText: string;
  priceNoteTitle: string;
  priceNoteText: string;
  notRanking: string;
  noJs: string;
  scenarioLabels: Record<AccommodationScenarioId, string>;
  typeContent: Record<
    AccommodationTypeId,
    {
      label: string;
      definition: string;
      mustVerify: readonly string[];
    }
  >;
}

export type RestaurantTimeSlot = 'breakfast' | 'evening';
export type RestaurantFamilyFeature = 'kids_menu';
export type RestaurantDietFeature =
  | 'vegetarian_evidence'
  | 'vegan_evidence'
  | 'gluten_free_evidence';

export interface RestaurantFinderLocaleCopy {
  eyebrow: string;
  title: string;
  intro: string;
  filtersLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  statusLabel: string;
  allStatuses: string;
  statuses: Record<VerificationStatus, string>;
  timeLabel: string;
  allTimes: string;
  timeSlots: Record<RestaurantTimeSlot, string>;
  distanceLabel: string;
  allDistances: string;
  distanceOptions: readonly {
    maxMetres: number;
    label: string;
  }[];
  needsLabel: string;
  familyFeatures: Record<RestaurantFamilyFeature, string>;
  dietFeatures: Record<RestaurantDietFeature, string>;
  reset: string;
  resultsLabel: string;
  resultSingular: string;
  resultPlural: string;
  noJs: string;
  emptyTitle: string;
  emptyText: string;
  serviceEvidence: string;
  cuisineEvidence: string;
  filterEvidence: string;
  evidenceCheckedAt: string;
  source: string;
  operatorWebsite: string;
  corroboratingSource: string;
  uncertaintyTitle: string;
  verificationNote: string;
  checkedAt: string;
  reviewDue: string;
  notRecommendation: string;
  notRecommendationTitle: string;
  notRecommendationText: string;
  unavailableEvidenceTitle: string;
  unavailableEvidence: {
    time: string;
    distance: string;
    family: string;
    diet: string;
  };
  entryContent: Record<
    RestaurantDirectoryId,
    {
      cuisineEvidence: readonly string[];
      serviceEvidence: readonly string[];
      verificationNote: string;
      uncertainties: readonly string[];
    }
  >;
}

export interface ResortPassToolLocaleCopy {
  eyebrow: string;
  title: string;
  intro: string;
  statusTitle: string;
  statusChecking: string;
  statusAvailable: string;
  statusUnavailable: string;
  statusUnknown: string;
  statusError: string;
  lastChecked: string;
  comparisonTitle: string;
  feature: string;
  silver: string;
  gold: string;
  adultPrice: string;
  concessionPrice: string;
  visitDays: string;
  visitDaysSilver: string;
  visitDaysGold: string;
  rulanticaBenefit: string;
  rulanticaSilver: string;
  rulanticaGold: string;
  flexibility: string;
  flexibilitySilver: string;
  flexibilityGold: string;
  calculatorTitle: string;
  calculatorIntro: string;
  visitsLabel: string;
  rulanticaVisitsLabel: string;
  priceScenarioLabel: string;
  lowerPriceScenario: string;
  upperPriceScenario: string;
  calculate: string;
  dayTicketsCost: string;
  silverCost: string;
  goldCost: string;
  lowestCost: string;
  estimateDisclaimer: string;
  linksTitle: string;
  compareLink: string;
  pricesLink: string;
  reservationLink: string;
  rulanticaLink: string;
}

export interface PlanningLocalePack {
  common: PlanningCommonCopy;
  navigation: PlanningNavigationCopy;
  pages: Record<PlanningPageKey, PlanningPageContent>;
  visitPlanner: VisitPlannerLocaleCopy;
  costCalculator: CostCalculatorLocaleCopy;
  familyFinder: FamilyFinderLocaleCopy;
  rulanticaPlanner: RulanticaPlannerLocaleCopy;
  stayComparator: StayComparatorLocaleCopy;
  restaurantFinder: RestaurantFinderLocaleCopy;
  resortPassTool: ResortPassToolLocaleCopy;
}
import type {
  AccommodationScenarioId,
  AccommodationTypeId,
} from '../data/accommodations';
import type { RestaurantDirectoryId } from '../data/restaurants';
import type { VerificationStatus } from '../data/types';
