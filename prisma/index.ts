import { PrismaClient } from '@prisma/client';
import config from '../src/Config/env.config';

interface PrismaNodeJsGlobal extends Global {
  prisma: PrismaClient;
}

declare const global: PrismaNodeJsGlobal;

const prisma = global.prisma || new PrismaClient();

if (config.DEV_STATUS === 'develop') global.prisma = prisma;

export default prisma;
