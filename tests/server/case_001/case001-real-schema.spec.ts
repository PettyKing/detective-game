import {
  fileURLToPath,
} from "node:url";

import {
  describe,
  expect,
  it,
} from "vitest";

import * as canonicalCaseModule
  from "../../../server-content/cases/case_001/schemas/canonical-case.schema.js";

import * as canonicalFactModule
  from "../../../server-content/cases/case_001/schemas/canonical-fact.schema.js";

import * as canonicalCharacterModule
  from "../../../server-content/cases/case_001/schemas/canonical-character.schema.js";

import * as canonicalStatementModule
  from "../../../server-content/cases/case_001/schemas/canonical-statement.schema.js";

import * as canonicalEvidenceModule
  from "../../../server-content/cases/case_001/schemas/canonical-evidence.schema.js";

import * as canonicalEvaluationModule
  from "../../../server-content/cases/case_001/schemas/canonical-evaluation.schema.js";

import {
  loadProtectedCasePackage,
} from "../../../packages/case-validation/src/case-package-loader.js";

import {
  selectSchemaFromModule,
  validatePackageCollection,
  validatePackageObject,
  type ZodValidationIssue,
} from "../../../packages/case-validation/src/real-zod-validation.js";

const protectedCaseDirectory =
  fileURLToPath(
    new URL(
      "../../../server-content/cases/case_001/",
      import.meta.url,
    ),
  );

const protectedPackage =
  loadProtectedCasePackage(
    protectedCaseDirectory,
  );

const summarize = (
  issues: ZodValidationIssue[],
): string => {
  return issues
    .map(
      (issue) =>
        `${issue.path} | ${issue.message}`,
    )
    .join("\n");
};

describe(
  "case001 real canonical schemas",
  () => {
    it(
      "validates the canonical case record",
      () => {
        const schema =
          selectSchemaFromModule(
            canonicalCaseModule,
            [
              "canonicalCaseSchema",
              "CanonicalCaseSchema",
            ],
            "canonical case",
          );

        const result =
          validatePackageObject(
            schema,
            protectedPackage[
              "case_001.canonical.json"
            ],
            "case_001.canonical.json",
          );

        expect(
          result.issues,
          summarize(
            result.issues,
          ),
        ).toEqual([]);

        expect(
          result.valid,
        ).toBe(true);
      },
    );

    it(
      "validates every canonical fact",
      () => {
        const schema =
          selectSchemaFromModule(
            canonicalFactModule,
            [
              "canonicalFactSchema",
              "CanonicalFactSchema",
            ],
            "canonical fact",
          );

        const result =
          validatePackageCollection(
            schema,
            protectedPackage[
              "case_001.facts.json"
            ],
            "facts",
            "case_001.facts.json",
          );

        expect(
          result.issues,
          summarize(
            result.issues,
          ),
        ).toEqual([]);

        expect(
          result.valid,
        ).toBe(true);
      },
    );

    it(
      "validates every private character",
      () => {
        const schema =
          selectSchemaFromModule(
            canonicalCharacterModule,
            [
              "canonicalCharacterSchema",
              "CanonicalCharacterSchema",
            ],
            "canonical character",
          );

        const result =
          validatePackageCollection(
            schema,
            protectedPackage[
              "case_001.characters.private.json"
            ],
            "characters",
            "case_001.characters.private.json",
          );

        expect(
          result.issues,
          summarize(
            result.issues,
          ),
        ).toEqual([]);

        expect(
          result.valid,
        ).toBe(true);
      },
    );

    it(
      "validates every private statement",
      () => {
        const schema =
          selectSchemaFromModule(
            canonicalStatementModule,
            [
              "canonicalStatementSchema",
              "CanonicalStatementSchema",
            ],
            "canonical statement",
          );

        const result =
          validatePackageCollection(
            schema,
            protectedPackage[
              "case_001.statements.private.json"
            ],
            "statements",
            "case_001.statements.private.json",
          );

        expect(
          result.issues,
          summarize(
            result.issues,
          ),
        ).toEqual([]);

        expect(
          result.valid,
        ).toBe(true);
      },
    );

    it(
      "validates every private evidence record",
      () => {
        const schema =
          selectSchemaFromModule(
            canonicalEvidenceModule,
            [
              "canonicalEvidenceSchema",
              "CanonicalEvidenceSchema",
            ],
            "canonical evidence",
          );

        const result =
          validatePackageCollection(
            schema,
            protectedPackage[
              "case_001.evidence.private.json"
            ],
            "evidence",
            "case_001.evidence.private.json",
          );

        expect(
          result.issues,
          summarize(
            result.issues,
          ),
        ).toEqual([]);

        expect(
          result.valid,
        ).toBe(true);
      },
    );

    it(
      "validates the canonical evaluation package",
      () => {
        const schema =
          selectSchemaFromModule(
            canonicalEvaluationModule,
            [
              "canonicalEvaluationSchema",
              "CanonicalEvaluationSchema",
            ],
            "canonical evaluation",
          );

        const result =
          validatePackageObject(
            schema,
            protectedPackage[
              "case_001.evaluation.json"
            ],
            "case_001.evaluation.json",
          );

        expect(
          result.issues,
          summarize(
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