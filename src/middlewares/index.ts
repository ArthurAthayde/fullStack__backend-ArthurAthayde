import { handleError } from "./handleError.middleware";
import { idExists } from "./idExists.middleware";
import { isAdmin } from "./isAdmin.middleware";
import { isAdvertiser } from "./isAdvertiser.middleware";
import { isAdvertiserOwner } from "./isAdvertiserOwner.middleware";
import { isCommentOwner } from "./isCommentOwner.middleware";
import { isCommentOrAnouncementOwner } from "./iscommentOrAnouncOwner.middleware";
import { uniqueEmail } from "./uniqueEmail.middleware";
import { validateBody } from "./validateBody.middleware";
import { verifyId } from "./verifyId.middleware";
import { verifyToken } from "./verifyToken.middleware";

export {
  handleError,
  idExists,
  isAdmin,
  isAdvertiser,
  isAdvertiserOwner,
  isCommentOwner,
  isCommentOrAnouncementOwner,
  uniqueEmail,
  validateBody,
  verifyId,
  verifyToken,
};
