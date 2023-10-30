import { z } from "zod";
import { imageReturnSchema } from "./images.schemas";

const anouncementSchema = z.object({
  id: z.number().positive(),
  brand: z.string().max(50),
  model: z.string().max(50),
  year: z.number().positive(),
  fuel: z.string().max(50),
  mileage: z.number().positive(),
  color: z.string().max(50),
  price_fipe: z.number().positive(),
  price: z.number().positive(),
  description: z.string().max(200).nullable(),
  cover_image: z.string().max(200),
  images: z.array(imageReturnSchema),
});

const anouncementRequest = anouncementSchema.omit({
  id: true,
});

const anouncementUpdateSchema = anouncementSchema.partial();

const realAnouncementSchema = anouncementSchema.array();

export {
  anouncementSchema,
  realAnouncementSchema,
  anouncementUpdateSchema,
  anouncementRequest,
};
