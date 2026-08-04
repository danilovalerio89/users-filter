import { z } from "zod";

const optionalAgeField = z
  .string()
  .optional()
  .refine((value) => !value || /^\d+$/.test(value), {
    message: "Informe um número válido.",
  });

export const userFiltersSchema = z
  .object({
    gender: z.enum(["male", "female", "other", ""]).optional(),
    email: z.string().optional(),
    ageMin: optionalAgeField,
    ageMax: optionalAgeField,
  })
  .refine(
    (data) => {
      if (!data.ageMin || !data.ageMax) return true;
      return Number(data.ageMin) <= Number(data.ageMax);
    },
    {
      message: "A idade mínima não pode ser maior que a idade máxima.",
      path: ["ageMax"],
    },
  );

export type UserFiltersFormValues = z.infer<typeof userFiltersSchema>;
