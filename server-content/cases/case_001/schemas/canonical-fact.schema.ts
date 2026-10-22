/*
SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER
*/

import { z } from "zod";

import {
  domainSchemaVersionSchema,
  isoDateTimeStringSchema,
} from "../../../../packages/schemas/src/v1/common.schema.js";

const factIdSchema = z.string().min(1);
const characterIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);
const locationIdSchema = z.string().min(1);
const statementIdSchema = z.string().min(1);

export const canonicalFactCategorySchema = z.enum([
  "LOCATION",
  "TIME",
  "POSSESSION",
  "RELATIONSHIP",
  "COMMUNICATION",
  "OBSERVATION",
  "ACTION",
  "IDENTITY",
  "ACCESS",
  "FORENSIC",
  "MOTIVE",
  "OPPORTUNITY",
  "ALIBI",
  "LEGAL",
  "OTHER",
]);

export const canonicalFactValueTypeSchema = z.enum([
  "STRING",
  "NUMBER",
  "BOOLEAN",
  "DATETIME",
  "ENTITY_REFERENCE",
  "ENTITY_REFERENCE_LIST",
]);

export const canonicalFactSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,

  warning: z.literal(
    "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
  ),

  id: factIdSchema,

  category: canonicalFactCategorySchema,

  valueType: canonicalFactValueTypeSchema,

  canonicalValue: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.array(z.string()),
  ]),

  discoverable: z.boolean(),

  discoveryRuleIds: z.array(z.string().min(1)),

  knownByCharacterIds: z.array(characterIdSchema),

  relatedCharacterIds: z.array(characterIdSchema),

  relatedEvidenceIds: z.array(evidenceIdSchema),

  relatedLocationIds: z.array(locationIdSchema),

  relatedStatementIds: z.array(statementIdSchema),

  legalRelevanceTags: z.array(z.string().min(1)),

  evaluationTags: z.array(z.string().min(1)),

  occurredAt: isoDateTimeStringSchema.optional(),
});

export const canonicalFactCollectionSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,

  warning: z.literal(
    "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
  ),

  facts: z.array(canonicalFactSchema),
});

export type CanonicalFactInput = z.input<
  typeof canonicalFactSchema
>;

export type CanonicalFactCollectionInput = z.input<
  typeof canonicalFactCollectionSchema
>;