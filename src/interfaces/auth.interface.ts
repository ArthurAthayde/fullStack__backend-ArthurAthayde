import { z } from "zod";
import { authSchema } from "../schemas/auth.schemas";

type AuthCreate = z.infer<typeof authSchema>;

type AuthToken = {
  token: string;
  name: string;
  description: string;
  account: string;
  id: number;
};

export { AuthCreate, AuthToken };
