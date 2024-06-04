import { Photo, User } from '@prisma/client';

export type UserEntityWithPhoto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  sex: string;
  createdAt: Date;
  photo: Photo | null;
};
