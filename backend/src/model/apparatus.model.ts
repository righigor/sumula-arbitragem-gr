import { prisma } from "../lib/prisma";
import { CreateApparatusType } from "../utils/types";

export default class ApparatusModel {
  public createApparatus = async ({
    name,
    competitionId,
  }: CreateApparatusType) => {
    const result = await prisma.apparatus.create({
      data: {
        name: name.toLowerCase(),
        competitionId,
      },
    });

    return { data: result };
  };

  public getAllApparatusByCompetitionId = async (competitionId: string) => {
    const result = await prisma.apparatus.findMany({
      where: {
        competitionId,
      },
      select: {
        name: true,
      }
    });

    return { data: result };
  };

  public getApparatusById = async (apparatusId: string) => {
    const result = await prisma.apparatus.findFirst({
      where: {
        id: apparatusId,
      },
    });

    return { data: result };
  };

  public updateApparatusById = async ({
    id,
    name,
  }: CreateApparatusType) => {
    const result = await prisma.apparatus.update({
      where: {
        id,
      },
      data: {
        name: name.toLowerCase(),
      },
    });

    return { data: result };
  };

  public deleteApparatusById = async (apparatusId: string) => {
    const result = await prisma.apparatus.delete({
      where: {
        id: apparatusId,
      },
    });

    return { data: result };
  };
}
