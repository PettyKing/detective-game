import {
  fileURLToPath,
} from "node:url";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  loadProtectedCasePackage,
  loadPublicCasePackage,
} from "../../../packages/case-validation/src/case-package-loader.js";

import {
  validateProtectedArtifactsAreDistinct,
  validatePublicCaseBoundary,
  validateRealCasePackage,
  validateRealPackagePopulation,
  validateRealPackageReferences,
} from "../../../packages/case-validation/src/real-package-integrity.js";

const protectedCaseDirectory =
  fileURLToPath(
    new URL(
      "../../../server-content/cases/case_001/",
      import.meta.url,
    ),
  );

const publicCaseDirectory =
  fileURLToPath(
    new URL(
      "../../../public-content/cases/case_001/",
      import.meta.url,
    ),
  );

const loadCase = () => {
  return {
    protectedPackage:
      loadProtectedCasePackage(
        protectedCaseDirectory,
      ),

    publicPackage:
      loadPublicCasePackage(
        publicCaseDirectory,
      ),
  };
};

const issueSummary = (
  issues: Array<{
    code: string;
    path: string;
    message: string;
  }>,
): string => {
  return issues
    .map(
      (issue) =>
        `${issue.code} | ${issue.path} | ${issue.message}`,
    )
    .join("\n");
};

describe(
  "case001 real protected package",
  () => {
    it(
      "contains populated real case artifacts rather than placeholders",
      () => {
        const {
          protectedPackage,
        } = loadCase();

        const result =
          validateRealPackagePopulation(
            protectedPackage,
          );

        expect(
          result.issues,
          issueSummary(
            result.issues,
          ),
        ).toEqual([]);

        expect(
          result.valid,
        ).toBe(true);
      },
    );

    it(
      "does not contain accidentally duplicated protected artifacts",
      () => {
        const {
          protectedPackage,
        } = loadCase();

        const result =
          validateProtectedArtifactsAreDistinct(
            protectedPackage,
          );

        expect(
          result.issues,
          issueSummary(
            result.issues,
          ),
        ).toEqual([]);

        expect(
          result.valid,
        ).toBe(true);
      },
    );

    it(
      "resolves protected cross-file references",
      () => {
        const {
          protectedPackage,
        } = loadCase();

        const result =
          validateRealPackageReferences(
            protectedPackage,
          );

        expect(
          result.issues,
          issueSummary(
            result.issues,
          ),
        ).toEqual([]);

        expect(
          result.valid,
        ).toBe(true);
      },
    );

    it(
      "keeps protected-only fields out of public case artifacts",
      () => {
        const {
          publicPackage,
        } = loadCase();

        const result =
          validatePublicCaseBoundary(
            publicPackage,
          );

        expect(
          result.issues,
          issueSummary(
            result.issues,
          ),
        ).toEqual([]);

        expect(
          result.valid,
        ).toBe(true);
      },
    );

    it(
      "passes the combined real-package integrity check",
      () => {
        const {
          protectedPackage,
          publicPackage,
        } = loadCase();

        const result =
          validateRealCasePackage(
            protectedPackage,
            publicPackage,
          );

        expect(
          result.issues,
          issueSummary(
            result.issues,
          ),
        ).toEqual([]);

        expect(
          result.valid,
        ).toBe(true);
      },
    );
  },
);