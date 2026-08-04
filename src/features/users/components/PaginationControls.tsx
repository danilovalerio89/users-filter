import { Button, HStack, Text } from "@chakra-ui/react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToPage: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onGoToPage,
}: PaginationControlsProps) {
  return (
    <HStack justify="center" gap={2} mt={4}>
      <Button size="sm" onClick={onPrevious} disabled={currentPage === 1}>
        Anterior
      </Button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <Button
            key={page}
            size="sm"
            variant={page === currentPage ? "solid" : "outline"}
            onClick={() => onGoToPage(page)}
          >
            {page}
          </Button>
        ),
      )}

      <Button size="sm" onClick={onNext} disabled={currentPage === totalPages}>
        Próxima
      </Button>

      <Text fontSize="sm" color="gray.500" ml={2}>
        Página {currentPage} de {totalPages}
      </Text>
    </HStack>
  );
}
