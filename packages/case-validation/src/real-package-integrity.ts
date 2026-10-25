import type {
  ProtectedCasePackage,
  ProtectedCaseFileName,
  PublicCasePackage,
} from "./case-package-loader.js";

export interface RealPackageIntegrityIssue {
  code:
    | "PLACEHOLDER_ARTIFACT"
    | "DUPLICATE_DECLARED_ID"
    | "UNRESOLVED_REFERENCE"
    | "DUPLICATE_ARTIFACT_CONTENT"
    | "PUBLIC_PROTECTED_FIELD"
    | "COUNT_MISMATCH";
  path: string;
  message: string;
}

export interface RealPackageIntegrityResult {
  valid: boolean;
  issues: RealPackageIntegrityIssue[];
}

const EXPECTED_LOCATION_IDS = new Set([
  "loc_001",
  "loc_002",
  "loc_003",
  "loc_004",
]);

const PROTECTED_PUBLIC_FIELD_NAMES = new Set([
  "canonicalNarrative",
  "canonicalValue",
  "truthClassification",
  "intent",
  "privateBiography",
  "privateKnowledgeFactIds",
  "falseBeliefFactIds",
  "privateRelationships",
  "coverStories",
  "canonicalForensicResults",
  "canonicalSignificance",
  "responsibleCharacterIds",
  "accompliceCharacterIds",
  "solutionFactIds",
  "evaluationWeights",
  "hiddenOutcomeRequirements",
]);

const REFERENCE_PREFIXES = [
  "char_",
  "fact_",
  "ev_",
  "loc_",
  "forensic_test_",
  "forensic_result_",
  "discover_",
  "legal_rule_",
  "search_zone_",
  "statement_",
  "trigger_",
  "outcome_",
  "checkpoint_",
  "offense_",
  "support_group_",
  "evaluation_route_",
  "evaluation_outcome_",
  "resolution_rule_",
  "route_protection_",
  "route_scene_",
  "route_financial_",
  "route_opportunity_",
  "route_concealment_",
  "route_strong_",
] as const;

const isRecord = (
  value: unknown,
): value is Record<string, unknown> => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

const isReferenceLike = (
  value: string,
): boolean => {
  const normalized =
    value.startsWith("NOT_")
      ? value.slice(4)
      : value;

  return REFERENCE_PREFIXES.some(
    (prefix) =>
      normalized.startsWith(prefix),
  );
};

const normalizeReference = (
  value: string,
): string => {
  return value.startsWith("NOT_")
    ? value.slice(4)
    : value;
};

const collectionLength = (
  value: unknown,
  key: string,
): number => {
  if (!isRecord(value)) {
    return 0;
  }

  const collection = value[key];

  return Array.isArray(collection)
    ? collection.length
    : 0;
};

const collectDeclaredIds = (
  value: unknown,
  path: string,
  declarations: Map<string, string[]>,
): void => {
  if (Array.isArray(value)) {
    value.forEach(
      (entry, index) => {
        collectDeclaredIds(
          entry,
          `${path}[${index}]`,
          declarations,
        );
      },
    );

    return;
  }

  if (!isRecord(value)) {
    return;
  }

  for (
    const [key, child]
    of Object.entries(value)
  ) {
    const childPath =
      `${path}.${key}`;

    const isDeclaration =
      key === "id" ||
      key === "routeId";

    if (
      isDeclaration &&
      typeof child === "string" &&
      isReferenceLike(child)
    ) {
      const current =
        declarations.get(child) ?? [];

      current.push(childPath);

      declarations.set(
        child,
        current,
      );
    }

    collectDeclaredIds(
      child,
      childPath,
      declarations,
    );
  }
};

const collectReferences = (
  value: unknown,
  path: string,
  references: Array<{
    value: string;
    path: string;
  }>,
): void => {
  if (Array.isArray(value)) {
    value.forEach(
      (entry, index) => {
        collectReferences(
          entry,
          `${path}[${index}]`,
          references,
        );
      },
    );

    return;
  }

  if (!isRecord(value)) {
    return;
  }

  for (
    const [key, child]
    of Object.entries(value)
  ) {
    const childPath =
      `${path}.${key}`;

    const declarationKey =
      key === "id" ||
      key === "routeId";

    if (declarationKey) {
      collectReferences(
        child,
        childPath,
        references,
      );

      continue;
    }

    const referenceField =
      key.endsWith("Id") ||
      key.endsWith("Ids") ||
      key === "targetId" ||
      key === "value" ||
      key ===
        "submittedPrimarySuspectMustEqual";

    if (
      referenceField &&
      typeof child === "string" &&
      isReferenceLike(child)
    ) {
      references.push({
        value:
          normalizeReference(child),
        path: childPath,
      });
    }

    if (
      referenceField &&
      Array.isArray(child)
    ) {
      child.forEach(
        (item, index) => {
          if (
            typeof item === "string" &&
            isReferenceLike(item)
          ) {
            references.push({
              value:
                normalizeReference(item),
              path:
                `${childPath}[${index}]`,
            });
          }
        },
      );
    }

    collectReferences(
      child,
      childPath,
      references,
    );
  }
};

