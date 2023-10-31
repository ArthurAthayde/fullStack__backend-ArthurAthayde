import { Request, Response, NextFunction } from "express";

export const isAdvertiser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const account = res.locals.ACCOUNT_TYPE;

  if (account == "Advertiser") {
    return next();
  }

  return res.status(401).json({ message: "User is not Advertiser." });
};
