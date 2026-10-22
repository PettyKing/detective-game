import {
  describe,
  expect,
  it,
} from "vitest";

import {
  validateRouteRecoverability,
} from "../../../packages/case-validation/src/route-recoverability.js";

import {
  syntheticRecoveryRules,
  syntheticRoutes,
} from "./case001-fixtures.js";

describe("case001 route recoverability", () => {
  it("accepts redundant materially distinct routes", () => {
    const result =
      validateRouteRecoverability(
        syntheticRoutes,
        syntheticRecoveryRules,
      );

    expect(result.valid).toBe(true);

    expect(
      result.materiallyDistinctRouteCount,
    ).toBe(2);

    expect(result.issues).toHaveLength(0);
  });

  it("rejects a redundant fact with only one discovery rule", () => {
    const result =
      validateRouteRecoverability(
        [
          {
            routeId: "route_001",
            criticalFactIds: [
              "fact_001",
            ],
            discoveryRuleIds: [
              "discovery_001",
            ],
            materiallyDistinct: true,
          },
        ],
        [
          {
            factId: "fact_001",

            discoveryRuleIds: [
              "discovery_001",
            ],

            protection: [
              "REDUNDANT",
            ],
          },
        ],
      );

    expect(result.valid).toBe(false);

    expect(
      result.issues.some(
        (issue) =>
          issue.code ===
          "INSUFFICIENT_REDUNDANCY",
      ),
    ).toBe(true);
  });

  it("rejects a critical fact without recovery protection", () => {
    const result =
      validateRouteRecoverability(
        syntheticRoutes,
        [
          {
            factId: "fact_001",
            discoveryRuleIds: [
              "discovery_001",
            ],
            protection: [],
          },
        ],
      );

    expect(result.valid).toBe(false);

    expect(
      result.issues.some(
        (issue) =>
          issue.code ===
          "NO_RECOVERY_PROTECTION",
      ),
    ).toBe(true);
  });
});