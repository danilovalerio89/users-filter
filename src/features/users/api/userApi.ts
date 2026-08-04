import { mockUsers } from "@/features/users/api/mockUsers";
import type { User, UserFilters } from "@/features/users/types/user.types";

const SIMULATED_DELAY_MS = 2000;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function applyFilters(user: User[], filters: UserFilters): User[] {
  return user.filter((user) => {
    if (filters.search) {
      const term = filters.search.trim().toLocaleLowerCase();
      const matchesSearch =
        user.name.toLocaleLowerCase().includes(term) ||
        user.email.toLocaleLowerCase().includes(term);

      if (!matchesSearch) return false;
    }
    if (filters.gender && user.gender !== filters.gender) {
      return false;
    }
    if (filters.email) {
      const term = filters.email.trim().toLocaleLowerCase();
      if (!user.email.toLocaleLowerCase().includes(term)) {
        return false;
      }
    }
    if (filters.ageMin !== undefined && user.age < filters.ageMin) return false;
    if (filters.ageMax !== undefined && user.age < filters.ageMax) return false;

    return true;
  });
}

export async function fetchUsers(filters: UserFilters = {}): Promise<User[]> {
  await delay(SIMULATED_DELAY_MS);
  return applyFilters(mockUsers, filters);
}
