import type {
  ActionId,
  CharacterId,
  EvidenceId,
  FactId,
  ForensicTestId,
  InterviewId,
  LocationId,
  OffenseId,
  SearchZoneId,
  SessionId,
  StatementId,
  WarrantApplicationId,
  WarrantId,
} from "./ids.js";

import type {
  DomainSchemaVersion,
  IsoDateTimeString,
} from "./common.js";

export type GameActionType =
  | "START_INTERVIEW"
  | "ASK_QUESTION"
  | "PRESENT_EVIDENCE"
  | "END_INTERVIEW"
  | "TRAVEL"
  | "ADVANCE_TIME"
  | "REQUEST_CONSENT"
  | "SEARCH_BY_CONSENT"
  | "SEARCH_PUBLIC_AREA"
  | "SUBMIT_WARRANT_APPLICATION"
  | "EXECUTE_WARRANT"
  | "SEARCH_AUTHORIZED_AREA"
  | "COLLECT_EVIDENCE"
  | "INSPECT_EVIDENCE"
  | "SUBMIT_FORENSIC_REQUEST"
  | "REVIEW_FORENSIC_RESULT"
  | "REQUEST_RECORDS"
  | "REVIEW_RECORDS"
  | "REVIEW_DIGITAL_MATERIAL"
  | "COMPARE_STATEMENTS"
  | "CONSULT_INVESTIGATOR"
  | "CONSULT_PROSECUTOR"
  | "TEMPORARILY_DETAIN"
  | "RELEASE_DETAINEE"
  | "ARREST"
  | "RECOMMEND_CHARGES"
  | "SUBMIT_CASE";

export type ActionSource =
  | "PLAYER_UI"
  | "PLAYER_NATURAL_LANGUAGE"
  | "SYSTEM"
  | "DEVELOPER_TOOL";

export interface ActionRequestBase {
  schemaVersion: DomainSchemaVersion;
  actionId: ActionId;
  sessionId: SessionId;
  actionType: GameActionType;
  source: ActionSource;
  requestedAt: IsoDateTimeString;
}

export interface StartInterviewAction extends ActionRequestBase {
  actionType: "START_INTERVIEW";
  characterId: CharacterId;
}

export interface AskQuestionAction extends ActionRequestBase {
  actionType: "ASK_QUESTION";
  characterId: CharacterId;
  interviewId: InterviewId;
  text: string;
}

export interface PresentEvidenceAction extends ActionRequestBase {
  actionType: "PRESENT_EVIDENCE";
  characterId: CharacterId;
  interviewId: InterviewId;
  evidenceIds: EvidenceId[];
  text?: string;
}

export interface EndInterviewAction extends ActionRequestBase {
  actionType: "END_INTERVIEW";
  characterId: CharacterId;
  interviewId: InterviewId;
}

export interface TravelAction extends ActionRequestBase {
  actionType: "TRAVEL";
  destinationLocationId: LocationId;
}

export interface AdvanceTimeAction extends ActionRequestBase {
  actionType: "ADVANCE_TIME";
  minutes: number;
  reason?: string;
}

export interface RequestConsentAction extends ActionRequestBase {
  actionType: "REQUEST_CONSENT";
  characterId: CharacterId;
  locationId: LocationId;
  requestedZoneIds: SearchZoneId[];
}

export interface SearchByConsentAction extends ActionRequestBase {
  actionType: "SEARCH_BY_CONSENT";
  locationId: LocationId;
  zoneIds: SearchZoneId[];
}

export interface SearchPublicAreaAction extends ActionRequestBase {
  actionType: "SEARCH_PUBLIC_AREA";
  locationId: LocationId;
  zoneIds: SearchZoneId[];
}

export interface SubmitWarrantApplicationAction extends ActionRequestBase {
  actionType: "SUBMIT_WARRANT_APPLICATION";
  applicationId: WarrantApplicationId;
  locationId: LocationId;
  requestedZoneIds: SearchZoneId[];
  supportingFactIds: FactId[];
  narrative: string;
}

export interface ExecuteWarrantAction extends ActionRequestBase {
  actionType: "EXECUTE_WARRANT";
  warrantId: WarrantId;
}