const findProtectedPublicFields = (
  value: unknown,
  path: string,
  issues: RealPackageIntegrityIssue[],
): void => {
  if (Array.isArray(value)) {
    value.forEach(
      (entry, index) => {
        findProtectedPublicFields(
          entry,
          `${path}[${index}]`,
          issues,
        );
      },
    );

    return;
  }

  if (!isRecord(value)) {
    return;
  }

  for (
    const [key, child]
    of Object.entries(value)
  ) {
    const childPath =
      `${path}.${key}`;

    if (
      PROTECTED_PUBLIC_FIELD_NAMES.has(
        key,
      )
    ) {
      issues.push({
        code: "PUBLIC_PROTECTED_FIELD",
        path: childPath,
        message:
          `Protected-only field "${key}" appears in public case content.`,
      });
    }

    findProtectedPublicFields(
      child,
      childPath,
      issues,
    );
  }
};

export const validateRealPackagePopulation = (
  casePackage: ProtectedCasePackage,
): RealPackageIntegrityResult => {
  const issues:
    RealPackageIntegrityIssue[] = [];

  for (
    const [
      fileName,
      contents,
    ]
    of Object.entries(casePackage)
  ) {
    if (!isRecord(contents)) {
      issues.push({
        code: "PLACEHOLDER_ARTIFACT",
        path: fileName,
        message:
          "Protected artifact is not a populated JSON object.",
      });

      continue;
    }

    const keys =
      Object.keys(contents);

    if (
      keys.length <= 1 ||
      (
        keys.length === 3 &&
        "warning" in contents &&
        "schemaVersion" in contents &&
        "caseId" in contents
      )
    ) {
      issues.push({
        code: "PLACEHOLDER_ARTIFACT",
        path: fileName,
        message:
          "Protected artifact appears to contain only envelope metadata.",
      });
    }
  }

  const expectations: Array<{
    fileName: ProtectedCaseFileName;
    collectionKey: string;
    expected: number;
  }> = [
    {
      fileName:
        "case_001.facts.json",
      collectionKey: "facts",
      expected: 30,
    },
    {
      fileName:
        "case_001.characters.private.json",
      collectionKey: "characters",
      expected: 6,
    },
    {
      fileName:
        "case_001.knowledge.json",
      collectionKey:
        "characterKnowledge",
      expected: 6,
    },
    {
      fileName:
        "case_001.statements.private.json",
      collectionKey: "statements",
      expected: 20,
    },
    {
      fileName:
        "case_001.evidence.private.json",
      collectionKey: "evidence",
      expected: 10,
    },
    {
      fileName:
        "case_001.forensics.json",
      collectionKey: "forensicTests",
      expected: 14,
    },
    {
      fileName:
        "case_001.discovery.json",
      collectionKey: "discoveryRules",
      expected: 32,
    },
    {
      fileName:
        "case_001.triggers.json",
      collectionKey: "triggers",
      expected: 32,
    },
    {
      fileName:
        "case_001.outcomes.json",
      collectionKey: "outcomes",
      expected: 10,
    },
    {
      fileName:
        "case_001.checkpoints.json",
      collectionKey: "checkpoints",
      expected: 9,
    },
  ];

  for (const expectation of expectations) {
    const actual =
      collectionLength(
        casePackage[
          expectation.fileName
        ],
        expectation.collectionKey,
      );

    if (
      actual !==
      expectation.expected
    ) {
      issues.push({
        code: "COUNT_MISMATCH",
        path:
          `${expectation.fileName}.${expectation.collectionKey}`,
        message:
          `Expected ${expectation.expected} entries but found ${actual}.`,
      });
    }
  }

  const canonical =
    casePackage[
      "case_001.canonical.json"
    ];

  if (
    !isRecord(canonical) ||
    typeof canonical.canonicalNarrative !==
      "string" ||
    canonical.canonicalNarrative.length <
      100
  ) {
    issues.push({
      code: "PLACEHOLDER_ARTIFACT",
      path:
        "case_001.canonical.json.canonicalNarrative",
      message:
        "Canonical case narrative is missing or too short to represent the populated case.",
    });
  }

  const legal =
    casePackage[
      "case_001.legal.json"
    ];

  if (isRecord(legal)) {
    const legalRuleCollections = [
      "consentRules",
      "detentionRules",
      "warrantRules",
      "probableCauseRules",
      "arrestRules",
      "suppressionRules",
      "prosecutorConsultationRules",
    ];

    const legalRuleCount =
      legalRuleCollections.reduce(
        (
          count,
          collectionKey,
        ) => {
          const collection =
            legal[collectionKey];

          return (
            count +
            (
              Array.isArray(
                collection,
              )
                ? collection.length
                : 0
            )
          );
        },
        0,
      );

    if (legalRuleCount !== 16) {
      issues.push({
        code: "COUNT_MISMATCH",
        path:
          "case_001.legal.json",
        message:
          `Expected 16 legal rules but found ${legalRuleCount}.`,
      });
    }

    const searchZoneCount =
      collectionLength(
        legal,
        "searchZones",
      );

    if (searchZoneCount !== 5) {
      issues.push({
        code: "COUNT_MISMATCH",
        path:
          "case_001.legal.json.searchZones",
        message:
          `Expected 5 search zones but found ${searchZoneCount}.`,
      });
    }
  }

  return {
    valid:
      issues.length === 0,
    issues,
  };
};

