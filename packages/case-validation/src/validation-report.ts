export interface PublicValidationCounts {
  characterCount: number;
  locationCount: number;
  factCount: number;
  evidenceCount: number;
  forensicTestCount: number;
  outcomeCount: number;
}

export interface PublicValidationReport {
  caseId: string;
  caseVersion: string;

  schemaValidationPassed: boolean;
  referenceIntegrityPassed: boolean;

  counts: PublicValidationCounts;

  materiallyDistinctRouteCount: number;

  criticalFactsProtected: boolean;

  deterministicLegalRulesPassed: boolean;

  protectedFieldLeakageTestsPassed: boolean;

  intendedOutcomeCategoriesReachable: boolean;

  structuralDefectCount: number;

  structuralDefects: string[];
}

export interface PublicValidationReportInput {
  caseId: string;
  caseVersion: string;

  schemaValidationPassed: boolean;
  referenceIntegrityPassed: boolean;

  counts: PublicValidationCounts;

  materiallyDistinctRouteCount: number;

  criticalFactsProtected: boolean;

  deterministicLegalRulesPassed: boolean;

  protectedFieldLeakageTestsPassed: boolean;

  intendedOutcomeCategoriesReachable: boolean;

  structuralDefects: string[];
}

const forbiddenReportTerms = [
  "offender",
  "killer",
  "murderer",
  "truthClassification",
  "canonicalSolution",
  "hiddenTimeline",
  "secretRelationship",
  "intentionalLie",
  "forensicResult",
  "legalThreshold",
  "outcomeRequirement",
] as const;

const containsForbiddenReportTerm = (
  text: string,
): boolean => {
  const normalized =
    text.toLowerCase();

  return forbiddenReportTerms.some(
    (term) =>
      normalized.includes(
        term.toLowerCase(),
      ),
  );
};

export const createPublicValidationReport = (
  input: PublicValidationReportInput,
): PublicValidationReport => {
  const safeStructuralDefects =
    input.structuralDefects.filter(
      (defect) =>
        !containsForbiddenReportTerm(
          defect,
        ),
    );

  return {
    caseId: input.caseId,
    caseVersion: input.caseVersion,

    schemaValidationPassed:
      input.schemaValidationPassed,

    referenceIntegrityPassed:
      input.referenceIntegrityPassed,

    counts: input.counts,

    materiallyDistinctRouteCount:
      input.materiallyDistinctRouteCount,

    criticalFactsProtected:
      input.criticalFactsProtected,

    deterministicLegalRulesPassed:
      input.deterministicLegalRulesPassed,

    protectedFieldLeakageTestsPassed:
      input.protectedFieldLeakageTestsPassed,

    intendedOutcomeCategoriesReachable:
      input.intendedOutcomeCategoriesReachable,

    structuralDefectCount:
      safeStructuralDefects.length,

    structuralDefects:
      safeStructuralDefects,
  };
};

export const assertPublicValidationReportSafe = (
  report: PublicValidationReport,
): void => {
  const serialized =
    JSON.stringify(report);

  if (
    containsForbiddenReportTerm(
      serialized,
    )
  ) {
    throw new Error(
      "Public validation report contains protected terminology.",
    );
  }
};