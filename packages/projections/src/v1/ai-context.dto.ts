import type {
  CharacterId,
  EvidenceId,
  FactId,
  LocationId,
  StatementId,
} from "../../../domain/src/v1/ids.js";

import type {
  DomainSchemaVersion,
  IsoDateTimeString,
} from "../../../domain/src/v1/common.js";

import type {
  CharacterIdentity,
  CharacterMotivation,
  CharacterPersonality,
  CharacterCoverStory,
  CharacterDisclosureRule,
  CooperationLevel,
  LegalStatus,
  StressLevel,
  TrustLevel,
} from "../../../domain/src/v1/character.js";

export interface AiSceneDto {
  sceneId: string;
  currentGameTime: IsoDateTimeString;
  currentLocationId: LocationId;
  sceneDescription: string;
}

export interface AiCharacterContextDto {
  characterId: CharacterId;
  identity: CharacterIdentity;
  personality: CharacterPersonality;
  publicBiography: string;

  permittedPrivateFactIds: FactId[];

  permittedFalseBeliefFactIds: FactId[];

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

export interface AiPlayerKnownContextDto {
  knownFactIds: FactId[];
  knownEvidenceIds: EvidenceId[];
  knownCharacterIds: CharacterId[];
  knownLocationIds: LocationId[];
}

export interface AiEvidenceContextDto {
  evidenceId: EvidenceId;
  displayName: string;
  knownDescription: string;
  revealedResultIds: string[];
}

export type AiConversationSpeaker =
  | "PLAYER"
  | "CHARACTER"
  | "SYSTEM";

export interface AiConversationTurnDto {
  speaker: AiConversationSpeaker;
  text: string;
  occurredAt: IsoDateTimeString;
}

export interface AiAllowedActionDto {
  actionType: string;
  description: string;
}

export interface AiContextProjectionDto {
  schemaVersion: DomainSchemaVersion;

  scene: AiSceneDto;

  activeCharacter?: AiCharacterContextDto;

  playerKnownContext: AiPlayerKnownContextDto;

  evidenceInContext: AiEvidenceContextDto[];

  recentConversation: AiConversationTurnDto[];

  allowedActions: AiAllowedActionDto[];
}