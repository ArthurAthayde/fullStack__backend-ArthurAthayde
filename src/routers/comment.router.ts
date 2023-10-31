import { Router } from "express";
import { isCommentOwner } from "../middlewares/isCommentOwner.middleware";
import { isCommentOrAnouncementOwner } from "../middlewares";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { commentControllers } from "../controllers";

export const commentRouter: Router = Router();

commentRouter.post("/:id", verifyToken, commentControllers.create);
commentRouter.get("/:id", commentControllers.read);
commentRouter.patch(
  "/:id",
  verifyToken,
  isCommentOwner,
  commentControllers.update
);
commentRouter.delete(
  "/:id",
  verifyToken,
  isCommentOrAnouncementOwner,
  commentControllers.destroy
);

export default commentRouter;
