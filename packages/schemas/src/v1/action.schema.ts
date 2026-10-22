import { z } from "zod";

import {
  domainSchemaVersionSchema,
  isoDateTimeStringSchema,
} from "./common.schema.js";

const actionIdSchema = z.string().min(1);
const sessionIdSchema = z.string().min(1);
const characterIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const forensicTestIdSchema = z.string().min(1);
const interviewIdSchema = z.string().min(1);
const locationIdSchema = z.string().min(1);
const offenseIdSchema = z.string().min(1);
const searchZoneIdSchema = z.string().min(1);
const statementIdSchema = z.string().min(1);
const warrantApplicationIdSchema = z.string().min(1);
const warrantIdSchema = z.string().min(1);

export const gameActionTypeSchema = z.enum([
  "START_INTERVIEW",
  "ASK_QUESTION",
  "PRESENT_EVIDENCE",
  "END_INTERVIEW",
  "TRAVEL",
  "ADVANCE_TIME",
  "REQUEST_CONSENT",
  "SEARCH_BY_CONSENT",
  "SEARCH_PUBLIC_AREA",
  "SUBMIT_WARRANT_APPLICATION",
  "EXECUTE_WARRANT",
  "SEARCH_AUTHORIZED_AREA",
  "COLLECT_EVIDENCE",
  "INSPECT_EVIDENCE",
  "SUBMIT_FORENSIC_REQUEST",
  "REVIEW_FORENSIC_RESULT",
  "REQUEST_RECORDS",
  "REVIEW_RECORDS",
  "REVIEW_DIGITAL_MATERIAL",
  "COMPARE_STATEMENTS",
  "CONSULT_INVESTIGATOR",
  "CONSULT_PROSECUTOR",
  "TEMPORARILY_DETAIN",
  "RELEASE_DETAINEE",
  "ARREST",
  "RECOMMEND_CHARGES",
  "SUBMIT_CASE",
]);

export const actionSourceSchema = z.enum([
  "PLAYER_UI",
  "PLAYER_NATURAL_LANGUAGE",
  "SYSTEM",
  "DEVELOPER_TOOL",
]);

const actionRequestBaseSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,
  actionId: actionIdSchema,
  sessionId: sessionIdSchema,
  actionType: gameActionTypeSchema,
  source: actionSourceSchema,
  requestedAt: isoDateTimeStringSchema,
});

export const startInterviewActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("START_INTERVIEW"),
  characterId: characterIdSchema,
});

export const askQuestionActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("ASK_QUESTION"),
  characterId: characterIdSchema,
  interviewId: interviewIdSchema,
  text: z.string().min(1),
});

export const presentEvidenceActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("PRESENT_EVIDENCE"),
  characterId: characterIdSchema,
  interviewId: interviewIdSchema,
  evidenceIds: z.array(evidenceIdSchema).min(1),
  text: z.string().min(1).optional(),
});

export const endInterviewActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("END_INTERVIEW"),
  characterId: characterIdSchema,
  interviewId: interviewIdSchema,
});

export const travelActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("TRAVEL"),
  destinationLocationId: locationIdSchema,
});

export const advanceTimeActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("ADVANCE_TIME"),
  minutes: z.number().int().positive(),
  reason: z.string().min(1).optional(),
});

export const requestConsentActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("REQUEST_CONSENT"),
  characterId: characterIdSchema,
  locationId: locationIdSchema,
  requestedZoneIds: z.array(searchZoneIdSchema).min(1),
});

export const searchByConsentActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("SEARCH_BY_CONSENT"),
  locationId: locationIdSchema,
  zoneIds: z.array(searchZoneIdSchema).min(1),
});

export const searchPublicAreaActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("SEARCH_PUBLIC_AREA"),
  locationId: locationIdSchema,
  zoneIds: z.array(searchZoneIdSchema).min(1),
});

export const submitWarrantApplicationActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("SUBMIT_WARRANT_APPLICATION"),
    applicationId: warrantApplicationIdSchema,
    locationId: locationIdSchema,
    requestedZoneIds: z.array(searchZoneIdSchema).min(1),
    supportingFactIds: z.array(factIdSchema),
    narrative: z.string().min(1),
  });

export const executeWarrantActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("EXECUTE_WARRANT"),
  warrantId: warrantIdSchema,
});

