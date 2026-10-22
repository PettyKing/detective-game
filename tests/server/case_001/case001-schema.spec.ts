import {
  describe,
  expect,
  it,
} from "vitest";

import {
  canonicalCaseTruthSchema,
  canonicalEvaluationPackageSchema,
} from "../../../server-content/cases/case_001/schemas/index.js";

import {
  validateWithSchema,
} from "../../../packages/case-validation/src/schema-validation.js";

import {
  syntheticCanonicalCase,
  syntheticEvaluationPackage,
} from "./case001-fixtures.js";

describe("case001 schema validation", () => {
  it("accepts the neutral canonical case fixture", () => {
    const result = validateWithSchema(
      canonicalCaseTruthSchema,
      syntheticCanonicalCase,
    );

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("accepts the neutral evaluation fixture", () => {
    const result = validateWithSchema(
      canonicalEvaluationPackageSchema,
      syntheticEvaluationPackage,
    );

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("rejects a protected artifact without the warning", () => {
    const invalidFixture = {
      ...syntheticCanonicalCase,
      warning: "INVALID",
    };

    const result = validateWithSchema(
      canonicalCaseTruthSchema,
      invalidFixture,
    );

    expect(result.valid).toBe(false);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it("rejects an unsupported schema version", () => {
    const invalidFixture = {
      ...syntheticCanonicalCase,
      schemaVersion: 999,
    };

    const result = validateWithSchema(
      canonicalCaseTruthSchema,
      invalidFixture,
    );

    expect(result.valid).toBe(false);
  });
});