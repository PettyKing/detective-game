import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateAiLeakageBoundary,
  validatePlayerLeakageBoundary,
} from "../../../packages/case-validation/src/leakage-boundary.js";

describe("case001 projection leakage boundaries", () => {
  it("allows a safe player projection", () => {
    const safeProjection = {
      caseId: "case_001",

      characters: [
        {
          characterId: "char_001",
          displayName: "Character 001",
          legalStatus: "WITNESS",
        },
      ],

      evidence: [
        {
          evidenceId: "ev_001",
          displayName: "Evidence 001",
        },
      ],
    };

    const result =
      validatePlayerLeakageBoundary(
        safeProjection,
      );

    expect(result.safe).toBe(true);
    expect(result.leaks).toHaveLength(0);
  });

  it("detects protected truth in a player projection", () => {
    const unsafeProjection = {
      statement: {
        statementId: "stmt_001",
        truthClassification: "FALSE",
      },
    };

    const result =
      validatePlayerLeakageBoundary(
        unsafeProjection,
      );

    expect(result.safe).toBe(false);
    expect(result.leaks.length).toBeGreaterThan(0);

    expect(
      result.leaks.some(
        (leak) =>
          leak.fieldName ===
          "truthClassification",
      ),
    ).toBe(true);
  });

  it("allows character-specific private AI context", () => {
    const safeAiProjection = {
      activeCharacter: {
        characterId: "char_001",

        permittedPrivateFactIds: [
          "fact_001",
        ],

        permittedFalseBeliefFactIds: [
          "fact_002",
        ],

        activeCoverStories: [
          {
            id: "cover_001",
            authoredClaims: [
              "claim_001",
            ],
          },
        ],

        motivations: {
          goalIds: ["goal_001"],
          fearIds: [],
          pressureIds: [],
        },
      },
    };

    const result =
      validateAiLeakageBoundary(
        safeAiProjection,
      );

    expect(result.safe).toBe(true);
    expect(result.leaks).toHaveLength(0);
  });

  it("blocks explicit truthfulness metadata from AI context", () => {
    const unsafeAiProjection = {
      activeCharacter: {
        characterId: "char_001",

        truthClassification: "FALSE",
      },
    };

    const result =
      validateAiLeakageBoundary(
        unsafeAiProjection,
      );

    expect(result.safe).toBe(false);

    expect(
      result.leaks.some(
        (leak) =>
          leak.fieldName ===
          "truthClassification",
      ),
    ).toBe(true);
  });

  it("blocks global solution information from AI context", () => {
    const unsafeAiProjection = {
      globalSolution: {
        characterId: "char_001",
      },
    };

    const result =
      validateAiLeakageBoundary(
        unsafeAiProjection,
      );

    expect(result.safe).toBe(false);
  });
});