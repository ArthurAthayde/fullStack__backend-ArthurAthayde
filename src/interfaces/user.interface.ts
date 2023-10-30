import { z } from "zod";
import {
  userAddress,
  userAdressCreateSchema,
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
} from "../schemas";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

type UserCreate = z.infer<typeof userCreateSchema>;

type UserRead = z.infer<typeof userReadSchema>;

type UserReturn = z.infer<typeof userReturnSchema>;

type UserUpdate = DeepPartial<User>;

type UserAddress = z.infer<typeof userAddress>;

type UserAddressCreate = z.infer<typeof userAdressCreateSchema>;

type UserRepo = Repository<User>;

export {
  UserCreate,
  UserRead,
  UserReturn,
  UserUpdate,
  UserRepo,
  UserAddress,
  UserAddressCreate,
};
