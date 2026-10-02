import type {
  ActionId,
  CharacterId,
  EvidenceId,
  EventId,
  FactId,
  ForensicRequestId,
  ForensicTestId,
  InterviewId,
  LocationId,
  OffenseId,
  SessionId,
  StatementId,
  WarrantApplicationId,
  WarrantId,
} from "./ids.js";

import type {
  DomainSchemaVersion,
  IsoDateTimeString,
} from "./common.js";

export type GameEventType =
  | "SESSION_STARTED"
  | "TIME_ADVANCED"
  | "PLAYER_TRAVELED"
  | "INTERVIEW_STARTED"
  | "QUESTION_ASKED"
  | "STATEMENT_RECORDED"
  | "EVIDENCE_PRESENTED"
  | "INTERVIEW_ENDED"
  | "CONSENT_REQUESTED"
  | "CONSENT_GRANTED"
  | "CONSENT_LIMITED"
  | "CONSENT_REFUSED"
  | "CONSENT_REVOKED"
  | "SEARCH_STARTED"
  | "SEARCH_COMPLETED"
  | "EVIDENCE_DISCOVERED"
  | "EVIDENCE_COLLECTED"
  | "EVIDENCE_INSPECTED"
  | "FORENSIC_TEST_REQUESTED"
  | "FORENSIC_TEST_COMPLETED"
  | "FORENSIC_RESULT_REVIEWED"
  | "RECORDS_REQUESTED"
  | "RECORDS_RECEIVED"
  | "RECORDS_REVIEWED"
  | "WARRANT_APPLICATION_SUBMITTED"
  | "WARRANT_APPROVED"
  | "WARRANT_DENIED"
  | "WARRANT_EXECUTED"
  | "PERSON_DETAINED"
  | "PERSON_RELEASED"
  | "PERSON_ARRESTED"
  | "DETENTION_INVALIDATED"
  | "ARREST_INVALIDATED"
  | "PROCEDURAL_VIOLATION_RECORDED"
  | "PROSECUTOR_CONSULTED"
  | "CHARGES_RECOMMENDED"
  | "CASE_SUBMITTED"
  | "CHECKPOINT_REACHED"
  | "AUTHORED_TRIGGER_FIRED";

export interface GameEventBase {
  schemaVersion: DomainSchemaVersion;
  eventId: EventId;
  sessionId: SessionId;
  eventType: GameEventType;
  occurredAt: IsoDateTimeString;
  sequence: number;
  causedByActionId?: ActionId;
}

export interface SessionStartedEvent extends GameEventBase {
  eventType: "SESSION_STARTED";
}

export interface TimeAdvancedEvent extends GameEventBase {
  eventType: "TIME_ADVANCED";
  minutes: number;
}

export interface PlayerTraveledEvent extends GameEventBase {
  eventType: "PLAYER_TRAVELED";
  locationId: LocationId;
}

export interface InterviewStartedEvent extends GameEventBase {
  eventType: "INTERVIEW_STARTED";
  interviewId: InterviewId;
  characterId: CharacterId;
}

export interface QuestionAskedEvent extends GameEventBase {
  eventType: "QUESTION_ASKED";
  interviewId: InterviewId;
  characterId: CharacterId;
  text: string;
}

export interface StatementRecordedEvent extends GameEventBase {
  eventType: "STATEMENT_RECORDED";
  interviewId: InterviewId;
  statementId: StatementId;
  characterId: CharacterId;
}

export interface EvidencePresentedEvent extends GameEventBase {
  eventType: "EVIDENCE_PRESENTED";
  interviewId: InterviewId;
  characterId: CharacterId;
  evidenceIds: EvidenceId[];
}

export interface InterviewEndedEvent extends GameEventBase {
  eventType: "INTERVIEW_ENDED";
  interviewId: InterviewId;
  characterId: CharacterId;
}

export interface ConsentRequestedEvent extends GameEventBase {
  eventType: "CONSENT_REQUESTED";
  characterId: CharacterId;
  locationId: LocationId;
}

export interface ConsentDecisionEvent extends GameEventBase {
  eventType:
    | "CONSENT_GRANTED"
    | "CONSENT_LIMITED"
    | "CONSENT_REFUSED"
    | "CONSENT_REVOKED";
  characterId: CharacterId;
  locationId: LocationId;
  zoneIds: string[];
}

export interface SearchEvent extends GameEventBase {
  eventType:
    | "SEARCH_STARTED"
    | "SEARCH_COMPLETED";
  locationId: LocationId;
  zoneIds: string[];
}

export interface EvidenceDiscoveredEvent extends GameEventBase {
  eventType: "EVIDENCE_DISCOVERED";
  evidenceId: EvidenceId;
  locationId: LocationId;
}

export interface EvidenceCollectedEvent extends GameEventBase {
  eventType: "EVIDENCE_COLLECTED";
  evidenceId: EvidenceId;
  locationId: LocationId;
}

export interface EvidenceInspectedEvent extends GameEventBase {
  eventType: "EVIDENCE_INSPECTED";
  evidenceId: EvidenceId;
}

