import { AppError } from "../errors";
import {
  UserAddress,
  UserAddressCreate,
  UserCreate,
  UserRead,
  UserRepo,
  UserReturn,
  UserUpdate,
} from "../interfaces";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { addressRepository } from "../repositories";
import {
  userAddressReturnSchema,
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
} from "../schemas";
import { AppDataSource } from "../data-source";
import { hash } from "bcryptjs";

const create = async (payload: UserAddressCreate): Promise<UserReturn> => {
  const hashedPassword = await hash(payload.password, 10);

  const user: any = userRepository.create({
    description: payload.description,
    birth: payload.birth,
    cpf: payload.cpf,
    email: payload.email,
    name: payload.name,
    tel: payload.tel,
    password: payload.password,
    account: payload.account,
  });

  const users = await userRepository.find();

  const password = payload.password;
  const emailAlreadyExists = users.find((user) => user.email === payload.email);

  if (emailAlreadyExists) {
    throw new AppError("User already exists.");
  }

  const cpfAlreadyExists = users.find((user) => user.cpf === payload.cpf);

  if (cpfAlreadyExists) {
    throw new AppError("CPF already exists.");
  }

  if (!password) {
    throw new AppError("Password is missing.");
  }

  const newUser = await userRepository.save(user);

  const address: any = addressRepository.create({
    user: newUser.id,
    zip_code: payload.zip_code,
    state: payload.state,
    city: payload.city,
    street: payload.street,
    number: payload.number.toString(),
    complement: payload.complement,
  });

  await addressRepository.save(address);

  const userReturn = { ...user, ...address };

  return userAddressReturnSchema.parse(userReturn);
};

const destroy = async (userId: string): Promise<void> => {
  const userRepository: UserRepo = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: parseInt(userId),
    },
  });

  if (!findUser) {
    throw new AppError("User not found!", 404);
  }

  await userRepository.remove(findUser);

  return;
};

const update = async (
  updateData: UserUpdate,
  userId: string
): Promise<UserReturn> => {
  const userRepository: UserRepo = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      id: parseInt(userId),
    },
  });

  if (!user) {
    throw new AppError("Invalid id", 404);
  }

  const newUserUpdated = userRepository.create({ ...user, ...updateData });

  await userRepository.save(newUserUpdated);

  return userReturnSchema.parse(newUserUpdated);
};

const listId = async (userId: number) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export default { create, destroy, update, listId };
