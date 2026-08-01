/**
 * The Europa-Park ride inventory — our own editorial data, not provider data.
 *
 * This exists so the wait-times page has substance without JavaScript: the
 * directory of what exists renders at build time and is therefore visible to
 * search crawlers and to answer engines, which do not execute JS. Only the
 * live minute values come from ParkQueueTimes and stay client-side.
 *
 * `providerName` is the exact string ParkQueueTimes returns and is the join key
 * against `server/wait-times.ts`. It must not be "corrected" — the server
 * allowlist matches on it. `name` is what we show German-language visitors,
 * `aliases` keeps both spellings searchable.
 */

export type RideLand =
  | 'Austria'
  | 'Croatia'
  | 'England'
  | 'France'
  | 'Germany'
  | 'Greece'
  | 'Iceland'
  | 'Ireland'
  | 'Italy'
  | 'Luxembourg'
  | 'Minimoys Kingdom'
  | 'Netherlands'
  | 'Portugal'
  | 'Russia'
  | 'Scandinavia'
  | 'Spain'
  | 'Switzerland';

export type RideKind = 'coaster' | 'water' | 'dark' | 'family' | 'thrill' | 'show';

export interface RideRecord {
  /** Stable slug for anchors and favourites. Never renamed. */
  slug: string;
  /** Exact ParkQueueTimes name. Join key — do not edit for style. */
  providerName: string;
  /** Display name for German-language pages. */
  name: string;
  land: RideLand;
  kind: RideKind;
  /** Headliners get priority placement when the park is open. */
  headliner?: true;
  /** Extra search terms; the provider spelling is added automatically. */
  aliases?: readonly string[];
}

