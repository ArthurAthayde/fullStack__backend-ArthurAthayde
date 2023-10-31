import { NextFunction, Request, Response } from "express";
import { Comment } from "../entities";
import { AppDataSource } from "../data-source";

export const isCommentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const commentId = parseInt(req.params.id);
    const userId = parseInt(res.locals.userId);

    const commentsRepo = AppDataSource.getRepository(Comment);

    const comment = await commentsRepo.findOne({
      where: {
        id: commentId,
        user: { id: userId },
      },
    });

    if (comment) {
      return next();
    }

    return res.status(403).json({
      message: "Insufficient permission.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
