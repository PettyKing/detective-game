import type { ZodType } from "zod";

export interface SchemaValidationIssue {
  path: string;
  message: string;
  code: string;
}

export interface SchemaValidationResult<T> {
  valid: boolean;
  data?: T;
  issues: SchemaValidationIssue[];
}

const formatPath = (
  path: PropertyKey[],
): string => {
  if (path.length === 0) {
    return "$";
  }

  return path.reduce<string>((result, part) => {
    if (typeof part === "number") {
      return `${result}[${part}]`;
    }

    return result === "$"
      ? `$.${String(part)}`
      : `${result}.${String(part)}`;
  }, "$");
};

export const validateWithSchema = <T>(
  schema: ZodType<T>,
  input: unknown,
): SchemaValidationResult<T> => {
  const result = schema.safeParse(input);

  if (result.success) {
    return {
      valid: true,
      data: result.data,
      issues: [],
    };
  }

  return {
    valid: false,
    issues: result.error.issues.map((issue) => ({
      path: formatPath(issue.path),
      message: issue.message,
      code: issue.code,
    })),
  };
};

export const assertValidSchema = <T>(
  schema: ZodType<T>,
  input: unknown,
): T => {
  const result = validateWithSchema(schema, input);

  if (result.valid && result.data !== undefined) {
    return result.data;
  }

  const details = result.issues
    .map(
      (issue) =>
        `${issue.path}: ${issue.message} [${issue.code}]`,
    )
    .join("\n");

  throw new Error(
    `Schema validation failed:\n${details}`,
  );
};