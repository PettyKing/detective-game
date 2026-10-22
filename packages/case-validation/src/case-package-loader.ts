import {
  existsSync,
  readFileSync,
} from "node:fs";

import {
  join,
} from "node:path";

export const PROTECTED_CASE_WARNING =
  "SPOILER — COMPLETE CASE SOLUTION — DO NOT DISPLAY TO PLAYTESTER";

export const PROTECTED_CASE_FILE_NAMES = [
  "case_001.canonical.json",
  "case_001.facts.json",
  "case_001.characters.private.json",
  "case_001.knowledge.json",
  "case_001.statements.private.json",
  "case_001.evidence.private.json",
  "case_001.forensics.json",
  "case_001.discovery.json",
  "case_001.legal.json",
  "case_001.triggers.json",
  "case_001.evaluation.json",
  "case_001.outcomes.json",
  "case_001.checkpoints.json",
] as const;

export const PUBLIC_CASE_FILE_NAMES = [
  "case_001.public.json",
  "case_001.ui.json",
  "case_001.assets.json",
  "case_001.rules.public.json",
] as const;

export type ProtectedCaseFileName =
  (typeof PROTECTED_CASE_FILE_NAMES)[number];

export type PublicCaseFileName =
  (typeof PUBLIC_CASE_FILE_NAMES)[number];

export type ProtectedCasePackage = {
  [K in ProtectedCaseFileName]: unknown;
};

export type PublicCasePackage = {
  [K in PublicCaseFileName]: unknown;
};

const parseJsonFile = (
  filePath: string,
): unknown => {
  if (!existsSync(filePath)) {
    throw new Error(
      `Required case file does not exist: ${filePath}`,
    );
  }

  const raw = readFileSync(
    filePath,
    "utf8",
  );

  const normalized = raw.replace(
    /^\uFEFF/,
    "",
  );

  try {
    return JSON.parse(normalized) as unknown;
  } catch {
    throw new Error(
      `Invalid JSON in case file: ${filePath}`,
    );
  }
};

export const loadProtectedCasePackage = (
  caseDirectory: string,
): ProtectedCasePackage => {
  const entries =
    PROTECTED_CASE_FILE_NAMES.map(
      (fileName) => [
        fileName,
        parseJsonFile(
          join(
            caseDirectory,
            fileName,
          ),
        ),
      ],
    );

  return Object.fromEntries(
    entries,
  ) as ProtectedCasePackage;
};

export const loadPublicCasePackage = (
  caseDirectory: string,
): PublicCasePackage => {
  const entries =
    PUBLIC_CASE_FILE_NAMES.map(
      (fileName) => [
        fileName,
        parseJsonFile(
          join(
            caseDirectory,
            fileName,
          ),
        ),
      ],
    );

  return Object.fromEntries(
    entries,
  ) as PublicCasePackage;
};