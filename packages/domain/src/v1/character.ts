import type {
  CharacterId,
  EvidenceId,
  FactId,
  InterviewId,
  StatementId,
} from "./ids.js";

import type {
  DomainSchemaVersion,
  IsoDateTimeString,
} from "./common.js";

export type CharacterRole =
  | "WITNESS"
  | "SUSPECT"
  | "VICTIM"
  | "PERSON_OF_INTEREST"
  | "ACCOMPLICE"
  | "INVESTIGATOR"
  | "PATROL_OFFICER"
  | "FORENSIC_PERSONNEL"
  | "MEDICAL_EXAMINER"
  | "DISPATCHER"
  | "INFORMANT"
  | "ATTORNEY"
  | "PROSECUTOR"
  | "JUDGE"
  | "OTHER";

export type LegalStatus =
  | "UNKNOWN"
  | "WITNESS"
  | "PERSON_OF_INTEREST"
  | "SUSPECT"
  | "DETAINED"
  | "ARRESTED"
  | "RELEASED";

export type CooperationLevel =
  | "HOSTILE"
  | "RESISTANT"
  | "GUARDED"
  | "NEUTRAL"
  | "COOPERATIVE"
  | "HIGHLY_COOPERATIVE";

export type StressLevel =
  | "CALM"
  | "UNEASY"
  | "STRESSED"
  | "HIGHLY_STRESSED"
  | "OVERWHELMED";

export type TrustLevel =
  | "VERY_LOW"
  | "LOW"
  | "NEUTRAL"
  | "HIGH"
  | "VERY_HIGH";

export type KnowledgeState =
  | "KNOWS"
  | "BELIEVES_FALSELY"
  | "DOES_NOT_KNOW"
  | "FORBIDDEN";

export type DisclosureBoundary =
  | "WILL_SHARE"
  | "MAY_SHARE"
  | "WILL_NOT_SHARE"
  | "SHARE_ONLY_IF_TRIGGERED";

export interface CharacterIdentity {
  displayName: string;
  age?: number;
  occupation?: string;
  role: CharacterRole;
}

export interface CharacterBiography {
  publicBiography: string;
  privateBiography?: string;
}

export interface CharacterPersonality {
  traits: string[];
  speechStyle: string;
  temperament: string;
}

export interface CharacterMotivation {
  goalIds: string[];
  fearIds: string[];
  pressureIds: string[];
}

export interface CharacterKnowledgeEntry {
  factId: FactId;
  state: KnowledgeState;
}

export interface CharacterDisclosureRule {
  factId: FactId;
  boundary: DisclosureBoundary;
  triggerIds: string[];
}

export interface CharacterCoverStory {
  id: string;
  label: string;
  authoredClaims: string[];
  activeByDefault: boolean;
}

export interface CharacterDefinition {
  schemaVersion: DomainSchemaVersion;
  id: CharacterId;
  identity: CharacterIdentity;
  biography: CharacterBiography;
  personality: CharacterPersonality;
  motivations: CharacterMotivation;
  relationshipIds: string[];
}

export interface CharacterPrivateDefinition {
  schemaVersion: DomainSchemaVersion;
  characterId: CharacterId;
  knowledge: CharacterKnowledgeEntry[];
  disclosureRules: CharacterDisclosureRule[];
  coverStories: CharacterCoverStory[];
  forbiddenFactIds: FactId[];
}

export interface CharacterRuntimeState {
  characterId: CharacterId;
  legalStatus: LegalStatus;
  cooperation: CooperationLevel;
  stress: StressLevel;
  trust: TrustLevel;
  attorneyRequested: boolean;
  interviewAvailable: boolean;
  evidenceShownIds: EvidenceId[];
  knownPlayerEvidenceIds: EvidenceId[];
  interviewIds: InterviewId[];
  statementIds: StatementId[];
  contradictionIds: string[];
  activeBehaviorFlags: string[];
  updatedAt: IsoDateTimeString;
}

export interface CharacterAiProjection {
  characterId: CharacterId;
  identity: CharacterIdentity;
  personality: CharacterPersonality;
  publicBiography: string;
  permittedPrivateFacts: FactId[];
  permittedFalseBeliefFacts: FactId[];
  activeCoverStories: CharacterCoverStory[];
  disclosureRules: CharacterDisclosureRule[];
  motivations: CharacterMotivation;
  legalStatus: LegalStatus;
  cooperation: CooperationLevel;
  stress: StressLevel;
  trust: TrustLevel;
  attorneyRequested: boolean;
  evidenceShownIds: EvidenceId[];
  relevantPriorStatementIds: StatementId[];
  activeBehaviorFlags: string[];
}

export interface CharacterPlayerProjection {
  characterId: CharacterId;
  identity: CharacterIdentity;
  publicBiography: string;
  legalStatus: LegalStatus;
  interviewAvailable: boolean;
  evidenceShownIds: EvidenceId[];
  interviewIds: InterviewId[];
  statementIds: StatementId[];
}