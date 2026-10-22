import { z } from "zod";

import {
  domainSchemaVersionSchema,
  isoDateTimeStringSchema,
} from "./common.schema.js";

const triggerIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);
const characterIdSchema = z.string().min(1);
const locationIdSchema = z.string().min(1);

export const triggerConditionTypeSchema = z.enum([
  "FACT_KNOWN",
  "FACT_UNKNOWN",
  "EVIDENCE_DISCOVERED",
  "EVIDENCE_COLLECTED",
  "CHARACTER_INTERVIEWED",
  "CHARACTER_DETAINED",
  "CHARACTER_ARRESTED",
  "LOCATION_VISITED",
  "FORENSIC_TEST_COMPLETED",
  "WARRANT_APPROVED",
  "WARRANT_DENIED",
  "WARRANT_EXECUTED",
  "TIME_AT_OR_AFTER",
  "EVENT_OCCURRED",
  "CHECKPOINT_REACHED",
]);

export const triggerLogicSchema = z.enum([
  "ALL",
  "ANY",
]);

export const triggerConditionSchema = z.object({
  conditionType: triggerConditionTypeSchema,
  factId: factIdSchema.optional(),
  evidenceId: evidenceIdSchema.optional(),
  characterId: characterIdSchema.optional(),
  locationId: locationIdSchema.optional(),
  referenceId: z.string().min(1).optional(),
  time: isoDateTimeStringSchema.optional(),
});

export const triggerEffectTypeSchema = z.enum([
  "MAKE_CHARACTER_AVAILABLE",
  "MAKE_CHARACTER_UNAVAILABLE",
  "CHANGE_CHARACTER_STATE",
  "REVEAL_FACT",
  "REVEAL_LOCATION",
  "REVEAL_EVIDENCE",
  "SCHEDULE_EVENT",
  "CREATE_NOTIFICATION",
  "CHANGE_LOCATION_STATE",
  "ENABLE_ACTION",
  "DISABLE_ACTION",
]);

export const triggerEffectSchema = z.object({
  effectType: triggerEffectTypeSchema,
  targetId: z.string().min(1).optional(),
  value: z.string().min(1).optional(),
  delayMinutes: z.number().int().nonnegative().optional(),
});

export const reactionTriggerDefinitionSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,
  id: triggerIdSchema,
  label: z.string().min(1),
  logic: triggerLogicSchema,
  conditions: z.array(triggerConditionSchema).min(1),
  effects: z.array(triggerEffectSchema).min(1),
  once: z.boolean(),
  aiPresentationProfileId: z.string().min(1).optional(),
});

export const triggerRuntimeStateSchema = z.object({
  triggerId: triggerIdSchema,
  active: z.boolean(),
  fired: z.boolean(),
  firedCount: z.number().int().nonnegative(),
  lastFiredAt: isoDateTimeStringSchema.optional(),
});

export type ReactionTriggerDefinitionInput = z.input<
  typeof reactionTriggerDefinitionSchema
>;