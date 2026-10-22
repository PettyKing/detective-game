/*
SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER
*/

import { z } from "zod";

import {
  domainSchemaVersionSchema,
} from "../../../../packages/schemas/src/v1/common.schema.js";

const evidenceIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const characterIdSchema = z.string().min(1);
const locationIdSchema = z.string().min(1);
const forensicTestIdSchema = z.string().min(1);
const searchZoneIdSchema = z.string().min(1);

export const canonicalEvidencePropertySchema = z.object({
  key: z.string().min(1),

  value: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.array(z.string()),
  ]),
});

export const canonicalForensicResultSchema = z.object({
  testId: forensicTestIdSchema,

  processingMinutes: z.number().int().nonnegative(),

  prerequisiteFactIds: z.array(factIdSchema),

  canonicalResultCode: z.string().min(1),

  canonicalResultData: z.record(
    z.string(),
    z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.array(z.string()),
    ]),
  ),

  revealedFactIds: z.array(factIdSchema),
});

export const canonicalEvidencePrivateSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,

  warning: z.literal(
    "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
  ),

  evidenceId: evidenceIdSchema,

  originalLocationId: locationIdSchema,

  originalZoneId: searchZoneIdSchema.optional(),

  createdByFactIds: z.array(factIdSchema),

  actualProperties: z.array(
    canonicalEvidencePropertySchema,
  ),

  significanceFactIds: z.array(factIdSchema),

  relatedCharacterIds: z.array(characterIdSchema),

  relatedEvidenceIds: z.array(evidenceIdSchema),

  discoveryRuleIds: z.array(z.string().min(1)),

  requiredAuthorityTags: z.array(z.string().min(1)),

  availableForensicTests: z.array(
    canonicalForensicResultSchema,
  ),

  contaminationRiskTags: z.array(z.string().min(1)),

  admissibilityRiskTags: z.array(z.string().min(1)),
});

export const canonicalEvidencePrivateCollectionSchema =
  z.object({
    schemaVersion: domainSchemaVersionSchema,

    warning: z.literal(
      "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
    ),

    evidence: z.array(canonicalEvidencePrivateSchema),
  });

export type CanonicalEvidencePrivateInput = z.input<
  typeof canonicalEvidencePrivateSchema
>;