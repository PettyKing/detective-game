import type {
  CaseId,
  CharacterId,
  CheckpointId,
  EvidenceId,
  FactId,
  LocationId,
  OffenseId,
  OutcomeId,
  RecordId,
  TriggerId,
} from "./ids.js";

import type {
  DomainSchemaVersion,
  IsoDateTimeString,
  VisibilityLevel,
} from "./common.js";

export type CaseDifficulty =
  | "INTRODUCTORY"
  | "STANDARD"
  | "ADVANCED";

export type CaseStatus =
  | "DRAFT"
  | "VALIDATED"
  | "PUBLISHED"
  | "ARCHIVED";

export interface CaseMetadata {
  schemaVersion: DomainSchemaVersion;
  id: CaseId;
  version: string;
  title: string;
  shortDescription: string;
  jurisdictionName: string;
  difficulty: CaseDifficulty;
  estimatedPlaytimeMinutes: number;
  status: CaseStatus;
}

export interface PublicCaseMetadata {
  schemaVersion: DomainSchemaVersion;
  id: CaseId;
  version: string;
  title: string;
  shortDescription: string;
  jurisdictionName: string;
  difficulty: CaseDifficulty;
  estimatedPlaytimeMinutes: number;
}

export interface CaseStartingState {
  startingGameTime: IsoDateTimeString;
  startingLocationId: LocationId;
  startingKnownCharacterIds: CharacterId[];
  startingKnownLocationIds: LocationId[];
  startingKnownFactIds: FactId[];
  startingKnownEvidenceIds: EvidenceId[];
  startingRecordIds: RecordId[];
}

export interface CaseScopeSummary {
  characterCount: number;
  locationCount: number;
  evidenceCount: number;
  factCount: number;
  outcomeCount: number;
}

export interface CaseReferenceIndex {
  characterIds: CharacterId[];
  locationIds: LocationId[];
  evidenceIds: EvidenceId[];
  factIds: FactId[];
  recordIds: RecordId[];
  triggerIds: TriggerId[];
  checkpointIds: CheckpointId[];
  offenseIds: OffenseId[];
  outcomeIds: OutcomeId[];
}

export interface CasePresentationConfig {
  briefingTitle: string;
  briefingBody: string;
  initialObjectives: string[];
  toneTags: string[];
  contentWarnings: string[];
}

export interface CaseDefinitionPublic {
  schemaVersion: DomainSchemaVersion;
  metadata: PublicCaseMetadata;
  presentation: CasePresentationConfig;
  startingState: CaseStartingState;
  scope: CaseScopeSummary;
}

export interface CaseContentVisibility {
  entityId: string;
  visibility: VisibilityLevel;
}

export interface CaseCheckpointDefinition {
  id: CheckpointId;
  label:
    | "START"
    | "INITIAL_INTERVIEWS_COMPLETE"
    | "EVIDENCE_DISCOVERED"
    | "FORENSICS_READY"
    | "WARRANT_READY"
    | "WARRANT_APPROVED"
    | "PRE_ARREST"
    | "PROSECUTOR_REVIEW"
    | "RESOLUTION";
  description: string;
  requiredEventTypes: string[];
  optional: boolean;
}

export interface CaseValidationSummary {
  caseId: CaseId;
  caseVersion: string;
  schemaValid: boolean;
  referencesValid: boolean;
  leakageBoundaryValid: boolean;
  routeRecoverabilityValid: boolean;
  deterministicRulesValid: boolean;
  intendedOutcomesReachable: boolean;
  scope: CaseScopeSummary;
  materiallyDistinctRouteCount: number;
  structuralDefectCount: number;
}

export interface CasePackageManifest {
  schemaVersion: DomainSchemaVersion;
  caseId: CaseId;
  caseVersion: string;

  publicPackageFile: string;

  protectedFiles: {
    canonicalCaseFile: string;
    factsFile: string;
    privateCharactersFile: string;
    knowledgeFile: string;
    privateStatementsFile: string;
    privateEvidenceFile: string;
    forensicsFile: string;
    discoveryFile: string;
    legalFile: string;
    triggersFile: string;
    evaluationFile: string;
    outcomesFile: string;
    checkpointsFile: string;
  };
}