export const rides: readonly RideRecord[] = [
  // Austria
  { slug: 'alpine-express-enzian', providerName: "Alpine Express 'Enzian'", name: "Alpine Express ‚Enzian‘", land: 'Austria', kind: 'coaster' },
  { slug: 'josefinas-imperial-journey', providerName: 'Josefina’s Magical Imperial Journey', name: 'Josefinas Kaiserliche Zauberreise', land: 'Austria', kind: 'dark' },
  { slug: 'tiroler-wildwasserbahn', providerName: 'Tirol Log Flume', name: 'Tiroler Wildwasserbahn', land: 'Austria', kind: 'water' },
  { slug: 'vienna-wave-swing', providerName: "Vienna Wave Swing - 'Glückspilz'", name: 'Wiener Wellenflug ‚Glückspilz‘', land: 'Austria', kind: 'family' },

  // Croatia
  { slug: 'voltron-nevera', providerName: 'Voltron Nevera powered by Rimac', name: 'Voltron Nevera powered by Rimac', land: 'Croatia', kind: 'coaster', headliner: true, aliases: ['Voltron'] },

  // England
  { slug: 'arena-of-football', providerName: 'Arena of Football - Be Part of It!', name: 'Arena of Football – Be Part of It!', land: 'England', kind: 'family' },

  // France
  { slug: 'euro-tower', providerName: 'Euro-Tower', name: 'Euro-Tower', land: 'France', kind: 'family' },
  { slug: 'eurosat-cancan-coaster', providerName: 'Eurosat - CanCan Coaster', name: 'Eurosat – CanCan Coaster', land: 'France', kind: 'coaster', headliner: true, aliases: ['Eurosat'] },
  { slug: 'eurosat-coastiality', providerName: 'Eurosat Coastiality', name: 'Eurosat Coastiality', land: 'France', kind: 'coaster', aliases: ['VR'] },
  { slug: 'madame-freudenreich-curiosites', providerName: 'Madame Freudenreich Curiosités', name: 'Madame Freudenreich Curiosités', land: 'France', kind: 'dark' },
  { slug: 'silver-star', providerName: 'Silver Star', name: 'Silver Star', land: 'France', kind: 'coaster', headliner: true },

  // Germany
  { slug: 'jim-knopf', providerName: 'Jim Button – Journey through Morrowland', name: 'Jim Knopf – Reise durch Lummerland', land: 'Germany', kind: 'dark', aliases: ['Jim Button', 'Lummerland'] },
  { slug: 'voletarium', providerName: 'Voletarium', name: 'Voletarium', land: 'Germany', kind: 'family', headliner: true },

  // Greece
  { slug: 'atlantis-adventure', providerName: 'Atlantis Adventure', name: 'Atlantis Adventure', land: 'Greece', kind: 'dark' },
  { slug: 'pegasus', providerName: 'Pegasus', name: 'Pegasus', land: 'Greece', kind: 'coaster' },
  { slug: 'poseidon', providerName: 'Water rollercoaster Poseidon', name: 'Wasserachterbahn Poseidon', land: 'Greece', kind: 'water', headliner: true, aliases: ['Poseidon'] },

  // Iceland
  { slug: 'blue-fire-megacoaster', providerName: 'blue fire Megacoaster', name: 'blue fire Megacoaster', land: 'Iceland', kind: 'coaster', headliner: true, aliases: ['bluefire'] },
  { slug: 'whale-adventures', providerName: 'Whale Adventures - Northern Lights', name: 'Whale Adventures – Northern Lights', land: 'Iceland', kind: 'family' },
  { slug: 'wodan-timburcoaster', providerName: 'WODAN - Timburcoaster', name: 'WODAN – Timburcoaster', land: 'Iceland', kind: 'coaster', headliner: true, aliases: ['Wodan'] },

  // Ireland
  { slug: 'baaa-express', providerName: 'Ba-a-a Express', name: 'Ba-a-a-Express', land: 'Ireland', kind: 'coaster' },
  { slug: 'dancing-dingie', providerName: 'Dancing Dingie', name: 'Dancing Dingie', land: 'Ireland', kind: 'water' },
  { slug: 'old-mac-donalds-tractor-fun', providerName: "Old Mac Donald's Tractor Fun", name: 'Old Mac Donald’s Tractor Fun', land: 'Ireland', kind: 'family' },

  // Italy
  { slug: 'castello-dei-medici', providerName: 'Castello dei Medici', name: 'Castello dei Medici', land: 'Italy', kind: 'water' },
  { slug: 'volo-da-vinci', providerName: 'Volo da Vinci', name: 'Volo da Vinci', land: 'Italy', kind: 'family' },

  // Luxembourg
  { slug: 'grand-prix-edventure', providerName: 'GRAND PRIX EDventure', name: 'GRAND PRIX EDventure', land: 'Luxembourg', kind: 'family' },

  // Minimoys Kingdom
  { slug: 'arthur', providerName: 'ARTHUR', name: 'ARTHUR – Im Königreich der Minimoys', land: 'Minimoys Kingdom', kind: 'dark', headliner: true, aliases: ['Arthur'] },
  { slug: 'poppy-towers', providerName: 'Poppy Towers', name: 'Poppy Towers', land: 'Minimoys Kingdom', kind: 'family' },

  // Netherlands
  { slug: 'piraten-in-batavia', providerName: 'Pirates in Batavia', name: 'Piraten in Batavia', land: 'Netherlands', kind: 'dark', aliases: ['Pirates in Batavia'] },

  // Portugal
  { slug: 'atlantica-supersplash', providerName: 'Atlantica SuperSplash', name: 'Atlantica SuperSplash', land: 'Portugal', kind: 'water', headliner: true },

  // Russia
  { slug: 'euro-mir', providerName: 'Euro-Mir', name: 'Euro-Mir', land: 'Russia', kind: 'coaster', headliner: true },

  // Scandinavia
  { slug: 'fjord-rafting', providerName: 'Fjord-Rafting', name: 'Fjord-Rafting', land: 'Scandinavia', kind: 'water' },
  { slug: 'snorri-touren', providerName: 'Snorri Touren', name: 'Snorri Touren', land: 'Scandinavia', kind: 'family' },
  { slug: 'vindjammer', providerName: 'Vindjammer', name: 'Vindjammer', land: 'Scandinavia', kind: 'family' },

  // Spain
  { slug: 'kolumbusjolle', providerName: 'Kolumbusjolle', name: 'Kolumbusjolle', land: 'Spain', kind: 'water' },

  // Switzerland
  { slug: 'matterhorn-blitz', providerName: 'Matterhorn-Blitz', name: 'Matterhorn-Blitz', land: 'Switzerland', kind: 'coaster' },
  { slug: 'schweizer-bobbahn', providerName: 'Swiss Bob Run', name: 'Schweizer Bobbahn', land: 'Switzerland', kind: 'coaster', aliases: ['Swiss Bob Run'] },
] as const;

/** Land order follows the park's own themed-area listing, not the alphabet. */
export const rideLands: readonly RideLand[] = [
  'Germany', 'Italy', 'France', 'Switzerland', 'Scandinavia', 'Netherlands',
  'Spain', 'Russia', 'Austria', 'Greece', 'England', 'Ireland', 'Iceland',
  'Portugal', 'Luxembourg', 'Croatia', 'Minimoys Kingdom',
];

export function ridesByLand(): { land: RideLand; rides: RideRecord[] }[] {
  return rideLands
    .map((land) => ({ land, rides: rides.filter((ride) => ride.land === land) }))
    .filter((group) => group.rides.length > 0);
}

/** Every term a visitor might type for this ride, including both spellings. */
export function rideSearchTerms(ride: RideRecord): string[] {
  return [ride.name, ride.providerName, ...(ride.aliases || [])];
}
