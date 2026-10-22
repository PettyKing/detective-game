import {
  findAiProjectionLeaks,
  findPlayerProjectionLeaks,
  type ProjectionLeak,
} from "../../projections/src/v1/projection-policy.js";

export type ProjectionBoundary =
  | "PLAYER"
  | "AI";

export interface LeakageBoundaryResult {
  safe: boolean;
  boundary: ProjectionBoundary;
  leaks: ProjectionLeak[];
}

export const validatePlayerLeakageBoundary = (
  value: unknown,
): LeakageBoundaryResult => {
  const leaks = findPlayerProjectionLeaks(value);

  return {
    safe: leaks.length === 0,
    boundary: "PLAYER",
    leaks,
  };
};

export const validateAiLeakageBoundary = (
  value: unknown,
): LeakageBoundaryResult => {
  const leaks = findAiProjectionLeaks(value);

  return {
    safe: leaks.length === 0,
    boundary: "AI",
    leaks,
  };
};

export const assertPlayerLeakageBoundary = (
  value: unknown,
): void => {
  const result =
    validatePlayerLeakageBoundary(value);

  if (result.safe) {
    return;
  }

  const details = result.leaks
    .map(
      (leak) =>
        `${leak.path}: forbidden field ${leak.fieldName}`,
    )
    .join("\n");

  throw new Error(
    `Player projection leakage detected:\n${details}`,
  );
};

export const assertAiLeakageBoundary = (
  value: unknown,
): void => {
  const result =
    validateAiLeakageBoundary(value);

  if (result.safe) {
    return;
  }

  const details = result.leaks
    .map(
      (leak) =>
        `${leak.path}: forbidden field ${leak.fieldName}`,
    )
    .join("\n");

  throw new Error(
    `AI projection leakage detected:\n${details}`,
  );
};