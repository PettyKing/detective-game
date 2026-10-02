import type {
  CharacterId,
  EvidenceId,
  FactId,
  LocationId,
  TriggerId,
} from "./ids.js";

import type {
  DomainSchemaVersion,
  IsoDateTimeString,
} from "./common.js";

export type TriggerConditionType =
  | "FACT_KNOWN"
  | "FACT_UNKNOWN"
  | "EVIDENCE_DISCOVERED"
  | "EVIDENCE_COLLECTED"
  | "CHARACTER_INTERVIEWED"
  | "CHARACTER_DETAINED"
  | "CHARACTER_ARRESTED"
  | "LOCATION_VISITED"
  | "FORENSIC_TEST_COMPLETED"
  | "WARRANT_APPROVED"
  | "WARRANT_DENIED"
  | "WARRANT_EXECUTED"
  | "TIME_AT_OR_AFTER"
  | "EVENT_OCCURRED"
  | "CHECKPOINT_REACHED";

export type TriggerLogic =
  | "ALL"
  | "ANY";

export interface TriggerCondition {
  conditionType: TriggerConditionType;
  factId?: FactId;
  evidenceId?: EvidenceId;
  characterId?: CharacterId;
  locationId?: LocationId;
  referenceId?: string;
  time?: IsoDateTimeString;
}

export type TriggerEffectType =
  | "MAKE_CHARACTER_AVAILABLE"
  | "MAKE_CHARACTER_UNAVAILABLE"
  | "CHANGE_CHARACTER_STATE"
  | "REVEAL_FACT"
  | "REVEAL_LOCATION"
  | "REVEAL_EVIDENCE"
  | "SCHEDULE_EVENT"
  | "CREATE_NOTIFICATION"
  | "CHANGE_LOCATION_STATE"
  | "ENABLE_ACTION"
  | "DISABLE_ACTION";

export interface TriggerEffect {
  effectType: TriggerEffectType;
  targetId?: string;
  value?: string;
  delayMinutes?: number;
}

export interface ReactionTriggerDefinition {
  schemaVersion: DomainSchemaVersion;
  id: TriggerId;
  label: string;
  logic: TriggerLogic;
  conditions: TriggerCondition[];
  effects: TriggerEffect[];
  once: boolean;
  aiPresentationProfileId?: string;
}

export interface TriggerRuntimeState {
  triggerId: TriggerId;
  active: boolean;
  fired: boolean;
  firedCount: number;
  lastFiredAt?: IsoDateTimeString;
}