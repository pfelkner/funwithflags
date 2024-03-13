import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const getUserByName = async (name: string): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      name,
    },
  });
};

export const createUser = async (
  name: string,
  password: string
): Promise<User> => {
  return await prisma.user.create({
    data: {
      name,
      password,
    },
  });
};
// Add more functions for other operations as needed
