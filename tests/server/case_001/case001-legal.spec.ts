import {
  describe,
  expect,
  it,
} from "vitest";

import {
  testRuleDeterminism,
} from "../../../packages/case-validation/src/deterministic-rules.js";

describe("case001 deterministic legal rules", () => {
  it("produces identical probable-cause results for identical input", () => {
    const result =
      testRuleDeterminism({
        name: "legal_rule_001",

        input: {
          legallyUsableFactIds: [
            "fact_001",
            "fact_002",
          ],

          requiredFactIds: [
            "fact_001",
            "fact_002",
          ],
        },

        evaluator: (input) => {
          const supported =
            input.requiredFactIds.every(
              (factId) =>
                input.legallyUsableFactIds.includes(
                  factId,
                ),
            );

          return {
            decision: supported
              ? "SUPPORTED"
              : "NOT_SUPPORTED",

            supportingFactIds:
              supported
                ? input.requiredFactIds
                : [],
          };
        },
      });

    expect(result.deterministic).toBe(true);

    expect(result.firstResult).toEqual(
      result.secondResult,
    );
  });

  it("produces identical warrant results for identical input", () => {
    const result =
      testRuleDeterminism({
        name: "legal_rule_002",

        input: {
          requestedZoneIds: [
            "zone_001",
          ],

          supported: true,
        },

        evaluator: (input) => ({
          decision:
            input.supported
              ? "APPROVED"
              : "DENIED",

          authorizedZoneIds:
            input.supported
              ? [...input.requestedZoneIds]
              : [],
        }),
      });

    expect(result.deterministic).toBe(true);
  });

  it("does not depend on randomness or current time", () => {
    const evaluator = (
      input: {
        supported: boolean;
      },
    ) => ({
      validity:
        input.supported
          ? "VALID"
          : "INVALID_INSUFFICIENT_PROBABLE_CAUSE",
    });

    const first =
      testRuleDeterminism({
        name: "legal_rule_003",
        input: {
          supported: true,
        },
        evaluator,
      });

    expect(first.deterministic).toBe(true);
  });
});