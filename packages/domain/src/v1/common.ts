export const DOMAIN_SCHEMA_VERSION = 1 as const;

export type DomainSchemaVersion = typeof DOMAIN_SCHEMA_VERSION;

export type IsoDateTimeString = string;

export type GameMinute = number;

export type VisibilityLevel =
  | "SERVER_ONLY"
  | "AI_PROJECTABLE"
  | "PLAYER_VISIBLE";

export type EntityStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "ARCHIVED";

export type ConfidenceLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export type LegalUsability =
  | "USABLE"
  | "DISPUTED"
  | "SUPPRESSED"
  | "UNKNOWN";

export type DiscoveryStatus =
  | "UNDISCOVERED"
  | "DISCOVERED";

export type CollectionStatus =
  | "NOT_COLLECTED"
  | "COLLECTED";

export type TestStatus =
  | "NOT_REQUESTED"
  | "PENDING"
  | "COMPLETED"
  | "CANCELLED";

export type RequestStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "APPROVED"
  | "DENIED"
  | "CANCELLED"
  | "COMPLETED";

export type LegalDecision =
  | "SUPPORTED"
  | "NOT_SUPPORTED";

export type ValidationSeverity =
  | "INFO"
  | "WARNING"
  | "ERROR";

export interface VersionedEntity {
  schemaVersion: DomainSchemaVersion;
}

export interface TimestampedEntity {
  createdAt: IsoDateTimeString;
  updatedAt: IsoDateTimeString;
}

export interface ValidationIssue {
  code: string;
  severity: ValidationSeverity;
  message: string;
  entityId?: string;
  path?: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface GameTimeRange {
  start: IsoDateTimeString;
  end?: IsoDateTimeString;
}

export interface NumericRange {
  min: number;
  max: number;
}

export interface StringMap {
  [key: string]: string;
}

export interface BooleanMap {
  [key: string]: boolean;
}

export interface NumberMap {
  [key: string]: number;
}