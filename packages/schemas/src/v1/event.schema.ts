import { z } from "zod";

import {
  domainSchemaVersionSchema,
  isoDateTimeStringSchema,
} from "./common.schema.js";

const eventIdSchema = z.string().min(1);
const sessionIdSchema = z.string().min(1);
const actionIdSchema = z.string().min(1);
const characterIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const forensicRequestIdSchema = z.string().min(1);
const forensicTestIdSchema = z.string().min(1);
const interviewIdSchema = z.string().min(1);
const locationIdSchema = z.string().min(1);
const offenseIdSchema = z.string().min(1);
const statementIdSchema = z.string().min(1);
const warrantApplicationIdSchema = z.string().min(1);
const warrantIdSchema = z.string().min(1);

export const gameEventTypeSchema = z.enum([
  "SESSION_STARTED",
  "TIME_ADVANCED",
  "PLAYER_TRAVELED",
  "INTERVIEW_STARTED",
  "QUESTION_ASKED",
  "STATEMENT_RECORDED",
  "EVIDENCE_PRESENTED",
  "INTERVIEW_ENDED",
  "CONSENT_REQUESTED",
  "CONSENT_GRANTED",
  "CONSENT_LIMITED",
  "CONSENT_REFUSED",
  "CONSENT_REVOKED",
  "SEARCH_STARTED",
  "SEARCH_COMPLETED",
  "EVIDENCE_DISCOVERED",
  "EVIDENCE_COLLECTED",
  "EVIDENCE_INSPECTED",
  "FORENSIC_TEST_REQUESTED",
  "FORENSIC_TEST_COMPLETED",
  "FORENSIC_RESULT_REVIEWED",
  "RECORDS_REQUESTED",
  "RECORDS_RECEIVED",
  "RECORDS_REVIEWED",
  "WARRANT_APPLICATION_SUBMITTED",
  "WARRANT_APPROVED",
  "WARRANT_DENIED",
  "WARRANT_EXECUTED",
  "PERSON_DETAINED",
  "PERSON_RELEASED",
  "PERSON_ARRESTED",
  "DETENTION_INVALIDATED",
  "ARREST_INVALIDATED",
  "PROCEDURAL_VIOLATION_RECORDED",
  "PROSECUTOR_CONSULTED",
  "CHARGES_RECOMMENDED",
  "CASE_SUBMITTED",
  "CHECKPOINT_REACHED",
  "AUTHORED_TRIGGER_FIRED",
]);

const gameEventBaseSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,
  eventId: eventIdSchema,
  sessionId: sessionIdSchema,
  eventType: gameEventTypeSchema,
  occurredAt: isoDateTimeStringSchema,
  sequence: z.number().int().nonnegative(),
  causedByActionId: actionIdSchema.optional(),
});

export const sessionStartedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("SESSION_STARTED"),
});

export const timeAdvancedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("TIME_ADVANCED"),
  minutes: z.number().int().positive(),
});

export const playerTraveledEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("PLAYER_TRAVELED"),
  locationId: locationIdSchema,
});

export const interviewStartedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("INTERVIEW_STARTED"),
  interviewId: interviewIdSchema,
  characterId: characterIdSchema,
});

export const questionAskedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("QUESTION_ASKED"),
  interviewId: interviewIdSchema,
  characterId: characterIdSchema,
  text: z.string().min(1),
});

export const statementRecordedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("STATEMENT_RECORDED"),
  interviewId: interviewIdSchema,
  statementId: statementIdSchema,
  characterId: characterIdSchema,
});

export const evidencePresentedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("EVIDENCE_PRESENTED"),
  interviewId: interviewIdSchema,
  characterId: characterIdSchema,
  evidenceIds: z.array(evidenceIdSchema).min(1),
});

export const interviewEndedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("INTERVIEW_ENDED"),
  interviewId: interviewIdSchema,
  characterId: characterIdSchema,
});

export const consentRequestedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("CONSENT_REQUESTED"),
  characterId: characterIdSchema,
  locationId: locationIdSchema,
});

export const consentDecisionEventSchema = gameEventBaseSchema.extend({
  eventType: z.enum([
    "CONSENT_GRANTED",
    "CONSENT_LIMITED",
    "CONSENT_REFUSED",
    "CONSENT_REVOKED",
  ]),
  characterId: characterIdSchema,
  locationId: locationIdSchema,
  zoneIds: z.array(z.string().min(1)),
});

export const searchEventSchema = gameEventBaseSchema.extend({
  eventType: z.enum([
    "SEARCH_STARTED",
    "SEARCH_COMPLETED",
  ]),
  locationId: locationIdSchema,
  zoneIds: z.array(z.string().min(1)),
});

export const evidenceDiscoveredEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("EVIDENCE_DISCOVERED"),
  evidenceId: evidenceIdSchema,
  locationId: locationIdSchema,
});

export const evidenceCollectedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("EVIDENCE_COLLECTED"),
  evidenceId: evidenceIdSchema,
  locationId: locationIdSchema,
});

