import { z } from "zod";
import { ProductStatus } from "./product.constant";

const a = Object.values(ProductStatus);

export const createProductSchema = z.object({
  body: z
    .object({
      name: z.string(),
      description: z.string(),
      amount: z.number(),
      image: z.string(),
      status: z.enum([ProductStatus.ACTIVE, ProductStatus.INACTIVE]).optional(),
    })
    .strict(),
});

export const findProductByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z
    .object({
      name: z.string().optional(),
      description: z.string().optional(),
      amount: z.number().optional(),
      image: z.string().optional(),
      status: z.enum([ProductStatus.ACTIVE, ProductStatus.INACTIVE]).optional(),
    })
    .strict(),
});

export const findAllProductSchema = z.object({
  query: z.object({
    page: z
      .string()
      .transform((val) => (val ? Number(val) : val))
      .refine((val) => !isNaN(val as number), {
        message: "Must be a valid number",
      })
      .optional(),
    pageSize: z
      .string()
      .transform((val) => (val ? Number(val) : val))
      .refine((val) => !isNaN(val as number), {
        message: "Must be a valid number",
      })
      .optional(),
    search: z.string().optional(),
    status: z.enum([ProductStatus.ACTIVE, ProductStatus.INACTIVE]).optional(),
    amountGreaterThan: z
      .string()
      .transform((val) => (val ? Number(val) : val))
      .refine((val) => !isNaN(val as number), {
        message: "Must be a valid number",
      })
      .optional(),
    amountLessThan: z
      .string()
      .transform((val) => (val ? Number(val) : val))
      .refine((val) => !isNaN(val as number), {
        message: "Must be a valid number",
      })
      .optional(),
  }),
});
