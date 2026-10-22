import { z } from "zod";

import {
  domainSchemaVersionSchema,
  isoDateTimeStringSchema,
  legalDecisionSchema,
} from "./common.schema.js";

const characterIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const locationIdSchema = z.string().min(1);
const searchZoneIdSchema = z.string().min(1);
const warrantIdSchema = z.string().min(1);

export const consentStatusSchema = z.enum([
  "NONE",
  "REQUESTED",
  "GRANTED",
  "LIMITED",
  "REVOKED",
  "REFUSED",
]);

export const searchAuthorityBasisSchema = z.enum([
  "PUBLIC_ACCESS",
  "OWNER_CONSENT",
  "AUTHORIZED_OCCUPANT_CONSENT",
  "VALID_WARRANT",
  "INCIDENT_TO_ARREST",
  "EXIGENT_CIRCUMSTANCE",
  "OTHER_AUTHORED_EXCEPTION",
]);

export const detentionValiditySchema = z.enum([
  "VALID",
  "INVALID_INSUFFICIENT_REASONABLE_SUSPICION",
  "INVALID_SCOPE",
  "INVALID_DURATION",
  "INVALID_PROCEDURAL",
]);

export const arrestValiditySchema = z.enum([
  "VALID",
  "INVALID_INSUFFICIENT_PROBABLE_CAUSE",
  "INVALID_PROCEDURAL",
  "INVALID_TARGET_STATE",
]);

export const warrantDecisionSchema = z.enum([
  "APPROVED",
  "DENIED",
]);

export const consentScopeSchema = z.object({
  characterId: characterIdSchema,
  locationId: locationIdSchema,
  zoneIds: z.array(searchZoneIdSchema),
  status: consentStatusSchema,
  grantedAt: isoDateTimeStringSchema.optional(),
  revokedAt: isoDateTimeStringSchema.optional(),
});

export const searchAuthorityContextSchema = z.object({
  locationId: locationIdSchema,
  zoneIds: z.array(searchZoneIdSchema).min(1),
  authorityBasis: searchAuthorityBasisSchema.optional(),
  consentingCharacterId: characterIdSchema.optional(),
  warrantId: warrantIdSchema.optional(),
  knownFactIds: z.array(factIdSchema),
});

export const searchAuthorityResultSchema = z.object({
  decision: legalDecisionSchema,
  authorizedZoneIds: z.array(searchZoneIdSchema),
  unauthorizedZoneIds: z.array(searchZoneIdSchema),
  authorityBasis: searchAuthorityBasisSchema.optional(),
  reasonCodes: z.array(z.string().min(1)),
});

export const reasonableSuspicionContextSchema = z.object({
  characterId: characterIdSchema,
  knownFactIds: z.array(factIdSchema),
  legallyUsableFactIds: z.array(factIdSchema),
});

export const reasonableSuspicionResultSchema = z.object({
  decision: legalDecisionSchema,
  supportingFactIds: z.array(factIdSchema),
  reasonCodes: z.array(z.string().min(1)),
});

export const detentionContextSchema = z.object({
  characterId: characterIdSchema,
  knownFactIds: z.array(factIdSchema),
  legallyUsableFactIds: z.array(factIdSchema),
  purpose: z.string().min(1),
  durationMinutes: z.number().int().nonnegative(),
  locationId: locationIdSchema,
});

export const detentionResultSchema = z.object({
  validity: detentionValiditySchema,
  supportingFactIds: z.array(factIdSchema),
  reasonCodes: z.array(z.string().min(1)),
});

export const probableCauseContextSchema = z.object({
  characterId: characterIdSchema,
  knownFactIds: z.array(factIdSchema),
  legallyUsableFactIds: z.array(factIdSchema),
  relatedEvidenceIds: z.array(evidenceIdSchema),
});

export const probableCauseResultSchema = z.object({
  decision: legalDecisionSchema,
  supportingFactIds: z.array(factIdSchema),
  supportingEvidenceIds: z.array(evidenceIdSchema),
  reasonCodes: z.array(z.string().min(1)),
});

export const arrestContextSchema = z.object({
  characterId: characterIdSchema,
  probableCause: probableCauseResultSchema,
  locationId: locationIdSchema,
  existingWarrantId: warrantIdSchema.optional(),
});

export const arrestResultSchema = z.object({
  validity: arrestValiditySchema,
  reasonCodes: z.array(z.string().min(1)),
});

export const warrantApplicationContextSchema = z.object({
  locationId: locationIdSchema,
  requestedZoneIds: z.array(searchZoneIdSchema).min(1),
  supportingFactIds: z.array(factIdSchema),
  legallyUsableFactIds: z.array(factIdSchema),
  requestedObjectCategories: z.array(z.string().min(1)),
});

export const warrantEvaluationResultSchema = z.object({
  decision: warrantDecisionSchema,
  authorizedZoneIds: z.array(searchZoneIdSchema),
  authorizedObjectCategories: z.array(z.string().min(1)),
  supportingFactIds: z.array(factIdSchema),
  reasonCodes: z.array(z.string().min(1)),
});

export const warrantDefinitionSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,
  id: warrantIdSchema,
  locationId: locationIdSchema,
  authorizedZoneIds: z.array(searchZoneIdSchema),
  authorizedObjectCategories: z.array(z.string().min(1)),
  supportingFactIds: z.array(factIdSchema),
  issuedAt: isoDateTimeStringSchema,
  expiresAt: isoDateTimeStringSchema,
});

export type SearchAuthorityContextInput = z.input<
  typeof searchAuthorityContextSchema
>;

export type SearchAuthorityResultInput = z.input<
  typeof searchAuthorityResultSchema
>;

export type ReasonableSuspicionContextInput = z.input<
  typeof reasonableSuspicionContextSchema
>;

export type ReasonableSuspicionResultInput = z.input<
  typeof reasonableSuspicionResultSchema
>;

export type DetentionContextInput = z.input<
  typeof detentionContextSchema
>;

export type DetentionResultInput = z.input<
  typeof detentionResultSchema
>;

export type ProbableCauseContextInput = z.input<
  typeof probableCauseContextSchema
>;

export type ProbableCauseResultInput = z.input<
  typeof probableCauseResultSchema
>;

export type ArrestContextInput = z.input<
  typeof arrestContextSchema
>;

export type ArrestResultInput = z.input<
  typeof arrestResultSchema
>;

export type WarrantApplicationContextInput = z.input<
  typeof warrantApplicationContextSchema
>;

export type WarrantEvaluationResultInput = z.input<
  typeof warrantEvaluationResultSchema
>;