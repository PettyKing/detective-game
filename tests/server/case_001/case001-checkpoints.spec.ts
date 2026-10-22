import {
  describe,
  expect,
  it,
} from "vitest";

import {
  syntheticCheckpoints,
} from "./case001-fixtures.js";

describe("case001 developer checkpoints", () => {
  const requiredLabels = [
    "START",
    "INITIAL_INTERVIEWS_COMPLETE",
    "EVIDENCE_DISCOVERED",
    "FORENSICS_READY",
    "WARRANT_READY",
    "WARRANT_APPROVED",
    "PRE_ARREST",
    "PROSECUTOR_REVIEW",
    "RESOLUTION",
  ];

  it("defines all nine required checkpoints", () => {
    expect(
      syntheticCheckpoints,
    ).toHaveLength(9);
  });

  it("uses unique checkpoint IDs", () => {
    const ids =
      syntheticCheckpoints.map(
        (checkpoint) =>
          checkpoint.id,
      );

    expect(
      new Set(ids).size,
    ).toBe(ids.length);
  });

  it("contains every required checkpoint label", () => {
    const labels =
      new Set(
        syntheticCheckpoints.map(
          (checkpoint) =>
            checkpoint.label,
        ),
      );

    for (
      const label
      of requiredLabels
    ) {
      expect(
        labels.has(label),
      ).toBe(true);
    }
  });

  it("uses neutral checkpoint identifiers", () => {
    for (
      const checkpoint
      of syntheticCheckpoints
    ) {
      expect(
        checkpoint.id,
      ).toMatch(
        /^checkpoint_\d{3}$/,
      );
    }
  });
});