export const evidenceInspectedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("EVIDENCE_INSPECTED"),
  evidenceId: evidenceIdSchema,
});

export const forensicTestRequestedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("FORENSIC_TEST_REQUESTED"),
  forensicRequestId: forensicRequestIdSchema,
  evidenceId: evidenceIdSchema,
  testId: forensicTestIdSchema,
});

export const forensicTestCompletedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("FORENSIC_TEST_COMPLETED"),
  forensicRequestId: forensicRequestIdSchema,
});

export const forensicResultReviewedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("FORENSIC_RESULT_REVIEWED"),
  forensicRequestId: forensicRequestIdSchema,
});

export const recordsRequestedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("RECORDS_REQUESTED"),
  recordType: z.string().min(1),
  targetRef: z.string().min(1),
});

export const recordsReceivedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("RECORDS_RECEIVED"),
  recordId: z.string().min(1),
});

export const recordsReviewedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("RECORDS_REVIEWED"),
  recordId: z.string().min(1),
});

export const warrantApplicationSubmittedEventSchema =
  gameEventBaseSchema.extend({
    eventType: z.literal("WARRANT_APPLICATION_SUBMITTED"),
    applicationId: warrantApplicationIdSchema,
    locationId: locationIdSchema,
    supportingFactIds: z.array(factIdSchema),
  });

export const warrantApprovedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("WARRANT_APPROVED"),
  applicationId: warrantApplicationIdSchema,
  warrantId: warrantIdSchema,
});

export const warrantDeniedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("WARRANT_DENIED"),
  applicationId: warrantApplicationIdSchema,
});

export const warrantExecutedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("WARRANT_EXECUTED"),
  warrantId: warrantIdSchema,
  locationId: locationIdSchema,
});

export const personDetainedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("PERSON_DETAINED"),
  characterId: characterIdSchema,
  supportingFactIds: z.array(factIdSchema),
});

export const personReleasedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("PERSON_RELEASED"),
  characterId: characterIdSchema,
});

export const personArrestedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("PERSON_ARRESTED"),
  characterId: characterIdSchema,
  supportingFactIds: z.array(factIdSchema),
});

export const detentionInvalidatedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("DETENTION_INVALIDATED"),
  characterId: characterIdSchema,
  reasonCodes: z.array(z.string().min(1)),
});

export const arrestInvalidatedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("ARREST_INVALIDATED"),
  characterId: characterIdSchema,
  reasonCodes: z.array(z.string().min(1)),
});

export const proceduralViolationRecordedEventSchema =
  gameEventBaseSchema.extend({
    eventType: z.literal("PROCEDURAL_VIOLATION_RECORDED"),
    violationCode: z.string().min(1),
    affectedEvidenceIds: z.array(evidenceIdSchema),
    affectedCharacterIds: z.array(characterIdSchema),
  });

export const prosecutorConsultedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("PROSECUTOR_CONSULTED"),
  characterId: characterIdSchema.optional(),
});

export const chargesRecommendedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("CHARGES_RECOMMENDED"),
  characterId: characterIdSchema,
  offenseIds: z.array(offenseIdSchema).min(1),
});

export const caseSubmittedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("CASE_SUBMITTED"),
  allegedResponsibleCharacterIds: z.array(characterIdSchema).min(1),
  offenseIds: z.array(offenseIdSchema),
});

export const checkpointReachedEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("CHECKPOINT_REACHED"),
  checkpointId: z.string().min(1),
});

export const authoredTriggerFiredEventSchema = gameEventBaseSchema.extend({
  eventType: z.literal("AUTHORED_TRIGGER_FIRED"),
  triggerId: z.string().min(1),
});

export const gameEventSchema = z.union([
  sessionStartedEventSchema,
  timeAdvancedEventSchema,
  playerTraveledEventSchema,
  interviewStartedEventSchema,
  questionAskedEventSchema,
  statementRecordedEventSchema,
  evidencePresentedEventSchema,
  interviewEndedEventSchema,
  consentRequestedEventSchema,
  consentDecisionEventSchema,
  searchEventSchema,
  evidenceDiscoveredEventSchema,
  evidenceCollectedEventSchema,
  evidenceInspectedEventSchema,
  forensicTestRequestedEventSchema,
  forensicTestCompletedEventSchema,
  forensicResultReviewedEventSchema,
  recordsRequestedEventSchema,
  recordsReceivedEventSchema,
  recordsReviewedEventSchema,
  warrantApplicationSubmittedEventSchema,
  warrantApprovedEventSchema,
  warrantDeniedEventSchema,
  warrantExecutedEventSchema,
  personDetainedEventSchema,
  personReleasedEventSchema,
  personArrestedEventSchema,
  detentionInvalidatedEventSchema,
  arrestInvalidatedEventSchema,
  proceduralViolationRecordedEventSchema,
  prosecutorConsultedEventSchema,
  chargesRecommendedEventSchema,
  caseSubmittedEventSchema,
  checkpointReachedEventSchema,
  authoredTriggerFiredEventSchema,
]);

export type GameEventInput = z.input<
  typeof gameEventSchema
>;