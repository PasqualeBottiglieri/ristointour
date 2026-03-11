export type PlanType = "basic" | "premium" | "sponsor";

export interface PlanFields {
  planType: PlanType;
  hasDetailPage: boolean;
  showOnHomepage: boolean;
  displayPriority: number;
}

/** Helper: get all entries for a plan type */
export function filterByPlan<T extends PlanFields>(items: T[], plan: PlanType): T[] {
  return items.filter((item) => item.planType === plan);
}

/** Helper: get entries visible on homepage, sorted by priority */
export function homepageEntries<T extends PlanFields>(items: T[]): T[] {
  return items
    .filter((item) => item.showOnHomepage)
    .sort((a, b) => a.displayPriority - b.displayPriority);
}

/** Helper: get only entries that have detail pages (premium + sponsor) */
export function detailPageEntries<T extends PlanFields>(items: T[]): T[] {
  return items.filter((item) => item.hasDetailPage);
}
