/*
SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER
*/

import { z } from "zod";

import {
  domainSchemaVersionSchema,
  isoDateTimeStringSchema,
} from "../../../../packages/schemas/src/v1/common.schema.js";

const caseIdSchema = z.string().min(1);
const characterIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const locationIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);
const offenseIdSchema = z.string().min(1);

export const canonicalCaseTruthSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,

  warning: z.literal(
    "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
  ),

  caseId: caseIdSchema,

  caseVersion: z.string().min(1),

  canonicalNarrative: z.string().min(1),

  victimCharacterIds: z.array(characterIdSchema).min(1),

  responsibleCharacterIds: z.array(characterIdSchema).min(1),

  accompliceCharacterIds: z.array(characterIdSchema),

  primaryOffenseIds: z.array(offenseIdSchema).min(1),

  motiveFactIds: z.array(factIdSchema),

  methodFactIds: z.array(factIdSchema),

  opportunityFactIds: z.array(factIdSchema),

  criticalTimelineFactIds: z.array(factIdSchema),

  essentialEvidenceIds: z.array(evidenceIdSchema),

  solutionFactIds: z.array(factIdSchema).min(1),

  startingGameTime: isoDateTimeStringSchema,

  startingLocationId: locationIdSchema,
});

export type CanonicalCaseTruthInput = z.input<
  typeof canonicalCaseTruthSchema
>;