import { PrismaClient } from "@prisma/client";

const state = process.env.NODE_ENV === "production" ? "production" : "development";
var prisma: PrismaClient;

declare global {
  var prisma: PrismaClient | undefined;
}

if (state === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
