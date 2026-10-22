import {
  fileURLToPath,
} from "node:url";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  PROTECTED_CASE_FILE_NAMES,
  PUBLIC_CASE_FILE_NAMES,
  loadProtectedCasePackage,
  loadPublicCasePackage,
} from "../../../packages/case-validation/src/case-package-loader.js";

import {
  validateProtectedPackageEnvelope,
} from "../../../packages/case-validation/src/protected-package-validation.js";

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

describe(
  "case001 package loading",
  () => {
    it(
      "loads all required protected artifacts",
      () => {
        const casePackage =
          loadProtectedCasePackage(
            protectedCaseDirectory,
          );

        expect(
          Object.keys(casePackage),
        ).toHaveLength(
          PROTECTED_CASE_FILE_NAMES.length,
        );
      },
    );

    it(
      "requires every protected artifact to carry the spoiler warning",
      () => {
        const casePackage =
          loadProtectedCasePackage(
            protectedCaseDirectory,
          );

        const result =
          validateProtectedPackageEnvelope(
            casePackage,
          );

        expect(result.valid).toBe(true);

        expect(
          result.validatedFileCount,
        ).toBe(
          PROTECTED_CASE_FILE_NAMES.length,
        );

        expect(
          result.issues,
        ).toHaveLength(0);
      },
    );

    it(
      "loads all required public artifacts",
      () => {
        const casePackage =
          loadPublicCasePackage(
            publicCaseDirectory,
          );

        expect(
          Object.keys(casePackage),
        ).toHaveLength(
          PUBLIC_CASE_FILE_NAMES.length,
        );
      },
    );

    it(
      "uses only neutral protected filenames",
      () => {
        const prohibitedTerms = [
          "killer",
          "offender",
          "culprit",
          "murderer",
          "guilty",
          "solution_",
          "lie_",
        ];

        for (
          const fileName
          of PROTECTED_CASE_FILE_NAMES
        ) {
          const normalized =
            fileName.toLowerCase();

          for (
            const term
            of prohibitedTerms
          ) {
            expect(
              normalized.includes(term),
            ).toBe(false);
          }
        }
      },
    );
  },
);