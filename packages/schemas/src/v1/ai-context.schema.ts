import { z } from "zod";

import {
  domainSchemaVersionSchema,
  isoDateTimeStringSchema,
} from "./common.schema.js";

import {
  characterIdentitySchema,
  legalStatusSchema,
} from "./public.schema.js";

const characterIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const statementIdSchema = z.string().min(1);
const locationIdSchema = z.string().min(1);

export const cooperationLevelSchema = z.enum([
  "HOSTILE",
  "RESISTANT",
  "GUARDED",
  "NEUTRAL",
  "COOPERATIVE",
  "HIGHLY_COOPERATIVE",
]);

export const stressLevelSchema = z.enum([
  "CALM",
  "UNEASY",
  "STRESSED",
  "HIGHLY_STRESSED",
  "OVERWHELMED",
]);

export const trustLevelSchema = z.enum([
  "VERY_LOW",
  "LOW",
  "NEUTRAL",
  "HIGH",
  "VERY_HIGH",
]);

export const disclosureBoundarySchema = z.enum([
  "WILL_SHARE",
  "MAY_SHARE",
  "WILL_NOT_SHARE",
  "SHARE_ONLY_IF_TRIGGERED",
]);

export const characterPersonalitySchema = z.object({
  traits: z.array(z.string().min(1)),
  speechStyle: z.string().min(1),
  temperament: z.string().min(1),
});

export const characterMotivationSchema = z.object({
  goalIds: z.array(z.string().min(1)),
  fearIds: z.array(z.string().min(1)),
  pressureIds: z.array(z.string().min(1)),
});

export const characterDisclosureRuleSchema = z.object({
  factId: factIdSchema,
  boundary: disclosureBoundarySchema,
  triggerIds: z.array(z.string().min(1)),
});

export const characterCoverStorySchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  authoredClaims: z.array(z.string().min(1)),
  activeByDefault: z.boolean(),
});

export const aiSceneSchema = z.object({
  sceneId: z.string().min(1),
  currentGameTime: isoDateTimeStringSchema,
  currentLocationId: locationIdSchema,
  sceneDescription: z.string(),
});

export const aiCharacterContextSchema = z.object({
  characterId: characterIdSchema,
  identity: characterIdentitySchema,
  personality: characterPersonalitySchema,
  publicBiography: z.string(),

  /**
   * Facts here must be limited to facts this specific character
   * personally knows and is permitted to reason from.
   *
   * This must never contain unrelated canonical truth or global
   * solution information.
   */
  permittedPrivateFactIds: z.array(factIdSchema),

  /**
   * These represent incorrect beliefs the character may genuinely hold.
   * They are not truthfulness labels.
   */
  permittedFalseBeliefFactIds: z.array(factIdSchema),

  activeCoverStories: z.array(characterCoverStorySchema),
  disclosureRules: z.array(characterDisclosureRuleSchema),
  motivations: characterMotivationSchema,

  legalStatus: legalStatusSchema,
  cooperation: cooperationLevelSchema,
  stress: stressLevelSchema,
  trust: trustLevelSchema,

  attorneyRequested: z.boolean(),
  evidenceShownIds: z.array(evidenceIdSchema),
  relevantPriorStatementIds: z.array(statementIdSchema),
  activeBehaviorFlags: z.array(z.string().min(1)),
});

export const aiPlayerKnownContextSchema = z.object({
  knownFactIds: z.array(factIdSchema),
  knownEvidenceIds: z.array(evidenceIdSchema),
  knownCharacterIds: z.array(characterIdSchema),
  knownLocationIds: z.array(locationIdSchema),
});

export const aiEvidenceContextSchema = z.object({
  evidenceId: evidenceIdSchema,
  displayName: z.string().min(1),
  knownDescription: z.string(),
  revealedResultIds: z.array(z.string().min(1)),
});

export const aiConversationTurnSchema = z.object({
  speaker: z.enum([
    "PLAYER",
    "CHARACTER",
    "SYSTEM",
  ]),
  text: z.string(),
  occurredAt: isoDateTimeStringSchema,
});

export const aiAllowedActionSchema = z.object({
  actionType: z.string().min(1),
  description: z.string().min(1),
});

export const aiContextProjectionSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,
  scene: aiSceneSchema,

  activeCharacter: aiCharacterContextSchema.optional(),

  playerKnownContext: aiPlayerKnownContextSchema,

  evidenceInContext: z.array(aiEvidenceContextSchema),

  recentConversation: z.array(aiConversationTurnSchema),

  allowedActions: z.array(aiAllowedActionSchema),
});

export const prohibitedAiContextFieldNames = [
  "truthClassification",
  "canonicalSolution",
  "offenderId",
  "offenderIds",
  "globalSolution",
  "canonicalTimeline",
  "hiddenOutcomeRequirements",
  "evaluationWeights",
] as const;

export type AiContextProjectionInput = z.input<
  typeof aiContextProjectionSchema
>;