import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Field,
  HStack,
  Input,
  NativeSelect,
  Popover,
  Stack,
} from "@chakra-ui/react";
import {
  userFiltersSchema,
  type UserFiltersFormValues,
} from "@/features/users/schemas/userFilters.schema";

interface FilterDropdownProps {
  defaultValues: UserFiltersFormValues;
  onApply: (values: UserFiltersFormValues) => void;
}

export function FilterDropdown({
  defaultValues,
  onApply,
}: FilterDropdownProps) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserFiltersFormValues>({
    resolver: zodResolver(userFiltersSchema),
    defaultValues,
  });

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="outline">Filtros</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Body>
            <Stack gap={3} as="form" onSubmit={handleSubmit(onApply)}>
              <Field.Root>
                <Field.Label>Gender</Field.Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <NativeSelect.Root>
                      <NativeSelect.Field {...field}>
                        <option value="">Todos</option>
                        <option value="male">Masculino</option>
                        <option value="female">Feminino</option>
                        <option value="other">Outro</option>
                      </NativeSelect.Field>
                    </NativeSelect.Root>
                  )}
                />
              </Field.Root>

              <Field.Root invalid={!!errors.email}>
                <Field.Label>Email</Field.Label>
                <Input placeholder="Filtrar por email" {...register("email")} />
              </Field.Root>

              <Field.Root invalid={!!errors.ageMin || !!errors.ageMax}>
                <Field.Label>Age</Field.Label>
                <HStack>
                  <Input placeholder="Min" {...register("ageMin")} />
                  <Input placeholder="Max" {...register("ageMax")} />
                </HStack>
                {errors.ageMax && (
                  <Field.ErrorText>{errors.ageMax.message}</Field.ErrorText>
                )}
              </Field.Root>

              <Button type="submit" size="sm" colorPalette="blue">
                Aplicar
              </Button>
            </Stack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
