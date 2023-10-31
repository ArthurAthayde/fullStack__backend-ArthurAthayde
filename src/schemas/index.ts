import {
  userSchema,
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userUpdateSchema,
  userAddress,
  userAddressReturnSchema,
  userAdressCreateSchema,
  GetOneUserSchema,
} from "./user.schemas";
import {
  addressSchema,
  addressCreateSchema,
  addressReadSchema,
  adressUpdateSchema,
} from "./address.schema";

import {
  anouncementSchema,
  anouncementRequest,
  anouncementUpdateSchema,
  realAnouncementSchema,
} from "./anouncement.schemas";

import {
  imageSchema,
  imageReturnSchema,
  imageReadSchema,
} from "./images.schemas";
import {
  commentSchema,
  commentReturnSchema,
  commentReadSchema,
} from "./comment.schemas";
import { authSchema } from "./auth.schemas";

export {
  authSchema,
  userSchema,
  userCreateSchema,
  userReadSchema,
  userUpdateSchema,
  userReturnSchema,
  userAddress,
  userAddressReturnSchema,
  userAdressCreateSchema,
  addressCreateSchema,
  addressReadSchema,
  addressSchema,
  adressUpdateSchema,
  anouncementSchema,
  realAnouncementSchema,
  anouncementUpdateSchema,
  anouncementRequest,
  imageSchema,
  imageReturnSchema,
  imageReadSchema,
  commentSchema,
  commentReadSchema,
  commentReturnSchema,
  GetOneUserSchema,
};
