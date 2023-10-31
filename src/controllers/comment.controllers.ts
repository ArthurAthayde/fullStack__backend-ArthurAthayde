import { commentServices } from "../services";
import { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
  const { id: anouncemenId } = req.params;
  const { userId } = res.locals;
  const { body: comment } = req;

  const newComment = await commentServices.create(
    comment,
    Number(anouncemenId),
    userId
  );
  return res.status(201).json(newComment);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const anouncemenId = parseInt(req.params.id);
  const comments = await commentServices.list(anouncemenId);
  return res.status(200).json(comments);
};

const update = async (req: Request, res: Response) => {
  const { id: commentId } = req.params;
  const { body: comment } = req;

  const updatedComment = await commentServices.update(
    comment,
    parseInt(commentId)
  );
  return res.status(200).json(updatedComment);
};

const destroy = async (req: Request, res: Response) => {
  console.log("req.params:", req.params);
  const { id } = req.params;
  const { userId } = res.locals;

  await commentServices.destroy(userId, parseInt(id));

  return res.status(204).send();
};

export default { create, read, update, destroy };
