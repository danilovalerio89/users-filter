import { useMemo, useState } from "react";
import type {
  SortableUserField,
  SortConfig,
  User,
} from "@/features/users/types/user.types";
const initialSortConfig: SortConfig = { field: null, direction: "asc" };

export function useSort(users: User[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(initialSortConfig);

  function toggleSort(field: SortableUserField) {
    setSortConfig((prev) => {
      if (prev.field !== field) return { field, direction: "asc" };
      if (prev.direction === "asc") return { field, direction: "desc" };
      return initialSortConfig;
    });
  }

  const sortedUsers = useMemo(() => {
    if (!sortConfig.field) return users;

    const { field, direction } = sortConfig;
    const sorted = [...users].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return valueA - valueB;
      }
      return String(valueA).localeCompare(String(valueB));
    });

    return direction === "asc" ? sorted : sorted.reverse();
  }, [users, sortConfig]);

  return { sortedUsers, sortConfig, toggleSort };
}
