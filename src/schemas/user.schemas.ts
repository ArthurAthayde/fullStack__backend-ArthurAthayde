import { z } from "zod";
import { ACCOUNT_TYPE } from "../entities/user.entity";

const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().max(50).email(),
  cpf: z.string().max(50),
  tel: z.string().max(100),
  birth: z.string(),
  password: z.string().max(100),
  description: z.string().max(200),
  account: z.nativeEnum(ACCOUNT_TYPE),
});

const userAddress = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().max(50).email(),
  cpf: z.string().max(50),
  tel: z.string().max(100),
  birth: z.string(),
  password: z.string().max(100),
  description: z.string().max(200),
  account: z.nativeEnum(ACCOUNT_TYPE),
  zip_code: z.string().max(9),
  state: z.string().max(50),
  city: z.string().max(50),
  street: z.string().max(50),
  number: z.number().max(20).positive(),
  complement: z.string().max(100).nullable(),
});

const GetOneUserSchema = userSchema.pick({
  id: true,
  is_seller: true,
  name: true,
  description: true,
});

const userCreateSchema = userSchema.omit({
  id: true,
});

const userAdressCreateSchema = userAddress.omit({
  order_date: true,
  id: true,
});

const userReturnSchema = userSchema.omit({ password: true });
const userAddressReturnSchema = userAddress.omit({ password: true });

const userReadSchema = userReturnSchema.array();
const userUpdateSchema = userCreateSchema.partial();

export {
  userSchema,
  userCreateSchema,
  userUpdateSchema,
  userReadSchema,
  userReturnSchema,
  userAddress,
  userAddressReturnSchema,
  userAdressCreateSchema,
  GetOneUserSchema,
};
