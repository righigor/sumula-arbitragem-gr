import { prisma } from "../lib/prisma";

export const checkExistsChampionship = async (id: string) => {
  const result = await prisma.championship.findFirst({
    where: {
      id,
    },
  });

  return result ? true : false;
};

export const checkExistsApparatus = async (id: string) => {
  const result = await prisma.apparatus.findFirst({
    where: {
      id,
    },
  });

  return result ? true : false;
}