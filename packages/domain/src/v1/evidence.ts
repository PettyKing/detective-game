import type {
  CharacterId,
  EvidenceId,
  FactId,
  ForensicRequestId,
  ForensicTestId,
  LocationId,
  SearchZoneId,
} from "./ids.js";

import type {
  CollectionStatus,
  DomainSchemaVersion,
  IsoDateTimeString,
  LegalUsability,
  TestStatus,
} from "./common.js";

export type EvidenceType =
  | "PHYSICAL"
  | "BIOLOGICAL"
  | "TRACE"
  | "DIGITAL"
  | "DOCUMENT"
  | "PHOTOGRAPH"
  | "VIDEO"
  | "AUDIO"
  | "WEAPON"
  | "CLOTHING"
  | "PERSONAL_PROPERTY"
  | "OTHER";

export type EvidenceLegalCollectionStatus =
  | "UNKNOWN"
  | "LAWFUL"
  | "DISPUTED"
  | "UNLAWFUL";

export type ChainOfCustodyAction =
  | "DISCOVERED"
  | "COLLECTED"
  | "TRANSFERRED"
  | "RECEIVED"
  | "SUBMITTED_FOR_TESTING"
  | "RETURNED_FROM_TESTING"
  | "STORED"
  | "RELEASED";

export type ContaminationStatus =
  | "NONE"
  | "POSSIBLE"
  | "CONFIRMED";

export interface EvidencePublicPresentation {
  displayName: string;
  description: string;
  mediaAssetRef?: string;
}

export interface EvidenceDiscoveryDefinition {
  discoveryRuleIds: string[];
  originalLocationId: LocationId;
  originalZoneId?: SearchZoneId;
  persistentlyDiscoverable: boolean;
}

export interface EvidenceCollectionDefinition {
  collectible: boolean;
  requiredAuthorityTags: string[];
  requiredCollectionMethod?: string;
}

export interface EvidenceForensicDefinition {
  availableTestIds: ForensicTestId[];
}

export interface EvidenceCanonicalDefinition {
  originFactIds: FactId[];
  actualPropertyTags: string[];
  significanceFactIds: FactId[];
  relatedCharacterIds: CharacterId[];
  relatedEvidenceIds: EvidenceId[];
}

export interface EvidenceDefinition {
  schemaVersion: DomainSchemaVersion;
  id: EvidenceId;
  type: EvidenceType;
  publicPresentation: EvidencePublicPresentation;
  discovery: EvidenceDiscoveryDefinition;
  collection: EvidenceCollectionDefinition;
  forensics: EvidenceForensicDefinition;
}

export interface EvidencePrivateDefinition {
  schemaVersion: DomainSchemaVersion;
  evidenceId: EvidenceId;
  canonical: EvidenceCanonicalDefinition;
}

export interface ChainOfCustodyEntry {
  action: ChainOfCustodyAction;
  gameTime: IsoDateTimeString;
  actorId?: CharacterId;
  locationId?: LocationId;
  notes?: string;
}

export interface EvidenceRuntimeState {
  evidenceId: EvidenceId;

  discovered: boolean;
  discoveredAt?: IsoDateTimeString;

  collectionStatus: CollectionStatus;
  collectedAt?: IsoDateTimeString;
  collectedBy?: CharacterId;

  legalCollectionStatus: EvidenceLegalCollectionStatus;
  legalUsability: LegalUsability;

  chainOfCustody: ChainOfCustodyEntry[];

  forensicRequestIds: ForensicRequestId[];
  revealedTestResultIds: string[];

  shownToCharacterIds: CharacterId[];

  contaminationStatus: ContaminationStatus;
}

export interface ForensicRequestState {
  id: ForensicRequestId;
  evidenceId: EvidenceId;
  testId: ForensicTestId;
  status: TestStatus;
  requestedAt: IsoDateTimeString;
  estimatedCompletionAt: IsoDateTimeString;
  completedAt?: IsoDateTimeString;
}

export interface EvidencePlayerProjection {
  evidenceId: EvidenceId;
  type: EvidenceType;
  displayName: string;
  description: string;
  mediaAssetRef?: string;
  collectionStatus: CollectionStatus;
  legalCollectionStatus: EvidenceLegalCollectionStatus;
  legalUsability: LegalUsability;
  availableTestIds: ForensicTestId[];
  forensicRequestIds: ForensicRequestId[];
  revealedTestResultIds: string[];
  chainOfCustody: ChainOfCustodyEntry[];
}