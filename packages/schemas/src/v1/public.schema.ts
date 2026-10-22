import { z } from "zod";

import {
  collectionStatusSchema,
  domainSchemaVersionSchema,
  isoDateTimeStringSchema,
  legalUsabilitySchema,
} from "./common.schema.js";

const caseIdSchema = z.string().min(1);
const characterIdSchema = z.string().min(1);
const locationIdSchema = z.string().min(1);
const evidenceIdSchema = z.string().min(1);
const factIdSchema = z.string().min(1);
const recordIdSchema = z.string().min(1);

export const caseDifficultySchema = z.enum([
  "INTRODUCTORY",
  "STANDARD",
  "ADVANCED",
]);

export const publicCaseMetadataSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,
  id: caseIdSchema,
  version: z.string().min(1),
  title: z.string().min(1),
  shortDescription: z.string().min(1),
  jurisdictionName: z.string().min(1),
  difficulty: caseDifficultySchema,
  estimatedPlaytimeMinutes: z.number().int().positive(),
});

export const caseStartingStateSchema = z.object({
  startingGameTime: isoDateTimeStringSchema,
  startingLocationId: locationIdSchema,
  startingKnownCharacterIds: z.array(characterIdSchema),
  startingKnownLocationIds: z.array(locationIdSchema),
  startingKnownFactIds: z.array(factIdSchema),
  startingKnownEvidenceIds: z.array(evidenceIdSchema),
  startingRecordIds: z.array(recordIdSchema),
});

export const caseScopeSummarySchema = z.object({
  characterCount: z.number().int().nonnegative(),
  locationCount: z.number().int().nonnegative(),
  evidenceCount: z.number().int().nonnegative(),
  factCount: z.number().int().nonnegative(),
  outcomeCount: z.number().int().nonnegative(),
});

export const casePresentationConfigSchema = z.object({
  briefingTitle: z.string().min(1),
  briefingBody: z.string().min(1),
  initialObjectives: z.array(z.string().min(1)),
  toneTags: z.array(z.string().min(1)),
  contentWarnings: z.array(z.string().min(1)),
});

export const caseDefinitionPublicSchema = z.object({
  schemaVersion: domainSchemaVersionSchema,
  metadata: publicCaseMetadataSchema,
  presentation: casePresentationConfigSchema,
  startingState: caseStartingStateSchema,
  scope: caseScopeSummarySchema,
});

export const characterRoleSchema = z.enum([
  "WITNESS",
  "SUSPECT",
  "VICTIM",
  "PERSON_OF_INTEREST",
  "ACCOMPLICE",
  "INVESTIGATOR",
  "PATROL_OFFICER",
  "FORENSIC_PERSONNEL",
  "MEDICAL_EXAMINER",
  "DISPATCHER",
  "INFORMANT",
  "ATTORNEY",
  "PROSECUTOR",
  "JUDGE",
  "OTHER",
]);

export const legalStatusSchema = z.enum([
  "UNKNOWN",
  "WITNESS",
  "PERSON_OF_INTEREST",
  "SUSPECT",
  "DETAINED",
  "ARRESTED",
  "RELEASED",
]);

export const characterIdentitySchema = z.object({
  displayName: z.string().min(1),
  age: z.number().int().positive().optional(),
  occupation: z.string().min(1).optional(),
  role: characterRoleSchema,
});

export const characterPlayerProjectionSchema = z.object({
  characterId: characterIdSchema,
  identity: characterIdentitySchema,
  publicBiography: z.string(),
  legalStatus: legalStatusSchema,
  interviewAvailable: z.boolean(),
  evidenceShownIds: z.array(evidenceIdSchema),
  interviewIds: z.array(z.string().min(1)),
  statementIds: z.array(z.string().min(1)),
});

export const evidenceTypeSchema = z.enum([
  "PHYSICAL",
  "BIOLOGICAL",
  "TRACE",
  "DIGITAL",
  "DOCUMENT",
  "PHOTOGRAPH",
  "VIDEO",
  "AUDIO",
  "WEAPON",
  "CLOTHING",
  "PERSONAL_PROPERTY",
  "OTHER",
]);

export const evidenceLegalCollectionStatusSchema = z.enum([
  "UNKNOWN",
  "LAWFUL",
  "DISPUTED",
  "UNLAWFUL",
]);

export const evidencePlayerProjectionSchema = z.object({
  evidenceId: evidenceIdSchema,
  type: evidenceTypeSchema,
  displayName: z.string().min(1),
  description: z.string(),
  mediaAssetRef: z.string().min(1).optional(),
  collectionStatus: collectionStatusSchema,
  legalCollectionStatus: evidenceLegalCollectionStatusSchema,
  legalUsability: legalUsabilitySchema,
  availableTestIds: z.array(z.string().min(1)),
  forensicRequestIds: z.array(z.string().min(1)),
  revealedTestResultIds: z.array(z.string().min(1)),
  chainOfCustody: z.array(z.unknown()),
});

export const statementPlayerProjectionSchema = z.object({
  statementId: z.string().min(1),
  speakerCharacterId: characterIdSchema,
  interviewId: z.string().min(1),
  spokenAt: isoDateTimeStringSchema,
  spokenText: z.string(),
  evidenceShownDuringStatementIds: z.array(evidenceIdSchema),
});

export const locationTypeSchema = z.enum([
  "RESIDENCE",
  "BUSINESS",
  "PUBLIC_AREA",
  "LAW_ENFORCEMENT",
  "MEDICAL",
  "FORENSIC_FACILITY",
  "VEHICLE",
  "OUTDOOR_AREA",
  "OTHER",
]);

export const locationAccessTypeSchema = z.enum([
  "PUBLIC",
  "PRIVATE",
  "RESTRICTED",
  "CONTROLLED",
]);

export const locationPlayerProjectionSchema = z.object({
  locationId: locationIdSchema,
  name: z.string().min(1),
  type: locationTypeSchema,
  description: z.string(),
  accessType: locationAccessTypeSchema,
  searchable: z.boolean(),
  visibleSearchZones: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      description: z.string(),
      searchable: z.boolean(),
    }),
  ),
});