import type {
  HTTPSUrl,
  ISODate,
  SourcePriority,
  VerificationStatus,
} from "./types";
import { EDITORIAL_CHECKED_AT } from "./review-dates";

export interface LicensedMediaEntry {
  id: string;
  title: string;
  subject: "europa_park" | "rulantica";
  author: string;
  filePageUrl: HTTPSUrl;
  originalFileUrl: HTTPSUrl;
  sourceRevisionAt: string;
  sourceRevisionSha1: string;
  width: number;
  height: number;
  licenseId: "CC-BY-SA-4.0";
  licenseUrl: HTTPSUrl;
  attributionText: string;
  modificationDisclosureTemplate: string;
  checkedAt: ISODate;
  nextReviewAt: ISODate;
  sourcePriority: SourcePriority;
  verifiedStatus: VerificationStatus;
  downloaded: boolean;
  localPath?: `/${string}`;
  derivativeDescription?: string;
  sourcePageRevisionId?: number;
  /** Exact downloaded input, which can be a standard Wikimedia thumbnail. */
  sourceDownloadUrl?: HTTPSUrl;
  sourceDownloadSha1?: string;
  displayWidth?: number;
  displayHeight?: number;
  cropped?: boolean;
  responsiveVariants?: readonly {
    path: `/${string}`;
    width: number;
    height: number;
  }[];
  usageRisks: readonly string[];
}

const CHECKED_AT = EDITORIAL_CHECKED_AT;
const NEXT_REVIEW = "2027-07-01" as const;
const LICENSE_URL =
  "https://creativecommons.org/licenses/by-sa/4.0/" as const;

/**
 * License records for both reviewed source files and selected local derivatives.
 * The originalFileUrl values are the original-file endpoints resolved through
 * the Wikimedia API at checkedAt. sourceRevisionAt and sourceRevisionSha1 pin
 * the exact revision that was reviewed, because a file can later be replaced.
 */
