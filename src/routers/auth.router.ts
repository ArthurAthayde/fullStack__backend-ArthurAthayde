import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import { authSchema } from "../schemas";
import authControllers from "../controllers/auth.controllers";

export const authRouter: Router = Router();

authRouter.post("", validateBody(authSchema), (req, res) =>
  authControllers.login(req, res)
);

export default authRouter;
