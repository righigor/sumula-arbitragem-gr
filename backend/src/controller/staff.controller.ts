import { FastifyRequest, FastifyReply } from "fastify";
import StaffService from "../service/staff.service";
import { mapHTTPStatus } from "../utils/mapHTTPStatus";
import { CreateStaffType } from "../utils/types";

export default class StaffController {
  private staffService = new StaffService();

  public createStaff = async (request: FastifyRequest, reply: FastifyReply) => {
    const { teamId } = request.params as { teamId: string };
    const obj = request.body as CreateStaffType;
    const { status, data } = await this.staffService.createStaff(obj, teamId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public getStaffById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { staffId } = request.params as { staffId: string };
    const { status, data } = await this.staffService.getStaffById(staffId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public getAllStaffByTeamId = async (request: FastifyRequest, reply: FastifyReply) => {
    const { teamId } = request.params as { teamId: string };
    const { status, data } = await this.staffService.getAllStaffByTeamId(teamId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public updateStaffById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { staffId } = request.params as { staffId: string };
    const obj = request.body as CreateStaffType;
    const { status, data } = await this.staffService.updateStaffById(obj, staffId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public deleteStaffById = async (request: FastifyRequest, reply: FastifyReply) => {
    const { staffId } = request.params as { staffId: string };
    const { status, data } = await this.staffService.deleteStaffById(staffId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };
}