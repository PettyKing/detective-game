export interface ZodValidationIssue {
  path: string;
  message: string;
}

export interface ZodValidationResult {
  valid: boolean;
  issues: ZodValidationIssue[];
}

interface ZodLikeFailure {
  success: false;
  error: {
    issues?: Array<{
      path?: Array<string | number>;
      message?: string;
    }>;
    message?: string;
  };
}

interface ZodLikeSuccess {
  success: true;
  data: unknown;
}

interface ZodLikeSchema {
  safeParse(
    value: unknown,
  ): ZodLikeSuccess | ZodLikeFailure;
}

type SchemaModule =
  Record<string, unknown>;

const isRecord = (
  value: unknown,
): value is Record<string, unknown> => {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
};

const isZodLikeSchema = (
  value: unknown,
): value is ZodLikeSchema => {
  return (
    typeof value === "object" &&
    value !== null &&
    "safeParse" in value &&
    typeof (
      value as {
        safeParse?: unknown;
      }
    ).safeParse === "function"
  );
};

export const selectSchemaFromModule = (
  module: SchemaModule,
  preferredExportNames: string[],
  label: string,
): ZodLikeSchema => {
  for (
    const exportName
    of preferredExportNames
  ) {
    const candidate =
      module[exportName];

    if (
      isZodLikeSchema(candidate)
    ) {
      return candidate;
    }
  }

  const discovered =
    Object.entries(module)
      .filter(
        (
          [, value],
        ) =>
          isZodLikeSchema(value),
      );

  if (discovered.length === 1) {
    return discovered[0][1] as ZodLikeSchema;
  }

  const available =
    discovered
      .map(
        ([name]) => name,
      )
      .join(", ");

  throw new Error(
    `Unable to uniquely select the ${label} schema. ` +
      `Available Zod-like exports: ${available || "none"}`,
  );
};

const formatFailure = (
  failure: ZodLikeFailure,
  basePath: string,
): ZodValidationIssue[] => {
  const zodIssues =
    failure.error.issues;

  if (
    !zodIssues ||
    zodIssues.length === 0
  ) {
    return [
      {
        path: basePath,
        message:
          failure.error.message ??
          "Schema validation failed.",
      },
    ];
  }

  return zodIssues.map(
    (issue) => {
      const suffix =
        issue.path &&
        issue.path.length > 0
          ? `.${issue.path.join(".")}`
          : "";

      return {
        path:
          `${basePath}${suffix}`,
        message:
          issue.message ??
          "Schema validation failed.",
      };
    },
  );
};

export const validatePackageObject = (
  schema: ZodLikeSchema,
  value: unknown,
  basePath: string,
): ZodValidationResult => {
  const result =
    schema.safeParse(value);

  if (result.success) {
    return {
      valid: true,
      issues: [],
    };
  }

  const issues =
    formatFailure(
      result,
      basePath,
    );

  return {
    valid: false,
    issues,
  };
};

export const validatePackageCollection = (
  schema: ZodLikeSchema,
  value: unknown,
  collectionKey: string,
  basePath: string,
): ZodValidationResult => {
  if (!isRecord(value)) {
    return {
      valid: false,
      issues: [
        {
          path: basePath,
          message:
            "Protected artifact must be a JSON object.",
        },
      ],
    };
  }

  const collection =
    value[collectionKey];

  if (!Array.isArray(collection)) {
    return {
      valid: false,
      issues: [
        {
          path:
            `${basePath}.${collectionKey}`,
          message:
            `Expected "${collectionKey}" to be an array.`,
        },
      ],
    };
  }

  const issues:
    ZodValidationIssue[] = [];

  collection.forEach(
    (entry, index) => {
      const result =
        schema.safeParse(entry);

      if (!result.success) {
        issues.push(
          ...formatFailure(
            result,
            `${basePath}.${collectionKey}[${index}]`,
          ),
        );
      }
    },
  );

  return {
    valid:
      issues.length === 0,
    issues,
  };
};