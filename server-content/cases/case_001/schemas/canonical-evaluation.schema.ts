/*
SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER
*/

import { z } from "zod";

import {
  domainSchemaVersionSchema,
} from "../../../../packages/schemas/src/v1/common.schema.js";

const characterIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const offenseIdSchema = z.string().min(1);
const outcomeIdSchema = z.string().min(1);

export const evaluationRequirementLogicSchema = z.enum([
  "ALL",
  "ANY",
]);

export const evaluationRequirementSchema = z.object({
  logic: evaluationRequirementLogicSchema,

  requiredFactIds: z.array(factIdSchema),

  requiredEvidenceIds: z.array(evidenceIdSchema),

  requiredCharacterIds: z.array(characterIdSchema),

  requiredOffenseIds: z.array(offenseIdSchema),

  forbiddenViolationCodes: z.array(z.string().min(1)),
});

export const offenseElementSchema = z.object({
  elementId: z.string().min(1),

  offenseId: offenseIdSchema,

  description: z.string().min(1),

  supportingFactIds: z.array(factIdSchema),

  supportingEvidenceIds: z.array(evidenceIdSchema),

  minimumSupportCount: z.number().int().nonnegative(),
});

export const prosecutorEvaluationRuleSchema = z.object({
  id: z.string().min(1),

  targetCharacterId: characterIdSchema,

  offenseId: offenseIdSchema,

  requiredElementIds: z.array(z.string().min(1)),

  minimumSatisfiedElements: z
    .number()
    .int()
    .nonnegative(),

  disqualifyingViolationCodes: z.array(
    z.string().min(1),
  ),

  permittedReducedOffenseIds: z.array(offenseIdSchema),
});

export const canonicalOutcomeRuleSchema = z.object({
  id: outcomeIdSchema,

  category: z.enum([
    "STRONG_CASE",
    "INSUFFICIENT_EVIDENCE",
    "PROCEDURAL_DAMAGE",
    "WRONG_PERSON",
    "MISSED_PARTICIPANT",
    "PROSECUTOR_DECLINES",
    "REDUCED_CHARGES",
    "ACQUITTAL",
    "CONVICTION",
    "UNSOLVED",
  ]),

  priority: z.number().int().nonnegative(),

  requirements: evaluationRequirementSchema,

  resultCode: z.string().min(1),
});

export const canonicalEvaluationPackageSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,

  warning: z.literal(
    "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
  ),

  offenseElements: z.array(offenseElementSchema),

  prosecutorRules: z.array(
    prosecutorEvaluationRuleSchema,
  ),

  outcomeRules: z.array(canonicalOutcomeRuleSchema),

  essentialSolutionFactIds: z.array(factIdSchema),

  essentialSolutionEvidenceIds: z.array(
    evidenceIdSchema,
  ),
});

export type CanonicalEvaluationPackageInput = z.input<
  typeof canonicalEvaluationPackageSchema
>;