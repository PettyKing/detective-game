import type {
  CharacterId,
  EvidenceId,
  FactId,
  LocationId,
  SearchZoneId,
  WarrantId,
} from "./ids.js";

import type {
  DomainSchemaVersion,
  IsoDateTimeString,
  LegalDecision,
} from "./common.js";

export type ConsentStatus =
  | "NONE"
  | "REQUESTED"
  | "GRANTED"
  | "LIMITED"
  | "REVOKED"
  | "REFUSED";

export type SearchAuthorityBasis =
  | "PUBLIC_ACCESS"
  | "OWNER_CONSENT"
  | "AUTHORIZED_OCCUPANT_CONSENT"
  | "VALID_WARRANT"
  | "INCIDENT_TO_ARREST"
  | "EXIGENT_CIRCUMSTANCE"
  | "OTHER_AUTHORED_EXCEPTION";

export type DetentionValidity =
  | "VALID"
  | "INVALID_INSUFFICIENT_REASONABLE_SUSPICION"
  | "INVALID_SCOPE"
  | "INVALID_DURATION"
  | "INVALID_PROCEDURAL";

export type ArrestValidity =
  | "VALID"
  | "INVALID_INSUFFICIENT_PROBABLE_CAUSE"
  | "INVALID_PROCEDURAL"
  | "INVALID_TARGET_STATE";

export type WarrantDecision =
  | "APPROVED"
  | "DENIED";

export interface ConsentScope {
  characterId: CharacterId;
  locationId: LocationId;
  zoneIds: SearchZoneId[];
  status: ConsentStatus;
  grantedAt?: IsoDateTimeString;
  revokedAt?: IsoDateTimeString;
}

export interface SearchAuthorityContext {
  locationId: LocationId;
  zoneIds: SearchZoneId[];
  authorityBasis?: SearchAuthorityBasis;
  consentingCharacterId?: CharacterId;
  warrantId?: WarrantId;
  knownFactIds: FactId[];
}

export interface SearchAuthorityResult {
  decision: LegalDecision;
  authorizedZoneIds: SearchZoneId[];
  unauthorizedZoneIds: SearchZoneId[];
  authorityBasis?: SearchAuthorityBasis;
  reasonCodes: string[];
}

export interface ReasonableSuspicionContext {
  characterId: CharacterId;
  knownFactIds: FactId[];
  legallyUsableFactIds: FactId[];
}

export interface ReasonableSuspicionResult {
  decision: LegalDecision;
  supportingFactIds: FactId[];
  reasonCodes: string[];
}

export interface DetentionContext {
  characterId: CharacterId;
  knownFactIds: FactId[];
  legallyUsableFactIds: FactId[];
  purpose: string;
  durationMinutes: number;
  locationId: LocationId;
}

export interface DetentionResult {
  validity: DetentionValidity;
  supportingFactIds: FactId[];
  reasonCodes: string[];
}

export interface ProbableCauseContext {
  characterId: CharacterId;
  knownFactIds: FactId[];
  legallyUsableFactIds: FactId[];
  relatedEvidenceIds: EvidenceId[];
}

export interface ProbableCauseResult {
  decision: LegalDecision;
  supportingFactIds: FactId[];
  supportingEvidenceIds: EvidenceId[];
  reasonCodes: string[];
}

export interface ArrestContext {
  characterId: CharacterId;
  probableCause: ProbableCauseResult;
  locationId: LocationId;
  existingWarrantId?: WarrantId;
}

export interface ArrestResult {
  validity: ArrestValidity;
  reasonCodes: string[];
}

export interface WarrantApplicationContext {
  locationId: LocationId;
  requestedZoneIds: SearchZoneId[];
  supportingFactIds: FactId[];
  legallyUsableFactIds: FactId[];
  requestedObjectCategories: string[];
}

export interface WarrantEvaluationResult {
  decision: WarrantDecision;
  authorizedZoneIds: SearchZoneId[];
  authorizedObjectCategories: string[];
  supportingFactIds: FactId[];
  reasonCodes: string[];
}

export interface WarrantDefinition {
  schemaVersion: DomainSchemaVersion;
  id: WarrantId;
  locationId: LocationId;
  authorizedZoneIds: SearchZoneId[];
  authorizedObjectCategories: string[];
  supportingFactIds: FactId[];
  issuedAt: IsoDateTimeString;
  expiresAt: IsoDateTimeString;
}

export interface LegalRulesEngine {
  evaluateSearchAuthority(
    context: SearchAuthorityContext,
  ): SearchAuthorityResult;

  evaluateReasonableSuspicion(
    context: ReasonableSuspicionContext,
  ): ReasonableSuspicionResult;

  evaluateDetention(
    context: DetentionContext,
  ): DetentionResult;

  evaluateProbableCause(
    context: ProbableCauseContext,
  ): ProbableCauseResult;

  evaluateArrest(
    context: ArrestContext,
  ): ArrestResult;

  evaluateWarrantApplication(
    context: WarrantApplicationContext,
  ): WarrantEvaluationResult;
}