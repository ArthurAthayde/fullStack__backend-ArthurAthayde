import { AppDataSource } from "../data-source";
import { Anouncement } from "../entities";

export default AppDataSource.getRepository(Anouncement);
