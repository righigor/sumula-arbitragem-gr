import { FastifyReply, FastifyRequest } from "fastify";
import ApparatusService from "../service/apparatus.service";
import { CreateApparatusType } from "../utils/types";
import { mapHTTPStatus } from "../utils/mapHTTPStatus";

export default class ApparatusController {
  private apparatusService = new ApparatusService();

  public createApparatus = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const obj = request.body as CreateApparatusType;

    const { status, data } = await this.apparatusService.createApparatus(obj);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public getAllApparatusByCompetitionId = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { competitionId } = request.params as { competitionId: string };

    const { status, data } =
      await this.apparatusService.getAllApparatusByCompetitionId(competitionId);

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public getApparatusById = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { apparatusId } = request.params as { apparatusId: string };

    const { status, data } = await this.apparatusService.getApparatusById(
      apparatusId
    );

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public updateApparatusById = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { apparatusId } = request.params as { apparatusId: string };
    const obj = request.body as CreateApparatusType;

    const { status, data } = await this.apparatusService.updateApparatusById(
      obj,
      apparatusId
    );

    return reply.status(mapHTTPStatus(status)).send(data);
  };

  public deleteApparatusById = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { apparatusId } = request.params as { apparatusId: string };

    const { status, data } = await this.apparatusService.deleteApparatusById(
      apparatusId
    );

    return reply.status(mapHTTPStatus(status)).send(data);
  };
}
