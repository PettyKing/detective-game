export type RecoveryProtection =
  | "REDUNDANT"
  | "RECOVERABLE"
  | "PERSISTENT";

export interface RouteDefinition {
  routeId: string;
  criticalFactIds: string[];
  discoveryRuleIds: string[];
  materiallyDistinct: boolean;
}

export interface CriticalFactRecoveryRule {
  factId: string;
  discoveryRuleIds: string[];
  protection: RecoveryProtection[];
}

export interface RouteRecoverabilityIssue {
  factId: string;
  code:
    | "NO_DISCOVERY_ROUTE"
    | "NO_RECOVERY_PROTECTION"
    | "INSUFFICIENT_REDUNDANCY"
    | "ROUTE_NOT_MATERIALLY_DISTINCT";
  message: string;
}

export interface RouteRecoverabilityResult {
  valid: boolean;
  criticalFactCount: number;
  materiallyDistinctRouteCount: number;
  issues: RouteRecoverabilityIssue[];
}

const unique = (
  values: string[],
): string[] => {
  return [...new Set(values)];
};

export const validateRouteRecoverability = (
  routes: RouteDefinition[],
  recoveryRules: CriticalFactRecoveryRule[],
): RouteRecoverabilityResult => {
  const issues: RouteRecoverabilityIssue[] = [];

  const criticalFactIds = unique(
    routes.flatMap(
      (route) => route.criticalFactIds,
    ),
  );

  const materiallyDistinctRouteCount =
    routes.filter(
      (route) => route.materiallyDistinct,
    ).length;

  for (const factId of criticalFactIds) {
    const recoveryRule =
      recoveryRules.find(
        (rule) => rule.factId === factId,
      );

    if (!recoveryRule) {
      issues.push({
        factId,
        code: "NO_DISCOVERY_ROUTE",
        message:
          "Critical fact has no recovery definition.",
      });

      continue;
    }

    if (
      recoveryRule.discoveryRuleIds.length === 0
    ) {
      issues.push({
        factId,
        code: "NO_DISCOVERY_ROUTE",
        message:
          "Critical fact has no discovery rules.",
      });
    }

    if (recoveryRule.protection.length === 0) {
      issues.push({
        factId,
        code: "NO_RECOVERY_PROTECTION",
        message:
          "Critical fact has no recovery protection.",
      });
    }

    if (
      recoveryRule.protection.includes(
        "REDUNDANT",
      ) &&
      unique(
        recoveryRule.discoveryRuleIds,
      ).length < 2
    ) {
      issues.push({
        factId,
        code: "INSUFFICIENT_REDUNDANCY",
        message:
          "Fact marked REDUNDANT requires at least two distinct discovery rules.",
      });
    }

    const routesContainingFact =
      routes.filter((route) =>
        route.criticalFactIds.includes(factId),
      );

    const distinctRoutesContainingFact =
      routesContainingFact.filter(
        (route) => route.materiallyDistinct,
      );

    if (
      recoveryRule.protection.includes(
        "REDUNDANT",
      ) &&
      distinctRoutesContainingFact.length < 2
    ) {
      issues.push({
        factId,
        code: "ROUTE_NOT_MATERIALLY_DISTINCT",
        message:
          "Redundant critical fact should appear across at least two materially distinct routes.",
      });
    }
  }

  return {
    valid: issues.length === 0,
    criticalFactCount:
      criticalFactIds.length,
    materiallyDistinctRouteCount,
    issues,
  };
};

export const assertRouteRecoverability = (
  routes: RouteDefinition[],
  recoveryRules: CriticalFactRecoveryRule[],
): void => {
  const result =
    validateRouteRecoverability(
      routes,
      recoveryRules,
    );

  if (result.valid) {
    return;
  }

  const details = result.issues
    .map(
      (issue) =>
        `${issue.factId}: ${issue.code} - ${issue.message}`,
    )
    .join("\n");

  throw new Error(
    `Route recoverability validation failed:\n${details}`,
  );
};