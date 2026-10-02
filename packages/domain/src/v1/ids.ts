declare const __brand: unique symbol;

export type Brand<TValue, TBrand extends string> = TValue & {
  readonly [__brand]: TBrand;
};

export type CaseId = Brand<string, "CaseId">;
export type CharacterId = Brand<string, "CharacterId">;
export type LocationId = Brand<string, "LocationId">;
export type EvidenceId = Brand<string, "EvidenceId">;
export type FactId = Brand<string, "FactId">;
export type StatementId = Brand<string, "StatementId">;
export type ForensicTestId = Brand<string, "ForensicTestId">;
export type ForensicRequestId = Brand<string, "ForensicRequestId">;
export type DiscoveryRuleId = Brand<string, "DiscoveryRuleId">;
export type TriggerId = Brand<string, "TriggerId">;
export type WarrantId = Brand<string, "WarrantId">;
export type WarrantApplicationId = Brand<string, "WarrantApplicationId">;
export type EventId = Brand<string, "EventId">;
export type ActionId = Brand<string, "ActionId">;
export type SessionId = Brand<string, "SessionId">;
export type UserId = Brand<string, "UserId">;
export type InterviewId = Brand<string, "InterviewId">;
export type RecordId = Brand<string, "RecordId">;
export type OutcomeId = Brand<string, "OutcomeId">;
export type CheckpointId = Brand<string, "CheckpointId">;
export type OffenseId = Brand<string, "OffenseId">;
export type SearchZoneId = Brand<string, "SearchZoneId">;

export type EntityId =
  | CaseId
  | CharacterId
  | LocationId
  | EvidenceId
  | FactId
  | StatementId
  | ForensicTestId
  | ForensicRequestId
  | DiscoveryRuleId
  | TriggerId
  | WarrantId
  | WarrantApplicationId
  | EventId
  | ActionId
  | SessionId
  | UserId
  | InterviewId
  | RecordId
  | OutcomeId
  | CheckpointId
  | OffenseId
  | SearchZoneId;

export const asCaseId = (value: string): CaseId => value as CaseId;

export const asCharacterId = (value: string): CharacterId =>
  value as CharacterId;

export const asLocationId = (value: string): LocationId =>
  value as LocationId;

export const asEvidenceId = (value: string): EvidenceId =>
  value as EvidenceId;

export const asFactId = (value: string): FactId =>
  value as FactId;

export const asStatementId = (value: string): StatementId =>
  value as StatementId;

export const asForensicTestId = (value: string): ForensicTestId =>
  value as ForensicTestId;

export const asForensicRequestId = (value: string): ForensicRequestId =>
  value as ForensicRequestId;

export const asDiscoveryRuleId = (value: string): DiscoveryRuleId =>
  value as DiscoveryRuleId;

export const asTriggerId = (value: string): TriggerId =>
  value as TriggerId;

export const asWarrantId = (value: string): WarrantId =>
  value as WarrantId;

export const asWarrantApplicationId = (
  value: string,
): WarrantApplicationId =>
  value as WarrantApplicationId;

export const asEventId = (value: string): EventId =>
  value as EventId;

export const asActionId = (value: string): ActionId =>
  value as ActionId;

export const asSessionId = (value: string): SessionId =>
  value as SessionId;

export const asUserId = (value: string): UserId =>
  value as UserId;

export const asInterviewId = (value: string): InterviewId =>
  value as InterviewId;

export const asRecordId = (value: string): RecordId =>
  value as RecordId;

export const asOutcomeId = (value: string): OutcomeId =>
  value as OutcomeId;

export const asCheckpointId = (value: string): CheckpointId =>
  value as CheckpointId;

export const asOffenseId = (value: string): OffenseId =>
  value as OffenseId;

export const asSearchZoneId = (value: string): SearchZoneId =>
  value as SearchZoneId;