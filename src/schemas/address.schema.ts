import z from "zod";

const addressSchema = z.object({
  id: z.number().positive(),
  zip_code: z.string().max(9),
  state: z.string().max(50),
  city: z.string().max(50),
  street: z.string().max(50),
  number: z.string().max(20).nullable(),
  complement: z.string().max(100).nullable(),
});

const addressCreateSchema = addressSchema.omit({
  id: true,
});

const addressReadSchema = addressCreateSchema.array();

const adressUpdateSchema = addressSchema.partial();

export {
  addressSchema,
  addressCreateSchema,
  addressReadSchema,
  adressUpdateSchema,
};