export interface SearchAuthorizedAreaAction extends ActionRequestBase {
  actionType: "SEARCH_AUTHORIZED_AREA";
  locationId: LocationId;
  zoneIds: SearchZoneId[];
  warrantId?: WarrantId;
}

export interface CollectEvidenceAction extends ActionRequestBase {
  actionType: "COLLECT_EVIDENCE";
  evidenceId: EvidenceId;
}

export interface InspectEvidenceAction extends ActionRequestBase {
  actionType: "INSPECT_EVIDENCE";
  evidenceId: EvidenceId;
}

export interface SubmitForensicRequestAction extends ActionRequestBase {
  actionType: "SUBMIT_FORENSIC_REQUEST";
  evidenceId: EvidenceId;
  testId: ForensicTestId;
}

export interface ReviewForensicResultAction extends ActionRequestBase {
  actionType: "REVIEW_FORENSIC_RESULT";
  forensicRequestId: string;
}

export interface RequestRecordsAction extends ActionRequestBase {
  actionType: "REQUEST_RECORDS";
  recordType: string;
  targetRef: string;
  supportingFactIds: FactId[];
}

export interface ReviewRecordsAction extends ActionRequestBase {
  actionType: "REVIEW_RECORDS";
  recordId: string;
}

export interface ReviewDigitalMaterialAction extends ActionRequestBase {
  actionType: "REVIEW_DIGITAL_MATERIAL";
  recordId: string;
}

export interface CompareStatementsAction extends ActionRequestBase {
  actionType: "COMPARE_STATEMENTS";
  statementIds: StatementId[];
}

export interface ConsultInvestigatorAction extends ActionRequestBase {
  actionType: "CONSULT_INVESTIGATOR";
  topic: string;
}

export interface ConsultProsecutorAction extends ActionRequestBase {
  actionType: "CONSULT_PROSECUTOR";
  subjectCharacterId?: CharacterId;
  offenseIds?: OffenseId[];
}

export interface TemporarilyDetainAction extends ActionRequestBase {
  actionType: "TEMPORARILY_DETAIN";
  characterId: CharacterId;
  supportingFactIds: FactId[];
}

export interface ReleaseDetaineeAction extends ActionRequestBase {
  actionType: "RELEASE_DETAINEE";
  characterId: CharacterId;
}

export interface ArrestAction extends ActionRequestBase {
  actionType: "ARREST";
  characterId: CharacterId;
  supportingFactIds: FactId[];
}

export interface RecommendChargesAction extends ActionRequestBase {
  actionType: "RECOMMEND_CHARGES";
  characterId: CharacterId;
  offenseIds: OffenseId[];
  supportingEvidenceIds: EvidenceId[];
}

export interface SubmitCaseAction extends ActionRequestBase {
  actionType: "SUBMIT_CASE";
  allegedResponsibleCharacterIds: CharacterId[];
  recommendedOffenseIds: OffenseId[];
  supportingEvidenceIds: EvidenceId[];
  supportingFactIds: FactId[];
  theoryText: string;
}

export type GameActionRequest =
  | StartInterviewAction
  | AskQuestionAction
  | PresentEvidenceAction
  | EndInterviewAction
  | TravelAction
  | AdvanceTimeAction
  | RequestConsentAction
  | SearchByConsentAction
  | SearchPublicAreaAction
  | SubmitWarrantApplicationAction
  | ExecuteWarrantAction
  | SearchAuthorizedAreaAction
  | CollectEvidenceAction
  | InspectEvidenceAction
  | SubmitForensicRequestAction
  | ReviewForensicResultAction
  | RequestRecordsAction
  | ReviewRecordsAction
  | ReviewDigitalMaterialAction
  | CompareStatementsAction
  | ConsultInvestigatorAction
  | ConsultProsecutorAction
  | TemporarilyDetainAction
  | ReleaseDetaineeAction
  | ArrestAction
  | RecommendChargesAction
  | SubmitCaseAction;

export type ActionValidationStatus =
  | "VALID"
  | "REJECTED"
  | "REQUIRES_CONFIRMATION";

export interface ActionValidationResult {
  actionId: ActionId;
  status: ActionValidationStatus;
  reasonCodes: string[];
  message?: string;
}