import { z } from "zod";
import {
  commentReadSchema,
  commentReturnSchema,
  commentSchema,
} from "../schemas";
import { Repository } from "typeorm";
import { Comment } from "../entities";

type CommentCreate = z.infer<typeof commentSchema>;

type CommentReturn = z.infer<typeof commentReturnSchema>;

type CommentArray = z.infer<typeof commentReadSchema>;

type CommentRepo = Repository<Comment>;

export { CommentCreate, CommentReturn, CommentArray, CommentRepo };
