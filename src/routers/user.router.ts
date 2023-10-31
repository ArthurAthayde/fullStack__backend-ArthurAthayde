import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyId } from "../middlewares/verifyId.middleware";
import { userControllers } from "../controllers";

export const userRouter: Router = Router();

userRouter.post("", userControllers.create);
userRouter.patch("/:id", verifyToken, verifyId, userControllers.update);
userRouter.delete("/:id", verifyToken, verifyId, userControllers.destroy);
userRouter.get("/:id", userControllers.readById);

export default userRouter;