export const licensedMedia = [
  {
    id: "wikimedia-ep-panorama-2023",
    title: "EP Panorama",
    subject: "europa_park",
    author: "Europa-Park PR",
    filePageUrl: "https://commons.wikimedia.org/wiki/File:EP_Panorama.jpg",
    originalFileUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/ec/EP_Panorama.jpg",
    sourceRevisionAt: "2023-05-08T13:52:10Z",
    sourceRevisionSha1: "b1ea65425186a7d6bd97f90af951463cadf22e2a",
    width: 2560,
    height: 1026,
    licenseId: "CC-BY-SA-4.0",
    licenseUrl: LICENSE_URL,
    attributionText:
      "„EP Panorama“ – Europa-Park PR, CC BY-SA 4.0, via Wikimedia Commons",
    modificationDisclosureTemplate:
      "Bearbeitung: {crop|resize|colour correction|none}.",
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 3,
    verifiedStatus: "license_page_verified",
    downloaded: true,
    localPath: "/images/ep-panorama.webp",
    displayWidth: 1800,
    displayHeight: 721,
    cropped: false,
    responsiveVariants: [
      { path: "/images/ep-panorama-720.webp", width: 720, height: 288 },
      { path: "/images/ep-panorama-1200.webp", width: 1200, height: 481 },
      { path: "/images/ep-panorama.webp", width: 1800, height: 721 },
    ],
    derivativeDescription:
      "Responsive WebP derivative, resized to 1800 px width; metadata stripped; no colour edits.",
    usageRisks: [
      "Bei Bearbeitung müssen die Lizenzbedingungen für die bearbeitete Bildfassung eingehalten werden.",
      "Markenrechte werden durch die Creative-Commons-Lizenz nicht aufgehoben.",
    ],
  },
  {
    id: "wikimedia-ep-voltron-2024",
    title: "EP Voltron",
    subject: "europa_park",
    author: "Europa-Park PR",
    filePageUrl: "https://commons.wikimedia.org/wiki/File:EP_Voltron.jpg",
    originalFileUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/EP_Voltron.jpg",
    sourceRevisionAt: "2024-04-23T06:54:26Z",
    sourceRevisionSha1: "869990027447b31d383f1032a7c04d11bd85ed28",
    width: 2560,
    height: 1707,
    licenseId: "CC-BY-SA-4.0",
    licenseUrl: LICENSE_URL,
    attributionText:
      "„EP Voltron“ – Europa-Park PR, CC BY-SA 4.0, via Wikimedia Commons",
    modificationDisclosureTemplate:
      "Bearbeitung: {crop|resize|colour correction|none}.",
    checkedAt: "2026-09-30",
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 3,
    verifiedStatus: "license_page_verified",
    downloaded: true,
    localPath: "/images/ep-voltron-1200.webp",
    derivativeDescription:
      "Resized to 480, 800 and 1200 px width; converted to WebP (quality 78); metadata stripped; no colour edits.",
    sourcePageRevisionId: 923985204,
    sourceDownloadUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/EP_Voltron.jpg",
    sourceDownloadSha1: "869990027447b31d383f1032a7c04d11bd85ed28",
    displayWidth: 1200,
    displayHeight: 800,
    cropped: false,
    responsiveVariants: [
      { path: "/images/ep-voltron-480.webp", width: 480, height: 320 },
      { path: "/images/ep-voltron-800.webp", width: 800, height: 533 },
      { path: "/images/ep-voltron-1200.webp", width: 1200, height: 800 },
    ],
    usageRisks: [
      "Voltron Nevera und zugehörige Kennzeichen können markenrechtlich geschützt sein.",
      "Keine Nutzung formulieren, die eine offizielle Kooperation oder Empfehlung suggeriert.",
    ],
  },
  {
    id: "wikimedia-europa-park-entrance-2024",
    title: "Eingang Europa Park",
    subject: "europa_park",
    author: "Neulandkrieger",
    filePageUrl:
      "https://commons.wikimedia.org/wiki/File:Eingang_Europa_Park.jpeg",
    originalFileUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c6/Eingang_Europa_Park.jpeg",
    sourceRevisionAt: "2024-05-02T19:52:58Z",
    sourceRevisionSha1: "0977a359885151d2059501deb688f78d692185c4",
    width: 6000,
    height: 4000,
    licenseId: "CC-BY-SA-4.0",
    licenseUrl: LICENSE_URL,
    attributionText:
      "„Eingang Europa Park“ – Neulandkrieger, CC BY-SA 4.0, via Wikimedia Commons",
    modificationDisclosureTemplate:
      "Bearbeitung: {crop|resize|colour correction|none}.",
    checkedAt: "2026-09-30",
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 3,
    verifiedStatus: "license_page_verified",
    downloaded: true,
    localPath: "/images/ep-entrance-1200.webp",
    derivativeDescription:
      "Wikimedia 1280 px thumbnail cropped to 1280 × 390 px at x=0, y=180, excluding foreground guests; resized to 480, 800 and 1200 px width; converted to WebP (quality 78); metadata stripped; no colour edits.",
    sourcePageRevisionId: 1227153754,
    sourceDownloadUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Eingang_Europa_Park.jpeg/1280px-Eingang_Europa_Park.jpeg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    sourceDownloadSha1: "0d6dc924d245c1bdb203df5951420adf5db007a2",
    displayWidth: 1200,
    displayHeight: 366,
    cropped: true,
    responsiveVariants: [
      { path: "/images/ep-entrance-480.webp", width: 480, height: 146 },
      { path: "/images/ep-entrance-800.webp", width: 800, height: 244 },
      { path: "/images/ep-entrance-1200.webp", width: 1200, height: 366 },
    ],
    usageRisks: [
      "Vor Veröffentlichung prüfen, ob erkennbare Personen im gewählten Zuschnitt verbleiben.",
      "Markenrechte am dargestellten Parkeingang werden durch die Bildlizenz nicht aufgehoben.",
    ],
  },
  {
    id: "wikimedia-rulantica-wave-pool-2019",
    title: "Rulantica Wellenbecken",
    subject: "rulantica",
    author: "Bluec",
    filePageUrl:
      "https://commons.wikimedia.org/wiki/File:Rulantica_wellenbecken.jpg",
    originalFileUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5b/Rulantica_wellenbecken.jpg",
    sourceRevisionAt: "2019-11-26T08:33:26Z",
    sourceRevisionSha1: "2eb6b37276980afecddeacc5b0ee7ffd0848d6b9",
    width: 3248,
    height: 2176,
    licenseId: "CC-BY-SA-4.0",
    licenseUrl: LICENSE_URL,
    attributionText:
      "„Rulantica Wellenbecken“ – Bluec, CC BY-SA 4.0, via Wikimedia Commons",
    modificationDisclosureTemplate:
      "Bearbeitung: {crop|resize|colour correction|none}.",
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 3,
    verifiedStatus: "license_page_verified",
    downloaded: true,
    localPath: "/images/rulantica-wave-pool.webp",
    derivativeDescription:
      "Responsive WebP derivative, resized to 1400 px width; metadata stripped; no colour edits.",
    usageRisks: [
      "Vor Veröffentlichung erkennbare Badegäste und insbesondere Minderjährige im finalen Zuschnitt prüfen.",
      "Die Creative-Commons-Lizenz deckt nicht automatisch Persönlichkeits- oder Markenrechte ab.",
    ],
  },
  {
    id: "wikimedia-ep-resort-hotels-2023",
    title: "EP Hotels",
    subject: "europa_park",
    author: "Europa-Park PR",
    filePageUrl: "https://commons.wikimedia.org/wiki/File:EP_Hotels.jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/EP_Hotels.jpg",
    sourceRevisionAt: "2023-05-08T13:44:58Z",
    sourceRevisionSha1: "96d9b77a99a1562c9c3f7dbded6e1b1cb04ef43c",
    width: 2560,
    height: 1567,
    licenseId: "CC-BY-SA-4.0",
    licenseUrl: LICENSE_URL,
    attributionText: "„EP Hotels“ – Europa-Park PR, CC BY-SA 4.0, via Wikimedia Commons",
    modificationDisclosureTemplate:
      "Bearbeitung: {crop|resize|colour correction|none}.",
    checkedAt: "2026-09-30",
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 3,
    verifiedStatus: "license_page_verified",
    downloaded: true,
    localPath: "/images/ep-resort-hotels-1200.webp",
    derivativeDescription: "Resized to 480, 800 and 1200 px width; converted to WebP (quality 78); metadata stripped; no colour edits.",
    sourcePageRevisionId: 1181262274,
    sourceDownloadUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/EP_Hotels.jpg",
    sourceDownloadSha1: "96d9b77a99a1562c9c3f7dbded6e1b1cb04ef43c",
    displayWidth: 1200,
    displayHeight: 735,
    cropped: false,
    responsiveVariants: [
      { path: "/images/ep-resort-hotels-480.webp", width: 480, height: 294 },
      { path: "/images/ep-resort-hotels-800.webp", width: 800, height: 490 },
      { path: "/images/ep-resort-hotels-1200.webp", width: 1200, height: 735 },
    ],
    usageRisks: [
      "Die bearbeiteten Bildfassungen werden ebenfalls unter CC BY-SA 4.0 bereitgestellt.",
      "Markenrechte werden durch die Creative-Commons-Lizenz nicht aufgehoben; keine offizielle Kooperation suggerieren.",
      "Nur die geprüfte lokale Bildfassung verwenden; bei neuen Zuschnitten erkennbare Personen erneut prüfen.",
    ],
  },
  {
    id: "wikimedia-kronasar-lakeside-2023",
    title: "HT22 Kronasar Vattenrytt See-2",
    subject: "rulantica",
    author: "Europa-Park PR",
    filePageUrl: "https://commons.wikimedia.org/wiki/File:HT22_Kronasar_Vattenrytt_See-2.jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/9/92/HT22_Kronasar_Vattenrytt_See-2.jpg",
    sourceRevisionAt: "2023-05-08T13:46:09Z",
    sourceRevisionSha1: "01eb9465b6f42be48d0ccacfac06d0632d91e9fc",
    width: 2560,
    height: 1440,
    licenseId: "CC-BY-SA-4.0",
    licenseUrl: LICENSE_URL,
    attributionText: "„HT22 Kronasar Vattenrytt See-2“ – Europa-Park PR, CC BY-SA 4.0, via Wikimedia Commons",
    modificationDisclosureTemplate:
      "Bearbeitung: {crop|resize|colour correction|none}.",
    checkedAt: "2026-09-30",
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 3,
    verifiedStatus: "license_page_verified",
    downloaded: true,
    localPath: "/images/kronasar-lakeside-1200.webp",
    derivativeDescription: "Derived from the standard Wikimedia 1280 px thumbnail; resized to 480, 800 and 1200 px width; converted to WebP (quality 78); metadata stripped; no colour edits.",
    sourcePageRevisionId: 1023128689,
    sourceDownloadUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/HT22_Kronasar_Vattenrytt_See-2.jpg/1280px-HT22_Kronasar_Vattenrytt_See-2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    sourceDownloadSha1: "908920c7e72db0b634f4f191fb2536ebdf79ddc1",
    displayWidth: 1200,
    displayHeight: 675,
    cropped: false,
    responsiveVariants: [
      { path: "/images/kronasar-lakeside-480.webp", width: 480, height: 270 },
      { path: "/images/kronasar-lakeside-800.webp", width: 800, height: 450 },
      { path: "/images/kronasar-lakeside-1200.webp", width: 1200, height: 675 },
    ],
    usageRisks: [
      "Die bearbeiteten Bildfassungen werden ebenfalls unter CC BY-SA 4.0 bereitgestellt.",
      "Markenrechte werden durch die Creative-Commons-Lizenz nicht aufgehoben; keine offizielle Kooperation suggerieren.",
      "Nur die geprüfte lokale Bildfassung verwenden; bei neuen Zuschnitten erkennbare Personen erneut prüfen.",
    ],
  },
  {
    id: "wikimedia-ep-foodloop-2023",
    title: "EP Foodloop",
    subject: "europa_park",
    author: "Europa-Park PR",
    filePageUrl: "https://commons.wikimedia.org/wiki/File:EP_Foodloop.jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/EP_Foodloop.jpg",
    sourceRevisionAt: "2023-05-08T13:41:32Z",
    sourceRevisionSha1: "94e446559c5d22f9bc5bb07616d7ea1e6ee3479d",
    width: 2560,
    height: 1707,
    licenseId: "CC-BY-SA-4.0",
    licenseUrl: LICENSE_URL,
    attributionText: "„EP Foodloop“ – Europa-Park PR, CC BY-SA 4.0, via Wikimedia Commons",
    modificationDisclosureTemplate:
      "Bearbeitung: {crop|resize|colour correction|none}.",
    checkedAt: "2026-09-30",
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 3,
    verifiedStatus: "license_page_verified",
    downloaded: true,
    localPath: "/images/ep-foodloop-tables-1200.webp",
    derivativeDescription: "Original cropped to 1280 × 900 px at x=1280, y=700, retaining empty tables and excluding visible guests and minors; resized to 480, 800 and 1200 px width; converted to WebP (quality 78); metadata stripped; no colour edits.",
    sourcePageRevisionId: 1220948488,
    sourceDownloadUrl: "https://upload.wikimedia.org/wikipedia/commons/3/31/EP_Foodloop.jpg",
    sourceDownloadSha1: "94e446559c5d22f9bc5bb07616d7ea1e6ee3479d",
    displayWidth: 1200,
    displayHeight: 844,
    cropped: true,
    responsiveVariants: [
      { path: "/images/ep-foodloop-tables-480.webp", width: 480, height: 338 },
      { path: "/images/ep-foodloop-tables-800.webp", width: 800, height: 563 },
      { path: "/images/ep-foodloop-tables-1200.webp", width: 1200, height: 844 },
    ],
    usageRisks: [
      "Die bearbeiteten Bildfassungen werden ebenfalls unter CC BY-SA 4.0 bereitgestellt.",
      "Markenrechte werden durch die Creative-Commons-Lizenz nicht aufgehoben; keine offizielle Kooperation suggerieren.",
      "Nur die geprüfte lokale Bildfassung verwenden; bei neuen Zuschnitten erkennbare Personen erneut prüfen.",
    ],
  },
  {
    id: "wikimedia-rulantica-entrance-hall-2022",
    title: "A a hall rulantica oct 22",
    subject: "rulantica",
    author: "Blackberrijack",
    filePageUrl: "https://commons.wikimedia.org/wiki/File:A_a_hall_rulantica_oct_22.jpg",
    originalFileUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/A_a_hall_rulantica_oct_22.jpg",
    sourceRevisionAt: "2022-12-10T13:56:09Z",
    sourceRevisionSha1: "c24202bdd6ce7e4fed7fd67564b2f703614ad828",
    width: 908,
    height: 1210,
    licenseId: "CC-BY-SA-4.0",
    licenseUrl: LICENSE_URL,
    attributionText: "„A a hall rulantica oct 22“ – Blackberrijack, CC BY-SA 4.0, via Wikimedia Commons",
    modificationDisclosureTemplate:
      "Bearbeitung: {crop|resize|colour correction|none}.",
    checkedAt: "2026-09-30",
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 3,
    verifiedStatus: "license_page_verified",
    downloaded: true,
    localPath: "/images/rulantica-entrance-hall-908.webp",
    derivativeDescription: "Resized to 480 and 800 px width plus original 908 px width; converted to WebP (quality 78); metadata stripped; no colour edits. Historical seasonal decorations from October 2022 remain visible.",
    sourcePageRevisionId: 776652750,
    sourceDownloadUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f9/A_a_hall_rulantica_oct_22.jpg",
    sourceDownloadSha1: "c24202bdd6ce7e4fed7fd67564b2f703614ad828",
    displayWidth: 908,
    displayHeight: 1210,
    cropped: false,
    responsiveVariants: [
      { path: "/images/rulantica-entrance-hall-480.webp", width: 480, height: 640 },
      { path: "/images/rulantica-entrance-hall-800.webp", width: 800, height: 1066 },
      { path: "/images/rulantica-entrance-hall-908.webp", width: 908, height: 1210 },
    ],
    usageRisks: [
      "Die bearbeiteten Bildfassungen werden ebenfalls unter CC BY-SA 4.0 bereitgestellt.",
      "Markenrechte werden durch die Creative-Commons-Lizenz nicht aufgehoben; keine offizielle Kooperation suggerieren.",
      "Historische Aufnahme: saisonale Dekorationen sind keine Aussage zum aktuellen Angebot.",
    ],
  },
] as const satisfies readonly LicensedMediaEntry[];

export type LicensedMediaId = (typeof licensedMedia)[number]["id"];
