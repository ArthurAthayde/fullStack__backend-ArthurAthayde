import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { userRepository } from "../repositories";
import { AppError } from "../errors";

export const uniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = req.body.email;

  try {
    if (email) {
      const foundEntity: User | null = await userRepository.findOneBy({
        email,
      });

      if (foundEntity) {
        throw new AppError("Email already exists", 409);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
