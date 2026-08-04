import { useCallback, useEffect, useState } from "react";
import { fetchUsers } from "@/features/users/api/userApi";
import type { User, UserFilters } from "../types/user.types";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = useCallback(async (nextFilters: UserFilters) => {
    setIsLoading(true);
    try {
      const result = await fetchUsers(nextFilters);
      setUsers(result);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyFilters(nextFilters: UserFilters) {
    setFilters(nextFilters);
    loadUsers(nextFilters);
  }

  return { users, filters, isLoading, applyFilters };
}
