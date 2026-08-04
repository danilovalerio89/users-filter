import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";

interface SearchBarProps {
  defaultValue?: string;
  isLoading: boolean;
  onSearch: (value: string) => void;
}

export function SearchBar({
  defaultValue = "",
  isLoading,
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <HStack>
      <Input
        placeholder="Buscar por nome ou email"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        onClick={() => onSearch(value)}
        loading={isLoading}
        colorPalette="blue"
      >
        Buscar
      </Button>
    </HStack>
  );
}
