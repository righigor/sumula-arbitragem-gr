import { ZodError } from "zod";
import StaffModel from "../model/staff.model";
import { CreateStaffType, StatusHttpType } from "../utils/types";
import { staffSchema } from "../utils/zod/staffZod";
import { checkExistsTeam } from "../utils/validations";

export default class StaffService {
  private staffModel = new StaffModel();

  public createStaff = async (obj: CreateStaffType, teamId: string) => {
    try {
      const parsedData = staffSchema.parse(obj);
      const checkTeam = await checkExistsTeam(teamId);
      if (!checkTeam) {
        return {
          status: "NOT_FOUND" as StatusHttpType,
          data: { message: "Team not found" },
        };
      }
      const { data } = await this.staffModel.createStaff(parsedData, teamId);

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

  public getStaffById = async (staffId: string) => {
    const { data } = await this.staffModel.getStaffById(staffId);
    if (!data) {
      return {
        status: "NOT_FOUND" as StatusHttpType,
        data: { message: "Staff not found" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };

  public getAllStaffByTeamId = async (teamId: string) => {
    const checkTeam = await checkExistsTeam(teamId);
    if (!checkTeam) {
      return {
        status: "NOT_FOUND" as StatusHttpType,
        data: { message: "Team not found" },
      };
    }

    const { data } = await this.staffModel.getAllStaffByTeamId(teamId);
    if (data.length === 0) {
      return {
        status: "NOT_FOUND" as StatusHttpType,
        data: { message: "No staff found" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  }

  public updateStaffById = async (obj: CreateStaffType, staffId: string) => {
    try {
      const parsedData = staffSchema.parse(obj);
      const { data } = await this.staffModel.updateStaffById(parsedData, staffId);
      if (!data) {
        return {
          status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
          data: { message: "Error to update staff" },
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

  public deleteStaffById = async (staffId: string) => {
    const { data } = await this.staffModel.deleteStaffById(staffId);
    if (!data) {
      return {
        status: "INTERNAL_SERVER_ERROR" as StatusHttpType,
        data: { message: "Error to delete staff" },
      };
    }

    return { status: "OK" as StatusHttpType, data };
  };
}
