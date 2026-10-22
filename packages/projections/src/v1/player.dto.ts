import type {
  CharacterId,
  EvidenceId,
  InterviewId,
  LocationId,
  StatementId,
} from "../../../domain/src/v1/ids.js";

import type {
  CollectionStatus,
  DomainSchemaVersion,
  IsoDateTimeString,
  LegalUsability,
} from "../../../domain/src/v1/common.js";

import type {
  CharacterIdentity,
  LegalStatus,
} from "../../../domain/src/v1/character.js";

import type {
  ChainOfCustodyEntry,
  EvidenceLegalCollectionStatus,
  EvidenceType,
} from "../../../domain/src/v1/evidence.js";

import type {
  LocationAccessType,
  LocationType,
} from "../../../domain/src/v1/location.js";

export interface PlayerCharacterDto {
  characterId: CharacterId;
  identity: CharacterIdentity;
  publicBiography: string;
  legalStatus: LegalStatus;
  interviewAvailable: boolean;
  evidenceShownIds: EvidenceId[];
  interviewIds: InterviewId[];
  statementIds: StatementId[];
}

export interface PlayerEvidenceDto {
  evidenceId: EvidenceId;
  type: EvidenceType;
  displayName: string;
  description: string;
  mediaAssetRef?: string;
  collectionStatus: CollectionStatus;
  legalCollectionStatus: EvidenceLegalCollectionStatus;
  legalUsability: LegalUsability;
  availableTestIds: string[];
  forensicRequestIds: string[];
  revealedTestResultIds: string[];
  chainOfCustody: ChainOfCustodyEntry[];
}

export interface PlayerStatementDto {
  statementId: StatementId;
  speakerCharacterId: CharacterId;
  interviewId: InterviewId;
  spokenAt: IsoDateTimeString;
  spokenText: string;
  evidenceShownDuringStatementIds: EvidenceId[];
}

export interface PlayerSearchZoneDto {
  id: string;
  name: string;
  description: string;
  searchable: boolean;
}

export interface PlayerLocationDto {
  locationId: LocationId;
  name: string;
  type: LocationType;
  description: string;
  accessType: LocationAccessType;
  searchable: boolean;
  visibleSearchZones: PlayerSearchZoneDto[];
}

export interface PlayerCaseSummaryDto {
  schemaVersion: DomainSchemaVersion;
  caseId: string;
  version: string;
  title: string;
  shortDescription: string;
  jurisdictionName: string;
  estimatedPlaytimeMinutes: number;
}

export interface PlayerCaseStateDto {
  schemaVersion: DomainSchemaVersion;
  currentGameTime: IsoDateTimeString;
  currentLocationId: LocationId;
  knownCharacters: PlayerCharacterDto[];
  knownEvidence: PlayerEvidenceDto[];
  knownLocations: PlayerLocationDto[];
  knownStatements: PlayerStatementDto[];
}