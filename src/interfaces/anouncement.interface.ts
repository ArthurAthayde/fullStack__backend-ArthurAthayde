import { z } from "zod";
import {
  anouncementRequest,
  anouncementSchema,
  anouncementUpdateSchema,
  realAnouncementSchema,
} from "../schemas";
import { Repository } from "typeorm";
import { Anouncement } from "../entities";

type AnouncementRepo = Repository<Anouncement>;

type AnouncementCreate = z.infer<typeof realAnouncementSchema>;

type AnouncementRead = z.infer<typeof realAnouncementSchema>;

type AnouncementRequest = z.infer<typeof anouncementRequest>;

type AnouncementResponse = z.infer<typeof anouncementSchema>;

type AnouncementReturn = z.infer<typeof realAnouncementSchema>;

type AnouncementUpdate = z.infer<typeof anouncementUpdateSchema>;

export {
  AnouncementRepo,
  AnouncementCreate,
  AnouncementRead,
  AnouncementRequest,
  AnouncementResponse,
  AnouncementReturn,
  AnouncementUpdate,
};
