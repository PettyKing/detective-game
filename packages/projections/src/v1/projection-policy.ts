export const PLAYER_FORBIDDEN_FIELD_NAMES = [
  "truthClassification",
  "intent",
  "canonical",
  "canonicalTruth",
  "canonicalSolution",
  "canonicalTimeline",
  "offenderId",
  "offenderIds",
  "globalSolution",
  "privateBiography",
  "forbiddenFactIds",
  "hiddenEvidenceIds",
  "hiddenDiscoveryRuleIds",
  "actualProperties",
  "actualPropertyTags",
  "actualSignificance",
  "significanceFactIds",
  "supportingFactIds",
  "conflictingFactIds",
  "evaluationWeights",
  "hiddenOutcomeRequirements",
] as const;

export const AI_FORBIDDEN_FIELD_NAMES = [
  "truthClassification",
  "intent",
  "canonicalSolution",
  "canonicalTimeline",
  "offenderId",
  "offenderIds",
  "globalSolution",
  "hiddenOutcomeRequirements",
  "evaluationWeights",
] as const;

export type PlayerForbiddenFieldName =
  (typeof PLAYER_FORBIDDEN_FIELD_NAMES)[number];

export type AiForbiddenFieldName =
  (typeof AI_FORBIDDEN_FIELD_NAMES)[number];

export interface ProjectionLeak {
  path: string;
  fieldName: string;
}

const isRecord = (
  value: unknown,
): value is Record<string, unknown> => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

const scanForForbiddenFields = (
  value: unknown,
  forbiddenFields: readonly string[],
  currentPath = "$",
): ProjectionLeak[] => {
  const leaks: ProjectionLeak[] = [];

  if (Array.isArray(value)) {
    value.forEach((entry, index) => {
      leaks.push(
        ...scanForForbiddenFields(
          entry,
          forbiddenFields,
          `${currentPath}[${index}]`,
        ),
      );
    });

    return leaks;
  }

  if (!isRecord(value)) {
    return leaks;
  }

  for (const [key, childValue] of Object.entries(value)) {
    const nextPath = `${currentPath}.${key}`;

    if (forbiddenFields.includes(key)) {
      leaks.push({
        path: nextPath,
        fieldName: key,
      });
    }

    leaks.push(
      ...scanForForbiddenFields(
        childValue,
        forbiddenFields,
        nextPath,
      ),
    );
  }

  return leaks;
};

export const findPlayerProjectionLeaks = (
  value: unknown,
): ProjectionLeak[] => {
  return scanForForbiddenFields(
    value,
    PLAYER_FORBIDDEN_FIELD_NAMES,
  );
};

export const findAiProjectionLeaks = (
  value: unknown,
): ProjectionLeak[] => {
  return scanForForbiddenFields(
    value,
    AI_FORBIDDEN_FIELD_NAMES,
  );
};

export const assertPlayerProjectionSafe = (
  value: unknown,
): void => {
  const leaks = findPlayerProjectionLeaks(value);

  if (leaks.length === 0) {
    return;
  }

  const paths = leaks
    .map((leak) => `${leak.path} (${leak.fieldName})`)
    .join(", ");

  throw new Error(
    `Player projection contains forbidden fields: ${paths}`,
  );
};

export const assertAiProjectionSafe = (
  value: unknown,
): void => {
  const leaks = findAiProjectionLeaks(value);

  if (leaks.length === 0) {
    return;
  }

  const paths = leaks
    .map((leak) => `${leak.path} (${leak.fieldName})`)
    .join(", ");

  throw new Error(
    `AI projection contains forbidden fields: ${paths}`,
  );
};