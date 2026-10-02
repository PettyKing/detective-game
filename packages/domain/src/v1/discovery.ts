import type {
  CharacterId,
  DiscoveryRuleId,
  EvidenceId,
  FactId,
  LocationId,
  StatementId,
} from "./ids.js";

import type {
  DomainSchemaVersion,
} from "./common.js";

export type DiscoveryTargetType =
  | "FACT"
  | "EVIDENCE"
  | "CHARACTER"
  | "LOCATION"
  | "STATEMENT"
  | "RECORD";

export type DiscoveryConditionType =
  | "FACT_KNOWN"
  | "EVIDENCE_DISCOVERED"
  | "EVIDENCE_COLLECTED"
  | "CHARACTER_INTERVIEWED"
  | "STATEMENT_RECORDED"
  | "LOCATION_VISITED"
  | "LOCATION_SEARCHED"
  | "FORENSIC_RESULT_REVEALED"
  | "WARRANT_APPROVED"
  | "WARRANT_EXECUTED"
  | "TIME_REACHED"
  | "EVENT_OCCURRED"
  | "PLAYER_ACTION_COMPLETED";

export type DiscoveryLogic =
  | "ALL"
  | "ANY";

export interface DiscoveryCondition {
  conditionType: DiscoveryConditionType;
  factId?: FactId;
  evidenceId?: EvidenceId;
  characterId?: CharacterId;
  statementId?: StatementId;
  locationId?: LocationId;
  referenceId?: string;
  expectedValue?: string;
}

export interface DiscoveryTarget {
  targetType: DiscoveryTargetType;
  targetId: string;
}

export interface DiscoveryRuleDefinition {
  schemaVersion: DomainSchemaVersion;
  id: DiscoveryRuleId;
  label: string;
  logic: DiscoveryLogic;
  conditions: DiscoveryCondition[];
  targets: DiscoveryTarget[];
  repeatable: boolean;
  persistentIfMissed: boolean;
  routeGroupId?: string;
}

export interface DiscoveryRuleRuntimeState {
  ruleId: DiscoveryRuleId;
  satisfied: boolean;
  fired: boolean;
  firedCount: number;
}

export interface DiscoveryRouteDefinition {
  routeId: string;
  label: string;
  criticalFactIds: FactId[];
  ruleIds: DiscoveryRuleId[];
  materiallyDistinct: boolean;
}

export type CriticalFactProtection =
  | "REDUNDANT"
  | "RECOVERABLE"
  | "PERSISTENT";

export interface CriticalFactRecoveryDefinition {
  factId: FactId;
  protection: CriticalFactProtection[];
  discoveryRuleIds: DiscoveryRuleId[];
}