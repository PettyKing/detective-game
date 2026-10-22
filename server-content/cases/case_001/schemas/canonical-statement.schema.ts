/*
SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER
*/

import { z } from "zod";

import {
  domainSchemaVersionSchema,
} from "../../../../packages/schemas/src/v1/common.schema.js";

const statementIdSchema = z.string().min(1);
const characterIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);

export const protectedTruthClassificationSchema = z.enum([
  "TRUE",
  "FALSE",
  "PARTIALLY_TRUE",
  "MISTAKEN",
  "UNVERIFIABLE",
]);

export const protectedStatementIntentSchema = z.enum([
  "TRUTHFUL_DISCLOSURE",
  "KNOWING_DECEPTION",
  "MISTAKEN_BELIEF",
  "EVASION",
  "UNKNOWN",
]);

export const canonicalStatementSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,

  warning: z.literal(
    "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
  ),

  statementId: statementIdSchema,

  speakerCharacterId: characterIdSchema,

  authoredClaimId: z.string().min(1),

  truthClassification:
    protectedTruthClassificationSchema,

  intent: protectedStatementIntentSchema,

  supportingFactIds: z.array(factIdSchema),

  conflictingFactIds: z.array(factIdSchema),

  relatedEvidenceIds: z.array(evidenceIdSchema),

  activationTriggerIds: z.array(z.string().min(1)),

  replacementStatementIds: z.array(statementIdSchema),

  retractable: z.boolean(),
});

export const canonicalStatementCollectionSchema =
  z.object({
    schemaVersion: domainSchemaVersionSchema,

    warning: z.literal(
      "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
    ),

    statements: z.array(canonicalStatementSchema),
  });

export type CanonicalStatementInput = z.input<
  typeof canonicalStatementSchema
>;