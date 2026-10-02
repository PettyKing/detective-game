import type {
  CharacterId,
  EvidenceId,
  FactId,
  InterviewId,
  StatementId,
} from "./ids.js";

import type {
  ConfidenceLevel,
  DomainSchemaVersion,
  IsoDateTimeString,
} from "./common.js";

export type StatementClaimType =
  | "OBSERVATION"
  | "TIMELINE"
  | "LOCATION"
  | "RELATIONSHIP"
  | "POSSESSION"
  | "COMMUNICATION"
  | "IDENTITY"
  | "ACCESS"
  | "ALIBI"
  | "MOTIVE"
  | "ACTION"
  | "OTHER";

export type CanonicalTruthClassification =
  | "TRUE"
  | "FALSE"
  | "PARTIALLY_TRUE"
  | "MISTAKEN"
  | "UNVERIFIABLE";

export type StatementIntent =
  | "TRUTHFUL_DISCLOSURE"
  | "KNOWING_DECEPTION"
  | "MISTAKEN_BELIEF"
  | "EVASION"
  | "UNKNOWN";

export interface StatementClaim {
  claimType: StatementClaimType;
  subjectRef?: string;
  predicate: string;
  value: string;
  confidence?: ConfidenceLevel;
}

export interface StatementDefinition {
  schemaVersion: DomainSchemaVersion;
  id: StatementId;
  speakerCharacterId: CharacterId;
  claim: StatementClaim;
}

export interface StatementCanonicalMetadata {
  statementId: StatementId;

  /**
   * SERVER ONLY.
   *
   * This field must never be transmitted to:
   * - the player/client
   * - ordinary AI context projections
   * - analytics payloads
   * - client fixtures
   * - public logs
   */
  truthClassification: CanonicalTruthClassification;

  /**
   * SERVER ONLY.
   *
   * Describes the speaker's authored relationship to the statement.
   * This is canonical metadata and is not itself exposed to the player.
   */
  intent: StatementIntent;

  supportingFactIds: FactId[];
  conflictingFactIds: FactId[];
}

export interface RuntimeStatement {
  statementId: StatementId;
  speakerCharacterId: CharacterId;
  interviewId: InterviewId;
  spokenAt: IsoDateTimeString;
  spokenText: string;
  evidenceShownDuringStatementIds: EvidenceId[];
}

export interface StatementPlayerProjection {
  statementId: StatementId;
  speakerCharacterId: CharacterId;
  interviewId: InterviewId;
  spokenAt: IsoDateTimeString;
  spokenText: string;
  evidenceShownDuringStatementIds: EvidenceId[];
}

export interface StatementAiProjection {
  statementId: StatementId;
  speakerCharacterId: CharacterId;
  interviewId: InterviewId;
  spokenAt: IsoDateTimeString;
  spokenText: string;
  evidenceShownDuringStatementIds: EvidenceId[];
}