export type ReferenceEntityType =
  | "CASE"
  | "CHARACTER"
  | "LOCATION"
  | "EVIDENCE"
  | "FACT"
  | "STATEMENT"
  | "FORENSIC_TEST"
  | "DISCOVERY_RULE"
  | "TRIGGER"
  | "WARRANT"
  | "OFFENSE"
  | "OUTCOME"
  | "CHECKPOINT"
  | "RECORD";

export interface ReferenceDefinition {
  sourceEntityType: ReferenceEntityType;
  sourceEntityId: string;
  sourcePath: string;
  targetEntityType: ReferenceEntityType;
  targetEntityId: string;
}

export interface ReferenceRegistry {
  CASE: Set<string>;
  CHARACTER: Set<string>;
  LOCATION: Set<string>;
  EVIDENCE: Set<string>;
  FACT: Set<string>;
  STATEMENT: Set<string>;
  FORENSIC_TEST: Set<string>;
  DISCOVERY_RULE: Set<string>;
  TRIGGER: Set<string>;
  WARRANT: Set<string>;
  OFFENSE: Set<string>;
  OUTCOME: Set<string>;
  CHECKPOINT: Set<string>;
  RECORD: Set<string>;
}

export interface ReferenceIntegrityIssue {
  sourceEntityType: ReferenceEntityType;
  sourceEntityId: string;
  sourcePath: string;
  targetEntityType: ReferenceEntityType;
  targetEntityId: string;
  message: string;
}

export interface ReferenceIntegrityResult {
  valid: boolean;
  checkedReferenceCount: number;
  issues: ReferenceIntegrityIssue[];
}

export const createEmptyReferenceRegistry =
  (): ReferenceRegistry => ({
    CASE: new Set<string>(),
    CHARACTER: new Set<string>(),
    LOCATION: new Set<string>(),
    EVIDENCE: new Set<string>(),
    FACT: new Set<string>(),
    STATEMENT: new Set<string>(),
    FORENSIC_TEST: new Set<string>(),
    DISCOVERY_RULE: new Set<string>(),
    TRIGGER: new Set<string>(),
    WARRANT: new Set<string>(),
    OFFENSE: new Set<string>(),
    OUTCOME: new Set<string>(),
    CHECKPOINT: new Set<string>(),
    RECORD: new Set<string>(),
  });

export const registerReferenceEntity = (
  registry: ReferenceRegistry,
  entityType: ReferenceEntityType,
  entityId: string,
): void => {
  registry[entityType].add(entityId);
};

export const validateReferenceIntegrity = (
  registry: ReferenceRegistry,
  references: ReferenceDefinition[],
): ReferenceIntegrityResult => {
  const issues: ReferenceIntegrityIssue[] = [];

  for (const reference of references) {
    const targetRegistry =
      registry[reference.targetEntityType];

    if (!targetRegistry.has(reference.targetEntityId)) {
      issues.push({
        sourceEntityType: reference.sourceEntityType,
        sourceEntityId: reference.sourceEntityId,
        sourcePath: reference.sourcePath,
        targetEntityType: reference.targetEntityType,
        targetEntityId: reference.targetEntityId,
        message:
          `Unresolved ${reference.targetEntityType} reference`,
      });
    }
  }

  return {
    valid: issues.length === 0,
    checkedReferenceCount: references.length,
    issues,
  };
};

export const assertReferenceIntegrity = (
  registry: ReferenceRegistry,
  references: ReferenceDefinition[],
): void => {
  const result = validateReferenceIntegrity(
    registry,
    references,
  );

  if (result.valid) {
    return;
  }

  const details = result.issues
    .map(
      (issue) =>
        `${issue.sourceEntityType}:${issue.sourceEntityId}` +
        ` at ${issue.sourcePath} -> ` +
        `${issue.targetEntityType}:${issue.targetEntityId}`,
    )
    .join("\n");

  throw new Error(
    `Reference integrity validation failed:\n${details}`,
  );
};