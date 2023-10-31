import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Anouncement, User, Comment } from "../entities";
import { AppError } from "../errors";

const create = async (
  commentData: Comment,
  anouncementId: number,
  userId: number
): Promise<Comment> => {
  const usersRepo = AppDataSource.getRepository(User);
  const anouncementRepo = AppDataSource.getRepository(Anouncement);
  const commentsRepo = AppDataSource.getRepository(Comment);

  const user = await usersRepo.findOne({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const anouncement = await anouncementRepo.findOne({
    where: { id: anouncementId },
  });

  if (!anouncement) {
    throw new AppError("Anouncement not found.", 404);
  }

  const newComment = new Comment();
  newComment.user = user;
  newComment.anouncement = anouncement;
  newComment.description = commentData.description;

  const savedComment = await commentsRepo.save(newComment);

  return savedComment;
};

const list = async (anouncementId: number) => {
  const anouncementRepository = AppDataSource.getRepository(Anouncement);

  const anouncement = await anouncementRepository.findOne({
    where: {
      id: anouncementId,
    },
    relations: {
      comments: {
        user: true,
      },
    },
  });

  if (!anouncement) {
    throw new AppError("Anouncement not found.", 404);
  }

  return anouncement.comments;
};

const update = async ({ text }: any, commentId: number) => {
  const commentsRepo = AppDataSource.getRepository(Comment);
  const commentReturn = await commentsRepo.findOneBy({ id: commentId });

  if (!commentReturn) throw new AppError("Comment not found.", 404);

  commentReturn.description = text;
  const commentFinished = await commentsRepo.save(commentReturn);
  return commentFinished;
};

const destroy = async (userId: number, commentId: number): Promise<void> => {
  const commentsRepo: Repository<Comment> =
    AppDataSource.getRepository(Comment);

  const comment = await commentsRepo.findOneBy({
    id: commentId,
  });

  if (!comment) {
    throw new AppError("Comment not found.", 404);
  }

  await commentsRepo.remove(comment);
};

export default { create, list, update, destroy };
