import { prisma } from "../lib/prisma";
import { CreateStaffType } from "../utils/types";

export default class StaffModel {
  public createStaff = async ({
    name,
    role,
    email,
    phone,
  }: CreateStaffType, teamId: string) => {
    const result = await prisma.staff.create({
      data: {
        name,
        role,
        teamId,
        email,
        phone,
      },
    });

    return { data: result };
  };

  public getStaffById = async (staffId: string) => {
    const result = await prisma.staff.findUnique({
      where: {
        id: staffId,
      },
    });

    return { data: result };
  };

  public getAllStaffByTeamId = async (teamId: string) => {
    const result = await prisma.staff.findMany({
      where: {
        teamId,
      },
    });

    return { data: result };
  };

  public updateStaffById = async ({
    name,
    role,
    email,
    phone,
  }: CreateStaffType, staffId: string) => {
    const result = await prisma.staff.update({
      where: {
        id: staffId,
      },
      data: {
        name,
        role,
        email,
        phone,
      },
    });

    return { data: result };
  };

  public deleteStaffById = async (staffId: string) => {
    const result = await prisma.staff.delete({
      where: {
        id: staffId,
      },
    });

    return { data: result };
  };
}
