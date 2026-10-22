import { z } from "zod";

import {
  domainSchemaVersionSchema,
} from "./common.schema.js";

const discoveryRuleIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);
const characterIdSchema = z.string().min(1);
const statementIdSchema = z.string().min(1);
const locationIdSchema = z.string().min(1);

export const discoveryTargetTypeSchema = z.enum([
  "FACT",
  "EVIDENCE",
  "CHARACTER",
  "LOCATION",
  "STATEMENT",
  "RECORD",
]);

export const discoveryConditionTypeSchema = z.enum([
  "FACT_KNOWN",
  "EVIDENCE_DISCOVERED",
  "EVIDENCE_COLLECTED",
  "CHARACTER_INTERVIEWED",
  "STATEMENT_RECORDED",
  "LOCATION_VISITED",
  "LOCATION_SEARCHED",
  "FORENSIC_RESULT_REVEALED",
  "WARRANT_APPROVED",
  "WARRANT_EXECUTED",
  "TIME_REACHED",
  "EVENT_OCCURRED",
  "PLAYER_ACTION_COMPLETED",
]);

export const discoveryLogicSchema = z.enum([
  "ALL",
  "ANY",
]);

export const discoveryConditionSchema = z.object({
  conditionType: discoveryConditionTypeSchema,
  factId: factIdSchema.optional(),
  evidenceId: evidenceIdSchema.optional(),
  characterId: characterIdSchema.optional(),
  statementId: statementIdSchema.optional(),
  locationId: locationIdSchema.optional(),
  referenceId: z.string().min(1).optional(),
  expectedValue: z.string().min(1).optional(),
});

export const discoveryTargetSchema = z.object({
  targetType: discoveryTargetTypeSchema,
  targetId: z.string().min(1),
});

export const discoveryRuleDefinitionSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,
  id: discoveryRuleIdSchema,
  label: z.string().min(1),
  logic: discoveryLogicSchema,
  conditions: z.array(discoveryConditionSchema).min(1),
  targets: z.array(discoveryTargetSchema).min(1),
  repeatable: z.boolean(),
  persistentIfMissed: z.boolean(),
  routeGroupId: z.string().min(1).optional(),
});

export const discoveryRuleRuntimeStateSchema = z.object({
  ruleId: discoveryRuleIdSchema,
  satisfied: z.boolean(),
  fired: z.boolean(),
  firedCount: z.number().int().nonnegative(),
});

export const discoveryRouteDefinitionSchema = z.object({
  routeId: z.string().min(1),
  label: z.string().min(1),
  criticalFactIds: z.array(factIdSchema),
  ruleIds: z.array(discoveryRuleIdSchema).min(1),
  materiallyDistinct: z.boolean(),
});

export const criticalFactProtectionSchema = z.enum([
  "REDUNDANT",
  "RECOVERABLE",
  "PERSISTENT",
]);

export const criticalFactRecoveryDefinitionSchema = z.object({
  factId: factIdSchema,
  protection: z.array(criticalFactProtectionSchema).min(1),
  discoveryRuleIds: z.array(discoveryRuleIdSchema).min(1),
});

export type DiscoveryRuleDefinitionInput = z.input<
  typeof discoveryRuleDefinitionSchema
>;

export type DiscoveryRouteDefinitionInput = z.input<
  typeof discoveryRouteDefinitionSchema
>;