import { Box, Heading, HStack, Stack } from "@chakra-ui/react";
import { useUsers } from "@/features/users/hooks/useUsers";
import { usePagination } from "@/features/users/hooks/usePagination";
import { useSort } from "@/features/users/hooks/useSort";
import { UsersTable } from "@/features/users/components/UserTables";
import { PaginationControls } from "@/features/users/components/PaginationControls";
import { SearchBar } from "@/features/users/components/SearchBar";
import { FilterDropdown } from "@/features/users/components/FilterDropdown";
import type { UserFiltersFormValues } from "@/features/users/schemas/userFilters.schema";
import type { UserFilters } from "@/features/users/types/user.types";

const PAGE_SIZE = 5;

export function UsersListPage() {
  const { users, filters, isLoading, applyFilters } = useUsers();
  const { sortedUsers, sortConfig, toggleSort } = useSort(users);
  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage,
  } = usePagination({ items: sortedUsers, pageSize: PAGE_SIZE });

  function handleSearch(searchValue: string) {
    applyFilters({ ...filters, search: searchValue });
  }

  function handleApplyDropdownFilters(values: UserFiltersFormValues) {
    const nextFilters: UserFilters = {
      ...filters,
      gender: values.gender
        ? (values.gender as UserFilters["gender"])
        : undefined,
      email: values.email || undefined,
      ageMin: values.ageMin ? Number(values.ageMin) : undefined,
      ageMax: values.ageMax ? Number(values.ageMax) : undefined,
    };
    applyFilters(nextFilters);
  }

  return (
    <Box maxW="960px" mx="auto" py={10} px={4}>
      <Heading size="lg" mb={6}>
        Usuários
      </Heading>

      <Stack gap={4} mb={6}>
        <HStack justify="space-between">
          <SearchBar
            defaultValue={filters.search}
            isLoading={isLoading}
            onSearch={handleSearch}
          />
          <FilterDropdown
            defaultValues={{
              gender: filters.gender ?? "",
              email: filters.email ?? "",
              ageMin: filters.ageMin?.toString() ?? "",
              ageMax: filters.ageMax?.toString() ?? "",
            }}
            onApply={handleApplyDropdownFilters}
          />
        </HStack>
      </Stack>

      <UsersTable
        users={paginatedItems}
        sortConfig={sortConfig}
        onToggleSort={toggleSort}
        isLoading={isLoading}
      />

      {!isLoading && users.length > 0 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={previousPage}
          onNext={nextPage}
          onGoToPage={goToPage}
        />
      )}
    </Box>
  );
}
