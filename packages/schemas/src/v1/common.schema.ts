import { z } from "zod";

export const domainSchemaVersionSchema = z.literal(1);

export const isoDateTimeStringSchema = z
  .string()
  .datetime({ offset: true });

export const gameMinuteSchema = z
  .number()
  .int()
  .nonnegative();

export const visibilityLevelSchema = z.enum([
  "SERVER_ONLY",
  "AI_PROJECTABLE",
  "PLAYER_VISIBLE",
]);

export const entityStatusSchema = z.enum([
  "ACTIVE",
  "INACTIVE",
  "ARCHIVED",
]);

export const confidenceLevelSchema = z.enum([
  "LOW",
  "MEDIUM",
  "HIGH",
]);

export const legalUsabilitySchema = z.enum([
  "USABLE",
  "DISPUTED",
  "SUPPRESSED",
  "UNKNOWN",
]);

export const discoveryStatusSchema = z.enum([
  "UNDISCOVERED",
  "DISCOVERED",
]);

export const collectionStatusSchema = z.enum([
  "NOT_COLLECTED",
  "COLLECTED",
]);

export const testStatusSchema = z.enum([
  "NOT_REQUESTED",
  "PENDING",
  "COMPLETED",
  "CANCELLED",
]);

export const requestStatusSchema = z.enum([
  "DRAFT",
  "SUBMITTED",
  "APPROVED",
  "DENIED",
  "CANCELLED",
  "COMPLETED",
]);

export const legalDecisionSchema = z.enum([
  "SUPPORTED",
  "NOT_SUPPORTED",
]);

export const validationSeveritySchema = z.enum([
  "INFO",
  "WARNING",
  "ERROR",
]);

export const validationIssueSchema = z.object({
  code: z.string().min(1),
  severity: validationSeveritySchema,
  message: z.string().min(1),
  entityId: z.string().min(1).optional(),
  path: z.string().min(1).optional(),
});

export const validationResultSchema = z.object({
  valid: z.boolean(),
  issues: z.array(validationIssueSchema),
});

export const gameTimeRangeSchema = z.object({
  start: isoDateTimeStringSchema,
  end: isoDateTimeStringSchema.optional(),
});

export const numericRangeSchema = z
  .object({
    min: z.number(),
    max: z.number(),
  })
  .refine((value) => value.max >= value.min, {
    message: "max must be greater than or equal to min",
    path: ["max"],
  });

export const stringMapSchema = z.record(
  z.string(),
  z.string(),
);

export const booleanMapSchema = z.record(
  z.string(),
  z.boolean(),
);

export const numberMapSchema = z.record(
  z.string(),
  z.number(),
);

export type ValidationIssueInput = z.input<
  typeof validationIssueSchema
>;

export type ValidationResultInput = z.input<
  typeof validationResultSchema
>;