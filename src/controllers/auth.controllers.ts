import { authServices } from "../services";
import { Request, Response } from "express";

const login = async (req: Request, res: Response): Promise<Response> => {
  const data = await authServices(req.body);

  return res.status(200).json(data);
};

export default { login };
