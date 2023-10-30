import { z } from "zod";
import { imageReadSchema, imageSchema } from "../schemas";
import { Repository } from "typeorm";
import { Image } from "../entities";

type ImageCreate = z.infer<typeof imageSchema>;

type ImageRepo = Repository<Image>;

type ImageArray = z.infer<typeof imageReadSchema>;

export { ImageCreate, ImageRepo, ImageArray };
