import { Request, Response } from "express";
import { anouncementsServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  console.log(res.locals);
  const userId = res.locals.userId;
  const newAnouncement = await anouncementsServices.create(userId, req.body);
  return res.status(201).send(newAnouncement);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const anouncements = await anouncementsServices.read();
  return res.status(200).json(anouncements);
};

const readById = async (req: Request, res: Response): Promise<Response> => {
  const userId = parseInt(req.params.id);
  const anouncement = await anouncementsServices.readById(userId);
  return res.status(200).json(anouncement);
};

const readByAdvertiser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId = parseInt(req.params.id);
  const anouncements = await anouncementsServices.readByAdvertiser(userId);
  return res.status(200).json(anouncements);
};

const update = async (req: Request, res: Response) => {
  const body_id: string = req.params.id;
  const updatedAnouncement = await anouncementsServices.update(
    req.body,
    body_id
  );
  return res.status(200).send(updatedAnouncement);
};

const destroy = async (req: Request, res: Response) => {
  const body_id = req.params.id;
  const deletedAnouncement = await anouncementsServices.destroy(body_id);
  return res.status(204).send(deletedAnouncement);
};

export default { create, read, destroy, update, readById, readByAdvertiser };
