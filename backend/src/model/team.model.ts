import { prisma } from "../lib/prisma";
import { CreateTeamType } from "../utils/types";

export default class TeamModel {
  public createTeam = async (
    { name, logo }: CreateTeamType,
    championshipId: string
  ) => {
    const result = await prisma.team.create({
      data: {
        name: name.toLowerCase(),
        logo,
        championshipId,
      },
    });

    return { data: result };
  };

  public getTeamById = async (teamId: string) => {
    const result = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
    });

    return { data: result };
  };

  public getAllTeamsByChampionshipId = async (championshipId: string) => {
    const result = await prisma.team.findMany({
      where: {
        championshipId,
      },
    });

    return { data: result };
  };

  public updateTeamById = async (
    { name, logo }: CreateTeamType,
    teamId: string
  ) => {
    const result = await prisma.team.update({
      where: {
        id: teamId,
      },
      data: {
        name: name.toLowerCase(),
        logo,
      },
    });

    return { data: result };
  };

  public deleteTeamById = async (teamId: string) => {
    const result = await prisma.team.delete({
      where: {
        id: teamId,
      },
    });

    return { data: result };
  };
}
