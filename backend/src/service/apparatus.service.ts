import { ZodError } from "zod";
import ApparatusModel from "../model/apparatus.model";
import { CreateApparatusType, StatusHttpType } from "../utils/types";
import { apparatusSchema } from "../utils/zod/apparatusZod";
import { checkExistsApparatus, checkExistsChampionship } from "../utils/validations";
import { ApparatusServiceInterface } from "../utils/interfaces/services/apparatus";

export default class ApparatusService implements ApparatusServiceInterface {
  private apparatusModel = new ApparatusModel();

  public createApparatus = async (obj: CreateApparatusType) => {
    try {
      const parsedData = apparatusSchema.parse(obj);

      const checkChamp = await checkExistsChampionship(
        parsedData.competitionId
      );
      if (!checkChamp) {
        return {
          status: "NOT_FOUND" as StatusHttpType,
          data: { message: "Championship not found" },
        };
      }

      const { data } = await this.apparatusModel.createApparatus(parsedData);
      if (!data) {
        return {
          status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
          data: { message: "Error creating apparatus" },
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

  public getAllApparatusByCompetitionId = async (competitionId: string) => {
    if (!competitionId && competitionId === "") {
      return {
        status: "BAD_REQUEST" as StatusHttpType,
        data: { message: "Competition ID is required" },
      };
    }

    const checkChamp = await checkExistsChampionship(competitionId);
    if (!checkChamp) {
      return {
        status: "BAD_REQUEST" as StatusHttpType,
        data: { message: "Championship not found" },
      };
    }

    const { data } = await this.apparatusModel.getAllApparatusByCompetitionId(
      competitionId
    );
    if (!data) {
      return {
        status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
        data: { message: "Error getting apparatus" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };

  public getApparatusById = async (apparatusId: string) => {
    if (!apparatusId && apparatusId === "") {
      return {
        status: "BAD_REQUEST" as StatusHttpType,
        data: { message: "Apparatus ID is required" },
      };
    }

    const { data } = await this.apparatusModel.getApparatusById(apparatusId);
    if (!data) {
      return {
        status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
        data: { message: "Error getting apparatus" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };

  public updateApparatusById = async (obj: CreateApparatusType, apparatusId: string) => {
    try {
      const checkApparatus = await checkExistsApparatus(apparatusId);
      if (!checkApparatus) {
        return { status: "NOT_FOUND" as StatusHttpType, data: { message: "Apparatus not found" } }
      }

      const parsedData = apparatusSchema.parse({
        ...obj,
        id: apparatusId,
      });

      const { data } = await this.apparatusModel.updateApparatusById(
        parsedData
      );
      if (!data) {
        return {
          status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
          data: { message: "Error updating apparatus" },
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
      return { status: "INTERNAL_SERVER_ERROR" as StatusHttpType, data: error as Error };
    }
  };

  public deleteApparatusById = async (apparatusId: string) => {
    if (!apparatusId && apparatusId === "") {
      return {
        status: "BAD_REQUEST" as StatusHttpType,
        data: { message: "Apparatus ID is required" },
      };
    }

    const checkApparatus = await checkExistsApparatus(apparatusId);
    if (!checkApparatus) {
      return {
        status: "NOT_FOUND" as StatusHttpType,
        data: { message: "Apparatus not found" },
      };
    }

    const { data } = await this.apparatusModel.deleteApparatusById(apparatusId);
    if (!data) {
      return {
        status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
        data: { message: "Error deleting apparatus" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };
}
