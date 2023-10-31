import { Router } from "express";
import { isAdvertiserOwner } from "../middlewares/isAdvertiserOwner.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { anouncementControllers } from "../controllers";

export const anouncementRouter: Router = Router();

anouncementRouter.post("", verifyToken, anouncementControllers.create);
anouncementRouter.get("", anouncementControllers.read);
anouncementRouter.get("/:id", anouncementControllers.readById);
anouncementRouter.get(
  "/advertiser/:id",
  anouncementControllers.readByAdvertiser
);
anouncementRouter.patch(
  "/:id",
  verifyToken,
  isAdvertiserOwner,
  anouncementControllers.update
);
anouncementRouter.delete(
  "/:id",
  verifyToken,
  isAdvertiserOwner,
  anouncementControllers.destroy
);

export default anouncementRouter;