export interface ForensicTestRequestedEvent extends GameEventBase {
  eventType: "FORENSIC_TEST_REQUESTED";
  forensicRequestId: ForensicRequestId;
  evidenceId: EvidenceId;
  testId: ForensicTestId;
}

export interface ForensicTestCompletedEvent extends GameEventBase {
  eventType: "FORENSIC_TEST_COMPLETED";
  forensicRequestId: ForensicRequestId;
}

export interface ForensicResultReviewedEvent extends GameEventBase {
  eventType: "FORENSIC_RESULT_REVIEWED";
  forensicRequestId: ForensicRequestId;
}

export interface RecordsRequestedEvent extends GameEventBase {
  eventType: "RECORDS_REQUESTED";
  recordType: string;
  targetRef: string;
}

export interface RecordsReceivedEvent extends GameEventBase {
  eventType: "RECORDS_RECEIVED";
  recordId: string;
}

export interface RecordsReviewedEvent extends GameEventBase {
  eventType: "RECORDS_REVIEWED";
  recordId: string;
}

export interface WarrantApplicationSubmittedEvent extends GameEventBase {
  eventType: "WARRANT_APPLICATION_SUBMITTED";
  applicationId: WarrantApplicationId;
  locationId: LocationId;
  supportingFactIds: FactId[];
}

export interface WarrantApprovedEvent extends GameEventBase {
  eventType: "WARRANT_APPROVED";
  applicationId: WarrantApplicationId;
  warrantId: WarrantId;
}

export interface WarrantDeniedEvent extends GameEventBase {
  eventType: "WARRANT_DENIED";
  applicationId: WarrantApplicationId;
}

export interface WarrantExecutedEvent extends GameEventBase {
  eventType: "WARRANT_EXECUTED";
  warrantId: WarrantId;
  locationId: LocationId;
}

export interface PersonDetainedEvent extends GameEventBase {
  eventType: "PERSON_DETAINED";
  characterId: CharacterId;
  supportingFactIds: FactId[];
}

export interface PersonReleasedEvent extends GameEventBase {
  eventType: "PERSON_RELEASED";
  characterId: CharacterId;
}

export interface PersonArrestedEvent extends GameEventBase {
  eventType: "PERSON_ARRESTED";
  characterId: CharacterId;
  supportingFactIds: FactId[];
}

export interface DetentionInvalidatedEvent extends GameEventBase {
  eventType: "DETENTION_INVALIDATED";
  characterId: CharacterId;
  reasonCodes: string[];
}

export interface ArrestInvalidatedEvent extends GameEventBase {
  eventType: "ARREST_INVALIDATED";
  characterId: CharacterId;
  reasonCodes: string[];
}

export interface ProceduralViolationRecordedEvent extends GameEventBase {
  eventType: "PROCEDURAL_VIOLATION_RECORDED";
  violationCode: string;
  affectedEvidenceIds: EvidenceId[];
  affectedCharacterIds: CharacterId[];
}

export interface ProsecutorConsultedEvent extends GameEventBase {
  eventType: "PROSECUTOR_CONSULTED";
  characterId?: CharacterId;
}

export interface ChargesRecommendedEvent extends GameEventBase {
  eventType: "CHARGES_RECOMMENDED";
  characterId: CharacterId;
  offenseIds: OffenseId[];
}

export interface CaseSubmittedEvent extends GameEventBase {
  eventType: "CASE_SUBMITTED";
  allegedResponsibleCharacterIds: CharacterId[];
  offenseIds: OffenseId[];
}

export interface CheckpointReachedEvent extends GameEventBase {
  eventType: "CHECKPOINT_REACHED";
  checkpointId: string;
}

export interface AuthoredTriggerFiredEvent extends GameEventBase {
  eventType: "AUTHORED_TRIGGER_FIRED";
  triggerId: string;
}

export type GameEvent =
  | SessionStartedEvent
  | TimeAdvancedEvent
  | PlayerTraveledEvent
  | InterviewStartedEvent
  | QuestionAskedEvent
  | StatementRecordedEvent
  | EvidencePresentedEvent
  | InterviewEndedEvent
  | ConsentRequestedEvent
  | ConsentDecisionEvent
  | SearchEvent
  | EvidenceDiscoveredEvent
  | EvidenceCollectedEvent
  | EvidenceInspectedEvent
  | ForensicTestRequestedEvent
  | ForensicTestCompletedEvent
  | ForensicResultReviewedEvent
  | RecordsRequestedEvent
  | RecordsReceivedEvent
  | RecordsReviewedEvent
  | WarrantApplicationSubmittedEvent
  | WarrantApprovedEvent
  | WarrantDeniedEvent
  | WarrantExecutedEvent
  | PersonDetainedEvent
  | PersonReleasedEvent
  | PersonArrestedEvent
  | DetentionInvalidatedEvent
  | ArrestInvalidatedEvent
  | ProceduralViolationRecordedEvent
  | ProsecutorConsultedEvent
  | ChargesRecommendedEvent
  | CaseSubmittedEvent
  | CheckpointReachedEvent
  | AuthoredTriggerFiredEvent;