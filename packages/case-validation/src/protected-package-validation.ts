import {
  PROTECTED_CASE_FILE_NAMES,
  PROTECTED_CASE_WARNING,
  type ProtectedCaseFileName,
  type ProtectedCasePackage,
} from "./case-package-loader.js";

export interface ProtectedPackageIssue {
  fileName: ProtectedCaseFileName;
  code:
    | "NOT_OBJECT"
    | "MISSING_WARNING"
    | "INVALID_WARNING";
  message: string;
}

export interface ProtectedPackageValidationResult {
  valid: boolean;
  expectedFileCount: number;
  validatedFileCount: number;
  issues: ProtectedPackageIssue[];
}

const isRecord = (
  value: unknown,
): value is Record<string, unknown> => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

export const validateProtectedPackageEnvelope = (
  casePackage: ProtectedCasePackage,
): ProtectedPackageValidationResult => {
  const issues: ProtectedPackageIssue[] = [];

  let validatedFileCount = 0;

  for (
    const fileName
    of PROTECTED_CASE_FILE_NAMES
  ) {
    const contents =
      casePackage[fileName];

    if (!isRecord(contents)) {
      issues.push({
        fileName,
        code: "NOT_OBJECT",
        message:
          "Protected case artifact must contain a JSON object.",
      });

      continue;
    }

    if (!("warning" in contents)) {
      issues.push({
        fileName,
        code: "MISSING_WARNING",
        message:
          "Protected case artifact is missing the required warning.",
      });

      continue;
    }

    if (
      contents.warning !==
      PROTECTED_CASE_WARNING
    ) {
      issues.push({
        fileName,
        code: "INVALID_WARNING",
        message:
          "Protected case artifact contains an invalid warning.",
      });

      continue;
    }

    validatedFileCount += 1;
  }

  return {
    valid: issues.length === 0,

    expectedFileCount:
      PROTECTED_CASE_FILE_NAMES.length,

    validatedFileCount,

    issues,
  };
};

export const assertProtectedPackageEnvelope = (
  casePackage: ProtectedCasePackage,
): void => {
  const result =
    validateProtectedPackageEnvelope(
      casePackage,
    );

  if (result.valid) {
    return;
  }

  const details =
    result.issues
      .map(
        (issue) =>
          `${issue.fileName}: ${issue.code}`,
      )
      .join("\n");

  throw new Error(
    `Protected case package validation failed:\n${details}`,
  );
};