export const validateRealPackageReferences = (
  casePackage: ProtectedCasePackage,
): RealPackageIntegrityResult => {
  const issues:
    RealPackageIntegrityIssue[] = [];

  const declarations =
    new Map<string, string[]>();

  for (
    const [
      fileName,
      contents,
    ]
    of Object.entries(casePackage)
  ) {
    collectDeclaredIds(
      contents,
      fileName,
      declarations,
    );
  }

  for (
    const locationId
    of EXPECTED_LOCATION_IDS
  ) {
    declarations.set(
      locationId,
      [
        "external-location-registry",
      ],
    );
  }

  for (
    const [
      id,
      paths,
    ]
    of declarations.entries()
  ) {
    if (paths.length > 1) {
      issues.push({
        code:
          "DUPLICATE_DECLARED_ID",
        path:
          paths.join(", "),
        message:
          `ID "${id}" is declared more than once.`,
      });
    }
  }

  const references: Array<{
    value: string;
    path: string;
  }> = [];

  for (
    const [
      fileName,
      contents,
    ]
    of Object.entries(casePackage)
  ) {
    collectReferences(
      contents,
      fileName,
      references,
    );
  }

  for (
    const reference
    of references
  ) {
    if (
      !declarations.has(
        reference.value,
      )
    ) {
      issues.push({
        code:
          "UNRESOLVED_REFERENCE",
        path: reference.path,
        message:
          `Reference "${reference.value}" does not resolve to a declared ID.`,
      });
    }
  }

  return {
    valid:
      issues.length === 0,
    issues,
  };
};

export const validateProtectedArtifactsAreDistinct = (
  casePackage: ProtectedCasePackage,
): RealPackageIntegrityResult => {
  const issues:
    RealPackageIntegrityIssue[] = [];

  const seen =
    new Map<
      string,
      string
    >();

  for (
    const [
      fileName,
      contents,
    ]
    of Object.entries(casePackage)
  ) {
    const serialized =
      JSON.stringify(contents);

    const previous =
      seen.get(serialized);

    if (previous) {
      issues.push({
        code:
          "DUPLICATE_ARTIFACT_CONTENT",
        path:
          `${previous}, ${fileName}`,
        message:
          "Two protected artifacts contain identical JSON content. This may indicate an accidental paste into the wrong file.",
      });

      continue;
    }

    seen.set(
      serialized,
      fileName,
    );
  }

  return {
    valid:
      issues.length === 0,
    issues,
  };
};

export const validatePublicCaseBoundary = (
  publicPackage: PublicCasePackage,
): RealPackageIntegrityResult => {
  const issues:
    RealPackageIntegrityIssue[] = [];

  for (
    const [
      fileName,
      contents,
    ]
    of Object.entries(publicPackage)
  ) {
    findProtectedPublicFields(
      contents,
      fileName,
      issues,
    );

    const serialized =
      JSON.stringify(contents);

    if (
      serialized.includes(
        "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER",
      )
    ) {
      issues.push({
        code:
          "PUBLIC_PROTECTED_FIELD",
        path: fileName,
        message:
          "Protected spoiler warning appears in public case content.",
      });
    }
  }

  return {
    valid:
      issues.length === 0,
    issues,
  };
};

export const validateRealCasePackage = (
  protectedPackage: ProtectedCasePackage,
  publicPackage: PublicCasePackage,
): RealPackageIntegrityResult => {
  const results = [
    validateRealPackagePopulation(
      protectedPackage,
    ),
    validateRealPackageReferences(
      protectedPackage,
    ),
    validateProtectedArtifactsAreDistinct(
      protectedPackage,
    ),
    validatePublicCaseBoundary(
      publicPackage,
    ),
  ];

  const issues =
    results.flatMap(
      (result) =>
        result.issues,
    );

  return {
    valid:
      issues.length === 0,
    issues,
  };
};