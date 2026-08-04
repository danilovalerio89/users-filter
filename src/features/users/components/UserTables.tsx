import type {
  SortableUserField,
  SortConfig,
  User,
} from "@/features/users/types/user.types";
import { Center, HStack, Spinner, Table, Text } from "@chakra-ui/react";

interface UsersTableProps {
  users: User[];
  sortConfig: SortConfig;
  onToggleSort: (field: SortableUserField) => void;
  isLoading: boolean;
}

const genderLabels: Record<User["gender"], string> = {
  male: "Masculino",
  female: "Feminino",
  other: "Outro",
};

function SortIndicator({
  active,
  direction,
}: {
  active: boolean;
  direction: "asc" | "desc";
}) {
  if (!active) return null;
  return <Text as="span">{direction === "asc" ? "↑" : "↓"}</Text>;
}

export function UsersTable({
  users,
  sortConfig,
  onToggleSort,
  isLoading,
}: UsersTableProps) {
  if (isLoading) {
    return (
      <Center py={10}>
        <Spinner size="lg" />
      </Center>
    );
  }

  if (users.length === 0) {
    return (
      <Center py={10}>
        <Text color="gray.500">Nenhum usuário encontrado.</Text>
      </Center>
    );
  }

  return (
    <Table.Root variant="line" size="md">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader
            cursor="pointer"
            onClick={() => onToggleSort("gender")}
          >
            <HStack gap={1}>
              <Text>Gender</Text>
              <SortIndicator
                active={sortConfig.field === "gender"}
                direction={sortConfig.direction}
              />
            </HStack>
          </Table.ColumnHeader>
          <Table.ColumnHeader
            cursor="pointer"
            onClick={() => onToggleSort("age")}
          >
            <HStack gap={1}>
              <Text>Age</Text>
              <SortIndicator
                active={sortConfig.field === "age"}
                direction={sortConfig.direction}
              />
            </HStack>
          </Table.ColumnHeader>
          <Table.ColumnHeader>Email</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{genderLabels[user.gender]}</Table.Cell>
            <Table.Cell>{user.age}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
