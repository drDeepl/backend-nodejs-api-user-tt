import { Photo, User } from '@prisma/client';

export interface UserExtendedPhoto extends User {
  photo: Photo[];
}
