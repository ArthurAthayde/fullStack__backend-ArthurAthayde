import { AppDataSource } from "../data-source";
import { Anouncement, User, Image } from "../entities";
import { AppError } from "../errors";
import {
  AnouncementRepo,
  AnouncementRequest,
  AnouncementResponse,
  AnouncementUpdate,
  UserRepo,
} from "../interfaces";
import { ImageRepo } from "../interfaces/image.interface";
import { anouncementSchema } from "../schemas";

const getAnouncementRepository = (): AnouncementRepo =>
  AppDataSource.getRepository(Anouncement);
const getUserRepository = (): UserRepo => AppDataSource.getRepository(User);
const getImageRepository = (): ImageRepo => AppDataSource.getRepository(Image);

const createAnouncement = async (
  userId: string,
  newData: AnouncementRequest
): Promise<AnouncementResponse> => {
  const anouncementRepository = getAnouncementRepository();
  const userRepository = getUserRepository();
  const imageGalleryRepository = getImageRepository();

  const user = await userRepository.findOne({
    where: {
      id: parseInt(userId),
    },
  });

  if (!user) {
    throw new AppError("This user doesn't exist.");
  }

  if (user.account !== "Advertiser") {
    throw new AppError("User is not an Advertiser.");
  }

  const anouncement = anouncementRepository.create({ ...newData, user });
  await anouncementRepository.save(anouncement);

  await Promise.all(
    newData.images.map(async ({ image_url }) => {
      const newImage = imageGalleryRepository.create({
        image_url,
        anouncement,
      });
      await imageGalleryRepository.save(newImage);
    })
  );

  return anouncementSchema.parse(anouncement);
};

const listAnouncements = async (): Promise<Anouncement[]> => {
  const anouncementRepository = getAnouncementRepository();
  const anouncements = await anouncementRepository.find({
    relations: ["user"],
  });
  return anouncements;
};

const getAnouncementById = async (userId: number): Promise<Anouncement> => {
  const anouncementRepository = getAnouncementRepository();
  const anouncement = await anouncementRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      user: true,
      comments: true,
      images: true,
    },
  });

  if (!anouncement) {
    throw new AppError("Announcement not found", 404);
  }

  return anouncement;
};

const listAnouncementsByAdvertiser = async (
  userId: number
): Promise<Anouncement[]> => {
  const userRepository = getUserRepository();
  const anouncementRepository = getAnouncementRepository();
  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      anouncements: true,
    },
  });

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const anouncements = await anouncementRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
    relations: {
      user: true,
    },
  });

  return anouncements;
};

const deleteAnouncement = async (
  bodyId: string
): Promise<{ message: string }> => {
  const anouncementRepository = getAnouncementRepository();

  const findAnouncement = await anouncementRepository.findOne({
    where: {
      id: parseInt(bodyId),
    },
  });

  if (!findAnouncement) {
    throw new AppError("This advertisement doesn't exist", 404);
  }

  await anouncementRepository.remove(findAnouncement);
  return { message: "Announcement deleted!" };
};

const updateAnouncement = async (
  data: AnouncementUpdate,
  body_id: string
): Promise<Anouncement | null> => {
  const anouncementRepository = getAnouncementRepository();
  const findAnouncement = await anouncementRepository.findOne({
    where: {
      id: parseInt(body_id),
    },
    relations: {
      user: true,
      comments: {
        user: true,
      },
      images: true,
    },
  });

  if (!findAnouncement) {
    throw new AppError("This announcement doesn't exist.");
  }

  const updatedAnouncement = await anouncementRepository.update(body_id, {
    brand: data.brand || findAnouncement.brand,
    model: data.model || findAnouncement.model,
    year: data.year || findAnouncement.year,
    fuel: data.fuel || findAnouncement.fuel,
    mileage: data.mileage || findAnouncement.mileage,
    color: data.color || findAnouncement.color,
    price_fipe: data.price_fipe || findAnouncement.price_fipe,
    price: data.price || findAnouncement.price,
    description: data.description || findAnouncement.description,
    cover_image: data.cover_image || findAnouncement.cover_image,
  });

  const returnedAnouncement = await anouncementRepository.findOne({
    where: {
      id: parseInt(body_id),
    },
    relations: {
      user: true,
      comments: {
        user: true,
      },
      images: true,
    },
  });

  return returnedAnouncement || null;
};

export default {
  create: createAnouncement,
  list: listAnouncements,
  destroy: deleteAnouncement,
  update: updateAnouncement,
  listId: getAnouncementById,
  listByAdvertiser: listAnouncementsByAdvertiser,
};
