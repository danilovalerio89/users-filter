export type Gender = "male" | "female" | "other";

export interface User {
  id: string;
  name: string;
  gender: Gender;
  age: number;
  email: string;
}

export interface UserFilters {
  search?: string;
  gender?: Gender;
  email?: string;
  ageMin?: number;
  ageMax?: number;
}

export type SortableUserField = "gender" | "age";
export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: SortableUserField | null;
  direction: SortDirection;
}
