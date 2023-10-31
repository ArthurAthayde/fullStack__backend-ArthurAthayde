import { compare } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { AuthCreate, AuthToken } from "../interfaces";
import jwt from "jsonwebtoken";

const authServices = async (payload: AuthCreate): Promise<AuthToken> => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new AppError("Email or password wrong", 401);
  }

  const validatePassword = await compare(payload.password, user.password);

  if (!validatePassword) {
    throw new AppError("Email or password wrong", 401);
  }

  const token = jwt.sign(
    {
      name: user.name,
      description: user.description,
      typeAccount: user.account,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: user.id.toString(),
    }
  );

  return {
    token: token,
    name: user.name,
    description: user.description,
    account: user.account,
    id: user.id,
  };
};

export default authServices;
