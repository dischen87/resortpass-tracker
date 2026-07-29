export type ISODate = `${number}-${number}-${number}`;
export type HTTPSUrl = `https://${string}`;

/**
 * Source ranking used throughout the content data:
 * 1 = owner/operator or other first-party source
 * 2 = public authority or official destination organisation
 * 3 = rights registry carrying author/license metadata
 */
export type SourcePriority = 1 | 2 | 3;

export type VerificationConfidence =
  | "confirmed"
  | "confirmed_with_qualifier"
  | "operator_claim_context_limited";

export interface SourcedFact {
  id: string;
  topic:
    | "europa_park"
    | "rulantica"
    | "resort_accommodation"
    | "transport";
  label: string;
  value: string | number | boolean;
  unit: string;
  qualifier: "exact" | "more_than" | "at_least" | "approximately";
  validFrom: ISODate | null;
  validUntil: ISODate | null;
  sourceUrl: HTTPSUrl;
  checkedAt: ISODate;
  nextReviewAt: ISODate;
  sourcePriority: SourcePriority;
  confidence: VerificationConfidence;
  caveat: string | null;
}

export type VerificationStatus =
  | "first_party_verified"
  | "public_directory_verified"
  | "license_page_verified"
  | "needs_reverification";

export interface SourceAudit {
  sourceUrl: HTTPSUrl;
  checkedAt: ISODate;
  nextReviewAt: ISODate;
  sourcePriority: SourcePriority;
  verifiedStatus: VerificationStatus;
}
