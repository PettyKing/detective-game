import type {
  CharacterId,
  DiscoveryRuleId,
  EvidenceId,
  LocationId,
  SearchZoneId,
} from "./ids.js";

import type {
  DomainSchemaVersion,
} from "./common.js";

export type LocationType =
  | "RESIDENCE"
  | "BUSINESS"
  | "PUBLIC_AREA"
  | "LAW_ENFORCEMENT"
  | "MEDICAL"
  | "FORENSIC_FACILITY"
  | "VEHICLE"
  | "OUTDOOR_AREA"
  | "OTHER";

export type LocationAccessType =
  | "PUBLIC"
  | "PRIVATE"
  | "RESTRICTED"
  | "CONTROLLED";

export type SearchZoneAccessType =
  | "OPEN"
  | "CLOSED"
  | "LOCKED"
  | "RESTRICTED";

export interface SearchZoneDefinition {
  id: SearchZoneId;
  locationId: LocationId;
  name: string;
  description: string;
  accessType: SearchZoneAccessType;
  searchable: boolean;
  parentZoneId?: SearchZoneId;
  evidenceIds: EvidenceId[];
  discoveryRuleIds: DiscoveryRuleId[];
}

export interface LocationDefinition {
  schemaVersion: DomainSchemaVersion;
  id: LocationId;
  name: string;
  type: LocationType;
  description: string;
  accessType: LocationAccessType;
  ownerCharacterId?: CharacterId;
  occupantCharacterIds: CharacterId[];
  publiclyKnown: boolean;
  searchable: boolean;
  searchZones: SearchZoneDefinition[];
}

export interface LocationPrivateDefinition {
  schemaVersion: DomainSchemaVersion;
  locationId: LocationId;
  hiddenEvidenceIds: EvidenceId[];
  hiddenDiscoveryRuleIds: DiscoveryRuleId[];
  privateNotes: string[];
}

export interface LocationRuntimeState {
  locationId: LocationId;
  discovered: boolean;
  visited: boolean;
  searchableZoneIds: SearchZoneId[];
  searchedZoneIds: SearchZoneId[];
  discoveredEvidenceIds: EvidenceId[];
}

export interface LocationPlayerProjection {
  locationId: LocationId;
  name: string;
  type: LocationType;
  description: string;
  accessType: LocationAccessType;
  searchable: boolean;
  visibleSearchZones: {
    id: SearchZoneId;
    name: string;
    description: string;
    searchable: boolean;
  }[];
}

export interface LocationAiProjection {
  locationId: LocationId;
  name: string;
  type: LocationType;
  description: string;
  accessType: LocationAccessType;
  searchable: boolean;
  permittedSearchZones: {
    id: SearchZoneId;
    name: string;
    description: string;
    searchable: boolean;
  }[];
}