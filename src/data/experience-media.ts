import type { GuideRouteKey } from '../i18n/routes';
import type { LicensedMediaId } from './media';
import { getLocaleDefinition, type LocaleCode } from '../i18n/locales';

/** Editorial context images, never a photograph of an unverified offer. */
export const guidePhotos: Record<GuideRouteKey, LicensedMediaId> = {
  parkGuide: 'wikimedia-ep-panorama-2023',
  visitPlanner: 'wikimedia-europa-park-entrance-2024',
  costCalculator: 'wikimedia-ep-foodloop-2023',
  familyGuide: 'wikimedia-ep-panorama-2023',
  rulanticaGuide: 'wikimedia-rulantica-entrance-hall-2022',
  stayGuide: 'wikimedia-ep-resort-hotels-2023',
  restaurantGuide: 'wikimedia-kronasar-lakeside-2023',
  resortPassGuide: 'wikimedia-europa-park-entrance-2024',
  resortPassCompare: 'wikimedia-ep-voltron-2024',
  resortPassPrices: 'wikimedia-europa-park-entrance-2024',
  resortPassReservation: 'wikimedia-europa-park-entrance-2024',
  resortPassRulantica: 'wikimedia-kronasar-lakeside-2023',
};

export function getPhotoContext(mediaId: LicensedMediaId, lang: LocaleCode): string | undefined {
  if (mediaId === 'wikimedia-rulantica-entrance-hall-2022') {
    const photographed = new Date('2022-10-01T12:00:00Z').toLocaleDateString(
      getLocaleDefinition(lang).bcp47, { month: 'long', year: 'numeric', timeZone: 'UTC' },
    );
    return `Rulantica · ${photographed} · Halloween`;
  }
  if (mediaId === 'wikimedia-ep-foodloop-2023') return 'FoodLoop · Europa-Park';
  if (mediaId === 'wikimedia-kronasar-lakeside-2023') return 'Hotel Krønasår';
  return undefined;
}
