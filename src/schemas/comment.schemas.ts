import { z } from "zod";
import { userSchema } from "./user.schemas";

const commentSchema = z.object({
  id: z.number().positive(),
  comment: z.string().max(200),
  created_at: z.string(),
});

const commentReturnSchema = commentSchema.extend({
  user: userSchema,
});

const commentReadSchema = commentReturnSchema.array();

export { commentSchema, commentReturnSchema, commentReadSchema };
