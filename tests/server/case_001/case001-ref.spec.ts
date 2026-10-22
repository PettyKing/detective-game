import {
  describe,
  expect,
  it,
} from "vitest";

import {
  createEmptyReferenceRegistry,
  registerReferenceEntity,
  validateReferenceIntegrity,
} from "../../../packages/case-validation/src/reference-integrity.js";

describe("case001 reference integrity", () => {
  it("passes when every reference resolves", () => {
    const registry =
      createEmptyReferenceRegistry();

    registerReferenceEntity(
      registry,
      "CHARACTER",
      "char_001",
    );

    registerReferenceEntity(
      registry,
      "FACT",
      "fact_001",
    );

    registerReferenceEntity(
      registry,
      "EVIDENCE",
      "ev_001",
    );

    const result =
      validateReferenceIntegrity(
        registry,
        [
          {
            sourceEntityType: "FACT",
            sourceEntityId: "fact_001",
            sourcePath:
              "$.relatedCharacterIds[0]",
            targetEntityType: "CHARACTER",
            targetEntityId: "char_001",
          },
          {
            sourceEntityType: "FACT",
            sourceEntityId: "fact_001",
            sourcePath:
              "$.relatedEvidenceIds[0]",
            targetEntityType: "EVIDENCE",
            targetEntityId: "ev_001",
          },
        ],
      );

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
    expect(result.checkedReferenceCount).toBe(2);
  });

  it("detects unresolved references", () => {
    const registry =
      createEmptyReferenceRegistry();

    registerReferenceEntity(
      registry,
      "FACT",
      "fact_001",
    );

    const result =
      validateReferenceIntegrity(
        registry,
        [
          {
            sourceEntityType: "FACT",
            sourceEntityId: "fact_001",
            sourcePath:
              "$.relatedCharacterIds[0]",
            targetEntityType: "CHARACTER",
            targetEntityId: "char_999",
          },
        ],
      );

    expect(result.valid).toBe(false);
    expect(result.issues).toHaveLength(1);

    expect(
      result.issues[0]?.targetEntityId,
    ).toBe("char_999");
  });
});