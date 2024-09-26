import { ZodError } from "zod";
import TeamModel from "../model/team.model";
import { CreateTeamType, StatusHttpType } from "../utils/types";
import { teamSchema } from "../utils/zod/teamZod";
import { checkExistsChampionship, checkExistsTeam } from "../utils/validations";

export default class TeamService {
  private teamModel = new TeamModel();

  public createTeam = async (obj: CreateTeamType, championshipId: string) => {
    try {
      const parsedData = teamSchema.parse(obj);
      const checkChamp = await checkExistsChampionship(championshipId);
      if (!checkChamp) {
        return {
          status: "BAD_REQUEST" as StatusHttpType,
          data: { message: "Championship not found" },
        };
      }

      const { data } = await this.teamModel.createTeam(parsedData, championshipId);
      if (!data) {
        return {
          status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
          data: { message: "Error to create team" },
        };
      }

      return { status: "CREATED" as StatusHttpType, data };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          status: "BAD_REQUEST" as StatusHttpType,
          data: { message: error.errors[0].message },
        };
      }
      return {
        status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
        data: error as Error,
      };
    }
  };

  public getTeamById = async (teamId: string) => {
    const { data } = await this.teamModel.getTeamById(teamId);
    if (!data) {
      return {
        status: "NOT_FOUND" as StatusHttpType,
        data: { message: "Team not found" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };

  public getAllTeamsByChampionshipId = async (championshipId: string) => {
    const checkChamp = await checkExistsChampionship(championshipId);
    if (!checkChamp) {
      return {
        status: "NOT_FOUND" as StatusHttpType,
        data: { message: "Championship not found" },
      };
    }

    const { data } = await this.teamModel.getAllTeamsByChampionshipId(championshipId);
    if (!data) {
      return {
        status: "NOT_FOUND" as StatusHttpType,
        data: { message: "Teams not found" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };

  public updateTeamById = async (obj: CreateTeamType, teamId: string) => {
    try {
      const parsedData = teamSchema.parse(obj);
      const checkTeam = await checkExistsTeam(teamId);
      if (!checkTeam) {
        return {
          status: "NOT_FOUND" as StatusHttpType,
          data: { message: "Team not found" },
        };
      }

      const { data } = await this.teamModel.updateTeamById(parsedData, teamId);
      if (!data) {
        return {
          status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
          data: { message: "Error to update team" },
        };
      }

      return { status: "OK" as StatusHttpType, data };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          status: "BAD_REQUEST" as StatusHttpType,
          data: { message: error.errors[0].message },
        };
      }
      return {
        status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
        data: error as Error,
      };
    }
  };

  public deleteTeamById = async (teamId: string) => {
    const checkTeam = await checkExistsTeam(teamId);
    if (!checkTeam) {
      return {
        status: "NOT_FOUND" as StatusHttpType,
        data: { message: "Team not found" },
      };
    }

    const { data } = await this.teamModel.deleteTeamById(teamId);
    if (!data) {
      return {
        status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
        data: { message: "Error to delete team" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };
}