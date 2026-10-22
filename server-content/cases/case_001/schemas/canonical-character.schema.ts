/*
SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER
*/

import { z } from "zod";

import {
  domainSchemaVersionSchema,
} from "../../../../packages/schemas/src/v1/common.schema.js";

const characterIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);

export const privateKnowledgeStateSchema = z.enum([
  "KNOWS",
  "BELIEVES_FALSELY",
  "DOES_NOT_KNOW",
  "FORBIDDEN",
]);

export const privateDisclosureBoundarySchema = z.enum([
  "WILL_SHARE",
  "MAY_SHARE",
  "WILL_NOT_SHARE",
  "SHARE_ONLY_IF_TRIGGERED",
]);

export const privateCharacterKnowledgeSchema = z.object({
  factId: factIdSchema,

  knowledgeState: privateKnowledgeStateSchema,

  disclosureBoundary: privateDisclosureBoundarySchema,

  triggerIds: z.array(z.string().min(1)),
});

export const privateCharacterCoverStorySchema = z.object({
  id: z.string().min(1),

  authoredClaimIds: z.array(z.string().min(1)),

  motivationIds: z.array(z.string().min(1)),

  activationTriggerIds: z.array(z.string().min(1)),

  activeByDefault: z.boolean(),
});

export const privateCharacterRelationshipSchema = z.object({
  relatedCharacterId: characterIdSchema,

  relationshipType: z.string().min(1),

  relationshipFactIds: z.array(factIdSchema),

  publiclyKnown: z.boolean(),
});

export const canonicalCharacterPrivateSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,

  warning: z.literal(
    "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
  ),

  characterId: characterIdSchema,

  privateBiography: z.string(),

  knowledge: z.array(privateCharacterKnowledgeSchema),

  forbiddenFactIds: z.array(factIdSchema),

  coverStories: z.array(privateCharacterCoverStorySchema),

  privateRelationships: z.array(
    privateCharacterRelationshipSchema,
  ),

  goalIds: z.array(z.string().min(1)),

  fearIds: z.array(z.string().min(1)),

  pressureIds: z.array(z.string().min(1)),

  behavioralTriggerIds: z.array(z.string().min(1)),

  attorneyTriggerIds: z.array(z.string().min(1)),
});

export const canonicalCharacterPrivateCollectionSchema =
  z.object({
    schemaVersion: domainSchemaVersionSchema,

    warning: z.literal(
      "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
    ),

    characters: z.array(canonicalCharacterPrivateSchema),
  });

export type CanonicalCharacterPrivateInput = z.input<
  typeof canonicalCharacterPrivateSchema
>;