import { z } from "zod";

const imageSchema = z.object({
  id: z.number().positive(),
  image_url: z.string().max(200),
});

const imageReturnSchema = imageSchema.omit({
  id: true,
});

const imageReadSchema = imageReturnSchema.array();

export { imageSchema, imageReturnSchema, imageReadSchema };