export const searchAuthorizedAreaActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("SEARCH_AUTHORIZED_AREA"),
    locationId: locationIdSchema,
    zoneIds: z.array(searchZoneIdSchema).min(1),
    warrantId: warrantIdSchema.optional(),
  });

export const collectEvidenceActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("COLLECT_EVIDENCE"),
  evidenceId: evidenceIdSchema,
});

export const inspectEvidenceActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("INSPECT_EVIDENCE"),
  evidenceId: evidenceIdSchema,
});

export const submitForensicRequestActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("SUBMIT_FORENSIC_REQUEST"),
    evidenceId: evidenceIdSchema,
    testId: forensicTestIdSchema,
  });

export const reviewForensicResultActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("REVIEW_FORENSIC_RESULT"),
    forensicRequestId: z.string().min(1),
  });

export const requestRecordsActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("REQUEST_RECORDS"),
  recordType: z.string().min(1),
  targetRef: z.string().min(1),
  supportingFactIds: z.array(factIdSchema),
});

export const reviewRecordsActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("REVIEW_RECORDS"),
  recordId: z.string().min(1),
});

export const reviewDigitalMaterialActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("REVIEW_DIGITAL_MATERIAL"),
    recordId: z.string().min(1),
  });

export const compareStatementsActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("COMPARE_STATEMENTS"),
    statementIds: z.array(statementIdSchema).min(2),
  });

export const consultInvestigatorActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("CONSULT_INVESTIGATOR"),
    topic: z.string().min(1),
  });

export const consultProsecutorActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("CONSULT_PROSECUTOR"),
    subjectCharacterId: characterIdSchema.optional(),
    offenseIds: z.array(offenseIdSchema).optional(),
  });

export const temporarilyDetainActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("TEMPORARILY_DETAIN"),
    characterId: characterIdSchema,
    supportingFactIds: z.array(factIdSchema),
  });

export const releaseDetaineeActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("RELEASE_DETAINEE"),
    characterId: characterIdSchema,
  });

export const arrestActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("ARREST"),
  characterId: characterIdSchema,
  supportingFactIds: z.array(factIdSchema),
});

export const recommendChargesActionSchema =
  actionRequestBaseSchema.extend({
    actionType: z.literal("RECOMMEND_CHARGES"),
    characterId: characterIdSchema,
    offenseIds: z.array(offenseIdSchema).min(1),
    supportingEvidenceIds: z.array(evidenceIdSchema),
  });

export const submitCaseActionSchema = actionRequestBaseSchema.extend({
  actionType: z.literal("SUBMIT_CASE"),
  allegedResponsibleCharacterIds: z.array(characterIdSchema).min(1),
  recommendedOffenseIds: z.array(offenseIdSchema),
  supportingEvidenceIds: z.array(evidenceIdSchema),
  supportingFactIds: z.array(factIdSchema),
  theoryText: z.string().min(1),
});

export const gameActionRequestSchema = z.discriminatedUnion("actionType", [
  startInterviewActionSchema,
  askQuestionActionSchema,
  presentEvidenceActionSchema,
  endInterviewActionSchema,
  travelActionSchema,
  advanceTimeActionSchema,
  requestConsentActionSchema,
  searchByConsentActionSchema,
  searchPublicAreaActionSchema,
  submitWarrantApplicationActionSchema,
  executeWarrantActionSchema,
  searchAuthorizedAreaActionSchema,
  collectEvidenceActionSchema,
  inspectEvidenceActionSchema,
  submitForensicRequestActionSchema,
  reviewForensicResultActionSchema,
  requestRecordsActionSchema,
  reviewRecordsActionSchema,
  reviewDigitalMaterialActionSchema,
  compareStatementsActionSchema,
  consultInvestigatorActionSchema,
  consultProsecutorActionSchema,
  temporarilyDetainActionSchema,
  releaseDetaineeActionSchema,
  arrestActionSchema,
  recommendChargesActionSchema,
  submitCaseActionSchema,
]);

export const actionValidationStatusSchema = z.enum([
  "VALID",
  "REJECTED",
  "REQUIRES_CONFIRMATION",
]);

export const actionValidationResultSchema = z.object({
  actionId: actionIdSchema,
  status: actionValidationStatusSchema,
  reasonCodes: z.array(z.string().min(1)),
  message: z.string().min(1).optional(),
});

export type GameActionRequestInput = z.input<
  typeof gameActionRequestSchema
>;