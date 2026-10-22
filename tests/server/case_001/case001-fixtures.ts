export const SPOILER_WARNING =
  "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER";

export const syntheticCanonicalCase = {
  schemaVersion: 1,
  warning: SPOILER_WARNING,
  caseId: "case_001",
  caseVersion: "0.1.0",
  canonicalNarrative:
    "Synthetic validation fixture only.",
  victimCharacterIds: ["char_006"],
  responsibleCharacterIds: ["char_001"],
  accompliceCharacterIds: [],
  primaryOffenseIds: ["offense_001"],
  motiveFactIds: ["fact_001"],
  methodFactIds: ["fact_002"],
  opportunityFactIds: ["fact_003"],
  criticalTimelineFactIds: ["fact_004"],
  essentialEvidenceIds: ["ev_001"],
  solutionFactIds: [
    "fact_001",
    "fact_002",
    "fact_003",
  ],
  startingGameTime: "2026-01-01T08:00:00Z",
  startingLocationId: "loc_001",
};

export const syntheticEvaluationPackage = {
  schemaVersion: 1,
  warning: SPOILER_WARNING,

  offenseElements: [
    {
      elementId: "element_001",
      offenseId: "offense_001",
      description:
        "Synthetic offense element used for validation.",
      supportingFactIds: ["fact_001"],
      supportingEvidenceIds: ["ev_001"],
      minimumSupportCount: 1,
    },
  ],

  prosecutorRules: [
    {
      id: "prosecutor_rule_001",
      targetCharacterId: "char_001",
      offenseId: "offense_001",
      requiredElementIds: ["element_001"],
      minimumSatisfiedElements: 1,
      disqualifyingViolationCodes: [],
      permittedReducedOffenseIds: [],
    },
  ],

  outcomeRules: [
    {
      id: "outcome_001",
      category: "STRONG_CASE",
      priority: 10,
      requirements: {
        logic: "ALL",
        requiredFactIds: ["fact_001"],
        requiredEvidenceIds: ["ev_001"],
        requiredCharacterIds: ["char_001"],
        requiredOffenseIds: ["offense_001"],
        forbiddenViolationCodes: [],
      },
      resultCode: "result_001",
    },
    {
      id: "outcome_002",
      category: "INSUFFICIENT_EVIDENCE",
      priority: 20,
      requirements: {
        logic: "ALL",
        requiredFactIds: [],
        requiredEvidenceIds: [],
        requiredCharacterIds: [],
        requiredOffenseIds: [],
        forbiddenViolationCodes: [],
      },
      resultCode: "result_002",
    },
    {
      id: "outcome_003",
      category: "PROCEDURAL_DAMAGE",
      priority: 30,
      requirements: {
        logic: "ALL",
        requiredFactIds: [],
        requiredEvidenceIds: [],
        requiredCharacterIds: [],
        requiredOffenseIds: [],
        forbiddenViolationCodes: [],
      },
      resultCode: "result_003",
    },
    {
      id: "outcome_004",
      category: "WRONG_PERSON",
      priority: 40,
      requirements: {
        logic: "ALL",
        requiredFactIds: [],
        requiredEvidenceIds: [],
        requiredCharacterIds: [],
        requiredOffenseIds: [],
        forbiddenViolationCodes: [],
      },
      resultCode: "result_004",
    },
    {
      id: "outcome_005",
      category: "MISSED_PARTICIPANT",
      priority: 50,
      requirements: {
        logic: "ALL",
        requiredFactIds: [],
        requiredEvidenceIds: [],
        requiredCharacterIds: [],
        requiredOffenseIds: [],
        forbiddenViolationCodes: [],
      },
      resultCode: "result_005",
    },
    {
      id: "outcome_006",
      category: "PROSECUTOR_DECLINES",
      priority: 60,
      requirements: {
        logic: "ALL",
        requiredFactIds: [],
        requiredEvidenceIds: [],
        requiredCharacterIds: [],
        requiredOffenseIds: [],
        forbiddenViolationCodes: [],
      },
      resultCode: "result_006",
    },
    {
      id: "outcome_007",
      category: "REDUCED_CHARGES",
      priority: 70,
      requirements: {
        logic: "ALL",
        requiredFactIds: [],
        requiredEvidenceIds: [],
        requiredCharacterIds: [],
        requiredOffenseIds: [],
        forbiddenViolationCodes: [],
      },
      resultCode: "result_007",
    },
    {
      id: "outcome_008",
      category: "ACQUITTAL",
      priority: 80,
      requirements: {
        logic: "ALL",
        requiredFactIds: [],
        requiredEvidenceIds: [],
        requiredCharacterIds: [],
        requiredOffenseIds: [],
        forbiddenViolationCodes: [],
      },
      resultCode: "result_008",
    },
    {
      id: "outcome_009",
      category: "CONVICTION",
      priority: 90,
      requirements: {
        logic: "ALL",
        requiredFactIds: [],
        requiredEvidenceIds: [],
        requiredCharacterIds: [],
        requiredOffenseIds: [],
        forbiddenViolationCodes: [],
      },
      resultCode: "result_009",
    },
    {
      id: "outcome_010",
      category: "UNSOLVED",
      priority: 100,
      requirements: {
        logic: "ALL",
        requiredFactIds: [],
        requiredEvidenceIds: [],
        requiredCharacterIds: [],
        requiredOffenseIds: [],
        forbiddenViolationCodes: [],
      },
      resultCode: "result_010",
    },
  ],

  essentialSolutionFactIds: [
    "fact_001",
  ],

  essentialSolutionEvidenceIds: [
    "ev_001",
  ],
};

export const syntheticRoutes = [
  {
    routeId: "route_001",
    criticalFactIds: ["fact_001"],
    discoveryRuleIds: ["discovery_001"],
    materiallyDistinct: true,
  },
  {
    routeId: "route_002",
    criticalFactIds: ["fact_001"],
    discoveryRuleIds: ["discovery_002"],
    materiallyDistinct: true,
  },
];

export const syntheticRecoveryRules = [
  {
    factId: "fact_001",
    discoveryRuleIds: [
      "discovery_001",
      "discovery_002",
    ],
    protection: [
      "REDUNDANT" as const,
      "RECOVERABLE" as const,
    ],
  },
];

export const syntheticCheckpoints = [
  {
    id: "checkpoint_001",
    label: "START",
  },
  {
    id: "checkpoint_002",
    label: "INITIAL_INTERVIEWS_COMPLETE",
  },
  {
    id: "checkpoint_003",
    label: "EVIDENCE_DISCOVERED",
  },
  {
    id: "checkpoint_004",
    label: "FORENSICS_READY",
  },
  {
    id: "checkpoint_005",
    label: "WARRANT_READY",
  },
  {
    id: "checkpoint_006",
    label: "WARRANT_APPROVED",
  },
  {
    id: "checkpoint_007",
    label: "PRE_ARREST",
  },
  {
    id: "checkpoint_008",
    label: "PROSECUTOR_REVIEW",
  },
  {
    id: "checkpoint_009",
    label: "RESOLUTION",
  },
];