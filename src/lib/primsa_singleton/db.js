const { PrismaClient } = require("@/generated/prisma");

const globalPrisma = globalThis;

const prisma = globalPrisma.prisma || new PrismaClient();

if (process.env.ENV_MODE !== 'production') globalPrisma.prisma = prisma;

export const db = prisma;