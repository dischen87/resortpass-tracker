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
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 3,
    verifiedStatus: "license_page_verified",
    downloaded: false,
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
    checkedAt: CHECKED_AT,
    nextReviewAt: NEXT_REVIEW,
    sourcePriority: 3,
    verifiedStatus: "license_page_verified",
    downloaded: false,
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
] as const satisfies readonly LicensedMediaEntry[];
