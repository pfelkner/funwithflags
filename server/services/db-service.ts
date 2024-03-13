import { PrismaClient, Score, User } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
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
export const getScores = async (): Promise<Score[]> => {
  return await prisma.score.findMany();
};

export const getPlayerScore = async (userId: number) => {
  const score = await prisma.score.findFirst({
    where: { userId: userId },
  });
  if (!score) {
    return await prisma.score.create({
      data: {
        userId: userId,
        highestStreak: 0,
      },
    });
  }
  return score;
};

export const updatePlayerScore = async (
  userId: number,
  newScore: number
): Promise<Score> => {
  const updatedScore = await prisma.score.update({
    where: { userId: userId },
    data: { highestStreak: newScore },
  });
  return updatedScore;
};
