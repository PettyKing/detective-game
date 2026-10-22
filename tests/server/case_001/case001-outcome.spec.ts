import {
  describe,
  expect,
  it,
} from "vitest";

import {
  canonicalEvaluationPackageSchema,
} from "../../../server-content/cases/case_001/schemas/index.js";

import {
  syntheticEvaluationPackage,
} from "./case001-fixtures.js";

describe("case001 outcome definitions", () => {
  it("validates the neutral outcome package", () => {
    const result =
      canonicalEvaluationPackageSchema.safeParse(
        syntheticEvaluationPackage,
      );

    expect(result.success).toBe(true);
  });

  it("contains all intended outcome categories", () => {
    const categories =
      new Set(
        syntheticEvaluationPackage.outcomeRules.map(
          (rule) => rule.category,
        ),
      );

    const expectedCategories = [
      "STRONG_CASE",
      "INSUFFICIENT_EVIDENCE",
      "PROCEDURAL_DAMAGE",
      "WRONG_PERSON",
      "MISSED_PARTICIPANT",
      "PROSECUTOR_DECLINES",
      "REDUCED_CHARGES",
      "ACQUITTAL",
      "CONVICTION",
      "UNSOLVED",
    ];

    for (
      const category
      of expectedCategories
    ) {
      expect(
        categories.has(category),
      ).toBe(true);
    }
  });

  it("uses unique neutral outcome identifiers", () => {
    const ids =
      syntheticEvaluationPackage
        .outcomeRules
        .map(
          (rule) => rule.id,
        );

    const uniqueIds =
      new Set(ids);

    expect(uniqueIds.size).toBe(
      ids.length,
    );
  });

  it("gives every outcome a result code", () => {
    for (
      const rule
      of syntheticEvaluationPackage
        .outcomeRules
    ) {
      expect(
        rule.resultCode.length,
      ).toBeGreaterThan(0);
    }
  });
});