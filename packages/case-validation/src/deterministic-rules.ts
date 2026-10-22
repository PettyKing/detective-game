export interface DeterministicRuleCheck<TInput, TOutput> {
  name: string;
  input: TInput;
  evaluator: (
    input: TInput,
  ) => TOutput;
}

export interface DeterministicRuleResult {
  deterministic: boolean;
  ruleName: string;
  firstResult: unknown;
  secondResult: unknown;
}

const normalizeValue = (
  value: unknown,
): unknown => {
  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (
    typeof value === "object" &&
    value !== null
  ) {
    const record =
      value as Record<string, unknown>;

    const sortedKeys =
      Object.keys(record).sort();

    const normalized: Record<
      string,
      unknown
    > = {};

    for (const key of sortedKeys) {
      normalized[key] =
        normalizeValue(record[key]);
    }

    return normalized;
  }

  return value;
};

const stableSerialize = (
  value: unknown,
): string => {
  return JSON.stringify(
    normalizeValue(value),
  );
};

export const testRuleDeterminism = <
  TInput,
  TOutput,
>(
  check: DeterministicRuleCheck<
    TInput,
    TOutput
  >,
): DeterministicRuleResult => {
  const firstResult =
    check.evaluator(check.input);

  const secondResult =
    check.evaluator(check.input);

  return {
    deterministic:
      stableSerialize(firstResult) ===
      stableSerialize(secondResult),
    ruleName: check.name,
    firstResult,
    secondResult,
  };
};

export const assertRuleDeterministic = <
  TInput,
  TOutput,
>(
  check: DeterministicRuleCheck<
    TInput,
    TOutput
  >,
): void => {
  const result =
    testRuleDeterminism(check);

  if (result.deterministic) {
    return;
  }

  throw new Error(
    `Rule "${result.ruleName}" produced different results for identical input.`,
  );
};

export const testRuleSetDeterminism = (
  checks: DeterministicRuleCheck<
    unknown,
    unknown
  >[],
): DeterministicRuleResult[] => {
  return checks.map((check) =>
    testRuleDeterminism(check),
  );
};