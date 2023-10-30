import { z } from "zod";
import { Repository } from "typeorm";
import { addressCreateSchema, addressReadSchema } from "../schemas";
import { Address } from "../entities";

type AddressCreate = z.infer<typeof addressCreateSchema>;

type AddressRead = z.infer<typeof addressReadSchema>;

type AddressRepo = Repository<Address>;

export { AddressCreate, AddressRead, AddressRepo };
